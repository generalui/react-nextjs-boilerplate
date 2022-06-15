/*
  Warnings:

  - You are about to drop the column `audience` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `objective` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `population` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Study` table. All the data in the column will be lost.
  - Added the required column `description` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionDate` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "audience",
DROP COLUMN "endDate",
DROP COLUMN "location",
DROP COLUMN "objective",
DROP COLUMN "population",
DROP COLUMN "startDate",
DROP COLUMN "topic",
DROP COLUMN "type",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'new',
ADD COLUMN     "submissionDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
