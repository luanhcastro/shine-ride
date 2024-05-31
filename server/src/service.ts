import { PrismaClient } from "@prisma/client";
import { Schedule } from "@prisma/client";
import { CreateScheduleInput } from "./interfaces";

const prisma = new PrismaClient();

export async function createSchedule(
  data: CreateScheduleInput
): Promise<Schedule> {
  return prisma.schedule.create({
    data,
  });
}

export async function getAllSchedules(): Promise<Schedule[]> {
  return prisma.schedule.findMany();
}

export async function getAllSchedulesByDay(day: string): Promise<Schedule[]> {
  const parsedDay = new Date(day);
  const startOfDay = new Date(parsedDay.getFullYear(), parsedDay.getMonth(), parsedDay.getDate());
  const endOfDay = new Date(parsedDay.getFullYear(), parsedDay.getMonth(), parsedDay.getDate() + 1);

  return prisma.schedule.findMany({
    where: {
      AND: [
        {
          startTime: {
            gte: startOfDay
          }
        },
        {
          endTime: {
            lt: endOfDay
          }
        },
        {
          deletedAt: null
        }
      ]
    }
  });
}

export async function deleteSchedule(id: string): Promise<Schedule | null> {
  return prisma.schedule.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}