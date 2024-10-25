-- CreateTable
CREATE TABLE "library" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Default',

    CONSTRAINT "library_pkey" PRIMARY KEY ("id")
);
