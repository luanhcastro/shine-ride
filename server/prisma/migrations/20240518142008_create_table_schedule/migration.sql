-- CreateEnum
CREATE TYPE "Types" AS ENUM ('SIMPLE', 'COMPLETE');

-- CreateTable
CREATE TABLE "schedule" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "type" "Types" NOT NULL DEFAULT 'SIMPLE',
    "licensePlate" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);
