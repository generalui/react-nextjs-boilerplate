/*
  Warnings:

  - You are about to drop the column `coordinatorId` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the `NotificationEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Study" DROP CONSTRAINT "Study_coordinatorId_fkey";

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "coordinatorId",
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "submissionDate" DROP NOT NULL,
ALTER COLUMN "submissionDate" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "NotificationEvents";

-- CreateTable
CREATE TABLE "CoordinatorsOnStudies" (
    "studyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoordinatorsOnStudies_pkey" PRIMARY KEY ("studyId","userId")
);

-- CreateTable
CREATE TABLE "NotificationEvent" (
    "id" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notification_type" TEXT NOT NULL,
    "body" JSONB NOT NULL,

    CONSTRAINT "NotificationEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoordinatorsOnStudies" ADD CONSTRAINT "CoordinatorsOnStudies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatorsOnStudies" ADD CONSTRAINT "CoordinatorsOnStudies_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
