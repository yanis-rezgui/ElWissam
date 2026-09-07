/*
  Warnings:

  - You are about to drop the column `images` on the `Bien` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bien" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "BienImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "bienId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BienImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BienImage_bienId_idx" ON "BienImage"("bienId");

-- AddForeignKey
ALTER TABLE "BienImage" ADD CONSTRAINT "BienImage_bienId_fkey" FOREIGN KEY ("bienId") REFERENCES "Bien"("id") ON DELETE CASCADE ON UPDATE CASCADE;
