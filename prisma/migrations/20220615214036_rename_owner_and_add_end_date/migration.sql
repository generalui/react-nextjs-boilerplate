/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Study` table. All the data in the column will be lost.
  - Added the required column `coordinatorId` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Study" DROP CONSTRAINT "Study_ownerId_fkey";

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "ownerId",
ADD COLUMN     "coordinatorId" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
