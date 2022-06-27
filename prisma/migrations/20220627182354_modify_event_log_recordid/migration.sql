/*
  Warnings:

  - The `record_id` column on the `EventLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "EventLog" DROP COLUMN "record_id",
ADD COLUMN     "record_id" TEXT[];
