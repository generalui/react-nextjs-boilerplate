/*
  Warnings:

  - The `status` column on the `Study` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StudyStatus" AS ENUM ('new', 'approved', 'archived');

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "status",
ADD COLUMN     "status" "StudyStatus" NOT NULL DEFAULT E'new';
