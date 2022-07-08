-- CreateEnum
CREATE TYPE "StudyDataTypes" AS ENUM ('consents', 'geneticData', 'healthRecords', 'specimens');

-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "data_types" "StudyDataTypes"[];
