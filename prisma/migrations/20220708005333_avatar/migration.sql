/*
  Warnings:

  - You are about to drop the column `studyId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Study" DROP CONSTRAINT "Study_imageId_fkey";

-- DropIndex
DROP INDEX "Study_imageId_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "studyId";

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "Avatar" (
    "studyId" TEXT,
    "userId" TEXT,
    "imageId" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("imageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_studyId_key" ON "Avatar"("studyId");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_userId_key" ON "Avatar"("userId");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
