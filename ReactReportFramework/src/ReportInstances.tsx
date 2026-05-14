import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { ReportInstance, ReportStatus } from './types';

const statusColor: Record<ReportStatus, 'success' | 'warning' | 'error'> = {
  Completed: 'success',
  Running: 'warning',
  Failed: 'error',
};

interface Props {
  instances: ReportInstance[];
}

export function ReportInstances({ instances }: Props) {
  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Report instances
      </Typography>
      <Table size="small" sx={{ border: '1px solid #e0e0e0' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>ID</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instances.map((inst) => (
            <TableRow key={inst.id}>
              <TableCell>{inst.id}</TableCell>
              <TableCell>{inst.created_date}</TableCell>
              <TableCell>
                <Chip
                  label={inst.status}
                  color={statusColor[inst.status]}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small">
                  Show Results
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
