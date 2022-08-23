-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "current_name" TEXT NOT NULL,
    "enrolled_tribe" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "home_phone" TEXT NOT NULL,
    "work_phone" TEXT NOT NULL,
    "physical_address" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_user_id_key" ON "Participant"("user_id");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
