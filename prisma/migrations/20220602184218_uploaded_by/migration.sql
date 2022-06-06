/*
  Warnings:

  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - Added the required column `uploadedById` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "userId",
ADD COLUMN     "uploadedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
