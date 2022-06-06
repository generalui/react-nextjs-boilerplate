/*
  Warnings:

  - You are about to drop the column `resourceType` on the `Document` table. All the data in the column will be lost.
  - Added the required column `fileType` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "resourceType",
ADD COLUMN     "fileType" TEXT NOT NULL;
