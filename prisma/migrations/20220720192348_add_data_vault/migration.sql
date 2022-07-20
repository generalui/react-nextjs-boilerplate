-- CreateTable
CREATE TABLE "DataVault" (
    "studyId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataType" "StudyDataTypes" NOT NULL,

    CONSTRAINT "DataVault_pkey" PRIMARY KEY ("documentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataVault_studyId_key" ON "DataVault"("studyId");

-- AddForeignKey
ALTER TABLE "DataVault" ADD CONSTRAINT "DataVault_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataVault" ADD CONSTRAINT "DataVault_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
