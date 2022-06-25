/*
  Warnings:

  - You are about to drop the column `action` on the `EventLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventLog" DROP COLUMN "action",
ADD COLUMN     "body" JSONB;
