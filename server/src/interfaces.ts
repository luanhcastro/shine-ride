import { Types } from "@prisma/client";

export interface CreateScheduleInput {
    startTime: Date;
    endTime: Date;
    type: Types;
    licensePlate: string;
    deletedAt?: Date | null;
  }