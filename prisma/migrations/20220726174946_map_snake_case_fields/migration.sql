/*
  Warnings:

  - You are about to drop the column `providerAccountId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Avatar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageId` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `studyId` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Avatar` table. All the data in the column will be lost.
  - The primary key for the `CoordinatorsOnStudies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `studyId` on the `CoordinatorsOnStudies` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CoordinatorsOnStudies` table. All the data in the column will be lost.
  - The primary key for the `DataVault` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `documentId` on the `DataVault` table. All the data in the column will be lost.
  - You are about to drop the column `studyId` on the `DataVault` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `studyId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedById` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `submissionDate` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[study_id]` on the table `Avatar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Avatar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session_token]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_account_id` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study_id` to the `CoordinatorsOnStudies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `CoordinatorsOnStudies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_id` to the `DataVault` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study_id` to the `DataVault` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_type` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_token` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_studyId_fkey";

-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoordinatorsOnStudies" DROP CONSTRAINT "CoordinatorsOnStudies_studyId_fkey";

-- DropForeignKey
ALTER TABLE "CoordinatorsOnStudies" DROP CONSTRAINT "CoordinatorsOnStudies_userId_fkey";

-- DropForeignKey
ALTER TABLE "DataVault" DROP CONSTRAINT "DataVault_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DataVault" DROP CONSTRAINT "DataVault_studyId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_studyId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_uploadedById_fkey";

-- DropIndex
DROP INDEX "Account_provider_providerAccountId_key";

-- DropIndex
DROP INDEX "Avatar_studyId_key";

-- DropIndex
DROP INDEX "Avatar_userId_key";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "providerAccountId",
DROP COLUMN "userId",
ADD COLUMN     "provider_account_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_pkey",
DROP COLUMN "imageId",
DROP COLUMN "studyId",
DROP COLUMN "userId",
ADD COLUMN     "image_id" TEXT NOT NULL,
ADD COLUMN     "study_id" TEXT,
ADD COLUMN     "user_id" TEXT,
ADD CONSTRAINT "Avatar_pkey" PRIMARY KEY ("image_id");

-- AlterTable
ALTER TABLE "CoordinatorsOnStudies" DROP CONSTRAINT "CoordinatorsOnStudies_pkey",
DROP COLUMN "studyId",
DROP COLUMN "userId",
ADD COLUMN     "study_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "CoordinatorsOnStudies_pkey" PRIMARY KEY ("study_id", "user_id");

-- AlterTable
ALTER TABLE "DataVault" DROP CONSTRAINT "DataVault_pkey",
DROP COLUMN "documentId",
DROP COLUMN "studyId",
ADD COLUMN     "document_id" TEXT NOT NULL,
ADD COLUMN     "study_id" TEXT NOT NULL,
ADD CONSTRAINT "DataVault_pkey" PRIMARY KEY ("document_id");

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "fileType",
DROP COLUMN "studyId",
DROP COLUMN "uploadedById",
ADD COLUMN     "file_type" TEXT NOT NULL,
ADD COLUMN     "study_id" TEXT,
ADD COLUMN     "uploaded_by_id" TEXT;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "sessionToken",
ADD COLUMN     "session_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "endDate",
DROP COLUMN "submissionDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "submission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "email_verified" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_study_id_key" ON "Avatar"("study_id");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_user_id_key" ON "Avatar"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "Study"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataVault" ADD CONSTRAINT "DataVault_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataVault" ADD CONSTRAINT "DataVault_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatorsOnStudies" ADD CONSTRAINT "CoordinatorsOnStudies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatorsOnStudies" ADD CONSTRAINT "CoordinatorsOnStudies_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "Study"("id") ON DELETE SET NULL ON UPDATE CASCADE;
