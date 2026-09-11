/*
  Warnings:

  - You are about to drop the column `order` on the `Commune` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Commune_order_idx";

-- AlterTable
ALTER TABLE "Commune" DROP COLUMN "order";
