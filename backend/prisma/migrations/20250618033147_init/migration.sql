/*
  Warnings:

  - You are about to drop the column `breed` on the `pet` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pet" DROP COLUMN "breed",
DROP COLUMN "description";

-- CreateTable
CREATE TABLE "toy" (
    "toy_id" SERIAL NOT NULL,
    "name" TEXT,
    "likes" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "pet_id" INTEGER,

    CONSTRAINT "toy_pkey" PRIMARY KEY ("toy_id")
);

-- AddForeignKey
ALTER TABLE "toy" ADD CONSTRAINT "toy_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("pet_id") ON DELETE SET NULL ON UPDATE CASCADE;
