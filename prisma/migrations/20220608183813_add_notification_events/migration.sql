-- CreateTable
CREATE TABLE "NotificationEvents" (
    "id" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notification_type" TEXT NOT NULL,
    "body" JSONB NOT NULL,

    CONSTRAINT "NotificationEvents_pkey" PRIMARY KEY ("id")
);
