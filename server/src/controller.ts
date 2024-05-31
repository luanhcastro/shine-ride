import { Request, Response } from 'express';
import { z } from 'zod';
import { createSchedule, getAllSchedules, getAllSchedulesByDay, deleteSchedule } from './service';
import { scheduleSchema } from './validator';

export async function createScheduleHandler(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = scheduleSchema.parse(req.body);

    const schedule = await createSchedule(validatedData);

    res.status(201).json(schedule);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        errors: error.errors
      });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export async function getAllSchedulesHandler(req: Request, res: Response): Promise<void> {
  try {
    const schedules = await getAllSchedules();
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllSchedulesByDayHandler(req: Request, res: Response): Promise<void> {
  try {
    const day = req.params.day;
    const schedules = await getAllSchedulesByDay(day);
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteScheduleHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const schedule = await deleteSchedule(id);
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}