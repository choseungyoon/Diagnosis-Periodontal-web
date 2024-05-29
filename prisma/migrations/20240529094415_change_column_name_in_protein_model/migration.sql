/*
  Warnings:

  - You are about to drop the column `name` on the `protein` table. All the data in the column will be lost.
  - Added the required column `protein` to the `protein` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_protein" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "protein" TEXT NOT NULL,
    "importance" REAL NOT NULL,
    "abundance" BIGINT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "resultId" INTEGER NOT NULL,
    CONSTRAINT "protein_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "result" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_protein" ("abundance", "createdAt", "id", "importance", "resultId", "updatedAt") SELECT "abundance", "createdAt", "id", "importance", "resultId", "updatedAt" FROM "protein";
DROP TABLE "protein";
ALTER TABLE "new_protein" RENAME TO "protein";
PRAGMA foreign_key_check("protein");
PRAGMA foreign_keys=ON;
