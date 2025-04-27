-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Horario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hora_inicio" TEXT NOT NULL,
    "diaId" INTEGER NOT NULL,
    CONSTRAINT "Horario_diaId_fkey" FOREIGN KEY ("diaId") REFERENCES "Dia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Horario" ("diaId", "hora_inicio", "id") SELECT "diaId", "hora_inicio", "id" FROM "Horario";
DROP TABLE "Horario";
ALTER TABLE "new_Horario" RENAME TO "Horario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
