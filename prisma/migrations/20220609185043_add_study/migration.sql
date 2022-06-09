-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);
