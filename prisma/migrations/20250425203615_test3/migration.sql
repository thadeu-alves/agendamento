/*
  Warnings:

  - Added the required column `slug` to the `Semana` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Semana" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL
);
INSERT INTO "new_Semana" ("data_fim", "data_inicio", "id") SELECT "data_fim", "data_inicio", "id" FROM "Semana";
DROP TABLE "Semana";
ALTER TABLE "new_Semana" RENAME TO "Semana";
CREATE UNIQUE INDEX "Semana_slug_key" ON "Semana"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
