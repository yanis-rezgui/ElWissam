-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "StatutBien" AS ENUM ('DISPONIBLE', 'RESERVE', 'VENDU', 'LOUE');

-- CreateEnum
CREATE TYPE "TypeBien" AS ENUM ('APPARTEMENT', 'TERRAIN', 'LOCAL', 'VILLA');

-- CreateEnum
CREATE TYPE "ServiceBien" AS ENUM ('LOCATION', 'VENTE');

-- CreateEnum
CREATE TYPE "StatutDemande" AS ENUM ('EN_ATTENTE', 'CONTACTE', 'VISITE_CONFIRMEE', 'TERMINEE', 'ANNULEE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bien" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "negociable" BOOLEAN NOT NULL DEFAULT false,
    "statut" "StatutBien" NOT NULL DEFAULT 'DISPONIBLE',
    "localisation" TEXT NOT NULL,
    "superficie" DOUBLE PRECISION NOT NULL,
    "type" "TypeBien" NOT NULL,
    "service" "ServiceBien" NOT NULL,
    "features" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Bien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemandeVisite" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "dateSouhaitee" TIMESTAMP(3) NOT NULL,
    "message" TEXT,
    "statut" "StatutDemande" NOT NULL DEFAULT 'EN_ATTENTE',
    "bienId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DemandeVisite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BienToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BienToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Bien_statut_idx" ON "Bien"("statut");

-- CreateIndex
CREATE INDEX "Bien_type_idx" ON "Bien"("type");

-- CreateIndex
CREATE INDEX "Bien_service_idx" ON "Bien"("service");

-- CreateIndex
CREATE INDEX "Bien_localisation_idx" ON "Bien"("localisation");

-- CreateIndex
CREATE INDEX "DemandeVisite_bienId_idx" ON "DemandeVisite"("bienId");

-- CreateIndex
CREATE INDEX "DemandeVisite_statut_idx" ON "DemandeVisite"("statut");

-- CreateIndex
CREATE INDEX "_BienToUser_B_index" ON "_BienToUser"("B");

-- AddForeignKey
ALTER TABLE "DemandeVisite" ADD CONSTRAINT "DemandeVisite_bienId_fkey" FOREIGN KEY ("bienId") REFERENCES "Bien"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BienToUser" ADD CONSTRAINT "_BienToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Bien"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BienToUser" ADD CONSTRAINT "_BienToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
