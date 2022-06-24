-- CreateEnum
CREATE TYPE "MethodType" AS ENUM ('get', 'post', 'put', 'patch', 'delete');

-- CreateEnum
CREATE TYPE "EventState" AS ENUM ('success', 'failure');

-- CreateTable
CREATE TABLE "EventLog" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "method_type" "MethodType" NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" JSONB NOT NULL,
    "user_id" TEXT,
    "state" "EventState" NOT NULL,

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("id")
);
