/*
  Warnings:

  - You are about to drop the column `state` on the `EventLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventLog" DROP COLUMN "state";

-- DropEnum
DROP TYPE "EventState";
