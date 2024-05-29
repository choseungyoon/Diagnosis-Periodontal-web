-- CreateTable
CREATE TABLE "result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "predictedResult" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "protein" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "importance" REAL NOT NULL,
    "abundance" BIGINT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "resultId" INTEGER NOT NULL,
    CONSTRAINT "protein_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "result" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
