/*
  Warnings:

  - The primary key for the `Dia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Dia` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `semanaId` on the `Dia` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Horario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cliente_nome` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `cliente_telefone` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `hora_fim` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `preenchido` on the `Horario` table. All the data in the column will be lost.
  - You are about to alter the column `diaId` on the `Horario` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Horario` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Semana` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Semana` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "semanaId" INTEGER NOT NULL,
    CONSTRAINT "Dia_semanaId_fkey" FOREIGN KEY ("semanaId") REFERENCES "Semana" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Dia" ("data", "id", "semanaId") SELECT "data", "id", "semanaId" FROM "Dia";
DROP TABLE "Dia";
ALTER TABLE "new_Dia" RENAME TO "Dia";
CREATE TABLE "new_Horario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hora_inicio" TEXT NOT NULL,
    "diaId" INTEGER NOT NULL,
    CONSTRAINT "Horario_diaId_fkey" FOREIGN KEY ("diaId") REFERENCES "Dia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Horario" ("diaId", "hora_inicio", "id") SELECT "diaId", "hora_inicio", "id" FROM "Horario";
DROP TABLE "Horario";
ALTER TABLE "new_Horario" RENAME TO "Horario";
CREATE TABLE "new_Semana" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL
);
INSERT INTO "new_Semana" ("data_fim", "data_inicio", "id") SELECT "data_fim", "data_inicio", "id" FROM "Semana";
DROP TABLE "Semana";
ALTER TABLE "new_Semana" RENAME TO "Semana";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
