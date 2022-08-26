-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "enrolled_tribe" DROP NOT NULL,
ALTER COLUMN "home_phone" DROP NOT NULL,
ALTER COLUMN "work_phone" DROP NOT NULL,
ALTER COLUMN "physical_address" DROP NOT NULL,
ALTER COLUMN "emergency_contact_email" DROP NOT NULL,
ALTER COLUMN "emergency_contact_home_phone" DROP NOT NULL,
ALTER COLUMN "emergency_contact_name" DROP NOT NULL,
ALTER COLUMN "emergency_contact_physical_address" DROP NOT NULL,
ALTER COLUMN "emergency_contact_relationship" DROP NOT NULL,
ALTER COLUMN "emergency_contact_work_phone" DROP NOT NULL;
