import { z } from 'zod';

const Types = z.enum(['SIMPLE', 'COMPLETE']);

export const scheduleSchema = z.object({
  id: z.string().uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  type: Types.default('SIMPLE'),
  licensePlate: z.string().min(1, 'License plate is required'),
  deletedAt: z.date().nullable().optional()
});
