"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controller.ts
var controller_exports = {};
__export(controller_exports, {
  createScheduleHandler: () => createScheduleHandler,
  deleteScheduleHandler: () => deleteScheduleHandler,
  getAllSchedulesByDayHandler: () => getAllSchedulesByDayHandler,
  getAllSchedulesHandler: () => getAllSchedulesHandler
});
module.exports = __toCommonJS(controller_exports);
var import_zod2 = require("zod");

// src/service.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
async function createSchedule(data) {
  return prisma.schedule.create({
    data
  });
}
async function getAllSchedules() {
  return prisma.schedule.findMany();
}
async function getAllSchedulesByDay(day) {
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
async function deleteSchedule(id) {
  return prisma.schedule.update({
    where: { id },
    data: { deletedAt: /* @__PURE__ */ new Date() }
  });
}

// src/validator.ts
var import_zod = require("zod");
var Types = import_zod.z.enum(["SIMPLE", "COMPLETE"]);
var scheduleSchema = import_zod.z.object({
  id: import_zod.z.string().uuid().optional(),
  startTime: import_zod.z.coerce.date(),
  endTime: import_zod.z.coerce.date(),
  type: Types.default("SIMPLE"),
  licensePlate: import_zod.z.string().min(1, "License plate is required"),
  deletedAt: import_zod.z.date().nullable().optional()
});

// src/controller.ts
async function createScheduleHandler(req, res) {
  try {
    const validatedData = scheduleSchema.parse(req.body);
    const schedule = await createSchedule(validatedData);
    res.status(201).json(schedule);
  } catch (error) {
    if (error instanceof import_zod2.z.ZodError) {
      res.status(400).json({
        errors: error.errors
      });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
async function getAllSchedulesHandler(req, res) {
  try {
    const schedules = await getAllSchedules();
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getAllSchedulesByDayHandler(req, res) {
  try {
    const day = req.params.day;
    const schedules = await getAllSchedulesByDay(day);
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deleteScheduleHandler(req, res) {
  try {
    const id = req.params.id;
    const schedule = await deleteSchedule(id);
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res.status(404).json({ error: "Schedule not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createScheduleHandler,
  deleteScheduleHandler,
  getAllSchedulesByDayHandler,
  getAllSchedulesHandler
});
