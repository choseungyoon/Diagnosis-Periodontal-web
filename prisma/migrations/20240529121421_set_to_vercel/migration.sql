-- CreateTable
CREATE TABLE "result" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "predictedResult" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "protein" (
    "id" SERIAL NOT NULL,
    "protein" TEXT NOT NULL,
    "importance" DOUBLE PRECISION NOT NULL,
    "abundance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resultId" INTEGER NOT NULL,

    CONSTRAINT "protein_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "protein" ADD CONSTRAINT "protein_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "result"("id") ON DELETE CASCADE ON UPDATE CASCADE;
