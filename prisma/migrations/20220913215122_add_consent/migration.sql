/*
  Warnings:

  - Added the required column `consent_id` to the `ParticipantsOnStudies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ConsentEnum" AS ENUM ('yes', 'no');

-- AlterTable
ALTER TABLE "ParticipantsOnStudies" ADD COLUMN     "consent_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Consent" (
    "id" TEXT NOT NULL,
    "analysis" "ConsentEnum" NOT NULL DEFAULT E'yes',
    "geneticData" "ConsentEnum" NOT NULL DEFAULT E'yes',
    "healthRecords" "ConsentEnum" NOT NULL DEFAULT E'yes',
    "specimens" "ConsentEnum" NOT NULL DEFAULT E'yes',
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParticipantsOnStudies" ADD CONSTRAINT "ParticipantsOnStudies_consent_id_fkey" FOREIGN KEY ("consent_id") REFERENCES "Consent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
