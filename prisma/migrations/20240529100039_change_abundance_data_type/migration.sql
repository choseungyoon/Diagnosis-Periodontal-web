/*
  Warnings:

  - You are about to alter the column `abundance` on the `protein` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_protein" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "protein" TEXT NOT NULL,
    "importance" REAL NOT NULL,
    "abundance" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "resultId" INTEGER NOT NULL,
    CONSTRAINT "protein_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "result" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_protein" ("abundance", "createdAt", "id", "importance", "protein", "resultId", "updatedAt") SELECT "abundance", "createdAt", "id", "importance", "protein", "resultId", "updatedAt" FROM "protein";
DROP TABLE "protein";
ALTER TABLE "new_protein" RENAME TO "protein";
PRAGMA foreign_key_check("protein");
PRAGMA foreign_keys=ON;
