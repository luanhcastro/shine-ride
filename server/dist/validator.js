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

// src/validator.ts
var validator_exports = {};
__export(validator_exports, {
  scheduleSchema: () => scheduleSchema
});
module.exports = __toCommonJS(validator_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  scheduleSchema
});
