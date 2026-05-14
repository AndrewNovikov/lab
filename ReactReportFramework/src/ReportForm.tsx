import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { FieldRenderer } from './FieldRenderer';
import type { FieldConfig, ReportConfig } from './types';

export type FormValues = {
  common: Record<string, string | boolean>;
  runs: Record<string, string | boolean>[];
};

interface Props {
  config: ReportConfig;
  values: FormValues;
  onChange: (values: FormValues) => void;
  onSubmit: () => void;
}

export function ReportForm({ config, values, onChange, onSubmit }: Props) {
  const updateCommon = (name: string, value: string | boolean) =>
    onChange({ ...values, common: { ...values.common, [name]: value } });

  const updateRun = (runIdx: number, name: string, value: string | boolean) => {
    const runs = values.runs.map((r, i) =>
      i === runIdx ? { ...r, [name]: value } : r
    );
    onChange({ ...values, runs });
  };

  const colSize = Math.floor(12 / config.runs.length) as 1 | 2 | 3 | 4 | 6 | 12;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" align="center" mb={3}>
        REPORT CONFIGURATION
      </Typography>

      <Grid container spacing={2} mb={2}>
        {config.runs.map((run, idx) => (
          <Grid item xs={12} md={colSize} key={idx}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              {run.run_title}
            </Typography>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {run.parameters.map((field: FieldConfig) => (
                  <FieldRenderer
                    key={field.name}
                    field={field}
                    value={values.runs[idx][field.name]}
                    onChange={(v) => updateRun(idx, field.name, v)}
                  />
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Common parameters
      </Typography>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {config.common.map((field: FieldConfig) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={values.common[field.name]}
              onChange={(v) => updateCommon(field.name, v)}
            />
          ))}
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="center">
        <Button variant="contained" size="large" onClick={onSubmit} sx={{ px: 6 }}>
          Run Report
        </Button>
      </Box>
    </Box>
  );
}
