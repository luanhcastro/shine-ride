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

// src/service.ts
var service_exports = {};
__export(service_exports, {
  createSchedule: () => createSchedule,
  deleteSchedule: () => deleteSchedule,
  getAllSchedules: () => getAllSchedules,
  getAllSchedulesByDay: () => getAllSchedulesByDay
});
module.exports = __toCommonJS(service_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getAllSchedulesByDay
});
