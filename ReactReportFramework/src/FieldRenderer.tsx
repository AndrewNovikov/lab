import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material';
import type { FieldConfig } from './types';

interface Props {
  field: FieldConfig;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}

export function FieldRenderer({ field, value, onChange }: Props) {
  switch (field.data_type) {
    case 'string':
      return (
        <TextField
          label={field.name}
          size="small"
          fullWidth
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case 'enum':
      return (
        <TextField
          select
          label={field.name}
          size="small"
          fullWidth
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.values!.map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </TextField>
      );
    case 'date':
      return (
        <TextField
          label={field.name}
          type="date"
          size="small"
          fullWidth
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      );
    case 'bool':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
              size="small"
            />
          }
          label={field.name}
        />
      );
    default:
      return null;
  }
}
