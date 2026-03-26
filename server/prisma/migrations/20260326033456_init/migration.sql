-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('INFO', 'ERROR', 'WARN');

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "level" "LogLevel" NOT NULL,
    "userID" INTEGER NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Logs_id_key" ON "Logs"("id");
