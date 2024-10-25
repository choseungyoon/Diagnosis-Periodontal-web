/*
  Warnings:

  - You are about to drop the column `libraryId` on the `result` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "result" DROP CONSTRAINT "result_libraryId_fkey";

-- AlterTable
ALTER TABLE "result" DROP COLUMN "libraryId",
ADD COLUMN     "library" TEXT NOT NULL DEFAULT 'Default';
