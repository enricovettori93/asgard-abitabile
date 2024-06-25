/*
  Warnings:

  - You are about to drop the `TagsOnLocations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnLocations" DROP CONSTRAINT "TagsOnLocations_locationId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnLocations" DROP CONSTRAINT "TagsOnLocations_tagId_fkey";

-- DropTable
DROP TABLE "TagsOnLocations";

-- CreateTable
CREATE TABLE "_LocationToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToTag_AB_unique" ON "_LocationToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToTag_B_index" ON "_LocationToTag"("B");

-- AddForeignKey
ALTER TABLE "_LocationToTag" ADD CONSTRAINT "_LocationToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToTag" ADD CONSTRAINT "_LocationToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
