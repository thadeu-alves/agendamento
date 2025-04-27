/*
  Warnings:

  - The primary key for the `Dia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Horario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "semanaId" INTEGER NOT NULL,
    CONSTRAINT "Dia_semanaId_fkey" FOREIGN KEY ("semanaId") REFERENCES "Semana" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Dia" ("data", "id", "semanaId") SELECT "data", "id", "semanaId" FROM "Dia";
DROP TABLE "Dia";
ALTER TABLE "new_Dia" RENAME TO "Dia";
CREATE TABLE "new_Horario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hora_inicio" TEXT NOT NULL,
    "preenchido" BOOLEAN NOT NULL DEFAULT false,
    "nome_cliente" TEXT,
    "telefone" TEXT,
    "observacao" TEXT,
    "diaId" TEXT NOT NULL,
    CONSTRAINT "Horario_diaId_fkey" FOREIGN KEY ("diaId") REFERENCES "Dia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Horario" ("diaId", "hora_inicio", "id") SELECT "diaId", "hora_inicio", "id" FROM "Horario";
DROP TABLE "Horario";
ALTER TABLE "new_Horario" RENAME TO "Horario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
