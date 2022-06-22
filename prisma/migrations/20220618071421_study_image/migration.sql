/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Study` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Study` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "studyId" TEXT;

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "imageUrl",
ADD COLUMN     "imageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Study_imageId_key" ON "Study"("imageId");

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
