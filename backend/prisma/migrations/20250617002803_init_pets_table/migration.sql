-- CreateTable
CREATE TABLE "pet" (
    "pet_id" SERIAL NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "breed" TEXT,
    "age" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "pet_pkey" PRIMARY KEY ("pet_id")
);
