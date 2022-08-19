/*
  Warnings:

  - You are about to drop the column `current_name` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `email_address` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `emergency_contact_email` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_contact_home_phone` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_contact_name` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_contact_physical_address` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_contact_relationship` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_contact_work_phone` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "current_name",
DROP COLUMN "email_address",
ADD COLUMN     "emergency_contact_email" TEXT NOT NULL,
ADD COLUMN     "emergency_contact_home_phone" TEXT NOT NULL,
ADD COLUMN     "emergency_contact_name" TEXT NOT NULL,
ADD COLUMN     "emergency_contact_physical_address" TEXT NOT NULL,
ADD COLUMN     "emergency_contact_relationship" TEXT NOT NULL,
ADD COLUMN     "emergency_contact_work_phone" TEXT NOT NULL;
