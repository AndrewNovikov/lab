import { Container } from '@mui/material';
import { useState } from 'react';
import config from './config.json';
import { submitReport } from './mockBackend';
import { ReportForm } from './ReportForm';
import type { FormValues } from './ReportForm';
import { ReportInstances } from './ReportInstances';
import type { ReportConfig, ReportInstance, ReportStatus } from './types';

const typedConfig = config as ReportConfig;
const today = new Date().toISOString().split('T')[0];

function resolveDefault(val: string | boolean): string | boolean {
  return val === '{today}' ? today : val;
}

function initValues(cfg: ReportConfig): FormValues {
  return {
    common: Object.fromEntries(
      cfg.common.map((f) => [f.name, resolveDefault(f.default_value)])
    ),
    runs: cfg.runs.map((run) =>
      Object.fromEntries(
        run.parameters.map((f) => [f.name, resolveDefault(f.default_value)])
      )
    ),
  };
}

let nextId = 39;

export default function App() {
  const [values, setValues] = useState<FormValues>(() => initValues(typedConfig));
  const [instances, setInstances] = useState<ReportInstance[]>([]);

  const handleSubmit = () => {
    const id = nextId++;
    const instance = submitReport(id, (id: number, status: ReportStatus) => {
      setInstances((prev) =>
        prev.map((inst) => (inst.id === id ? { ...inst, status } : inst))
      );
    });
    setInstances((prev) => [instance, ...prev]);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ReportForm
        config={typedConfig}
        values={values}
        onChange={setValues}
        onSubmit={handleSubmit}
      />
      <ReportInstances instances={instances} />
    </Container>
  );
}
