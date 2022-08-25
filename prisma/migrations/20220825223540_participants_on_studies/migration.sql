-- CreateTable
CREATE TABLE "ParticipantsOnStudies" (
    "study_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantsOnStudies_pkey" PRIMARY KEY ("study_id","participant_id")
);

-- AddForeignKey
ALTER TABLE "ParticipantsOnStudies" ADD CONSTRAINT "ParticipantsOnStudies_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnStudies" ADD CONSTRAINT "ParticipantsOnStudies_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
