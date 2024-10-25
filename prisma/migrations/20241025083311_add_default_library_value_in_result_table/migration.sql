-- AlterTable
ALTER TABLE "result" ADD COLUMN     "libraryId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
