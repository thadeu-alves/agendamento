-- CreateTable
CREATE TABLE "Semana" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Dia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "semanaId" TEXT NOT NULL,
    CONSTRAINT "Dia_semanaId_fkey" FOREIGN KEY ("semanaId") REFERENCES "Semana" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hora_inicio" TEXT NOT NULL,
    "hora_fim" TEXT,
    "preenchido" BOOLEAN NOT NULL DEFAULT false,
    "cliente_nome" TEXT,
    "cliente_telefone" TEXT,
    "diaId" TEXT NOT NULL,
    CONSTRAINT "Horario_diaId_fkey" FOREIGN KEY ("diaId") REFERENCES "Dia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
