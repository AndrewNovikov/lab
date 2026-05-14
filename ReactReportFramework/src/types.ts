export type DataType = 'string' | 'enum' | 'date' | 'bool';

export interface FieldConfig {
  name: string;
  data_type: DataType;
  default_value: string | boolean;
  values?: string[];
}

export interface RunConfig {
  run_title: string;
  parameters: FieldConfig[];
}

export interface ReportConfig {
  common: FieldConfig[];
  runs: RunConfig[];
}

export type ReportStatus = 'Running' | 'Completed' | 'Failed';

export interface ReportInstance {
  id: number;
  created_date: string;
  status: ReportStatus;
}
