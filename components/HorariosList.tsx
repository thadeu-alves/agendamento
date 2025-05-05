"use client";

import { Horario } from "./Horario";

type Horario = {
    id: string;
    hora_inicio: string;
    preenchido: boolean;
    nome_cliente: string | null;
    telefone: string | null;
    observacao: string | null;
    diaId?: string;
};

type Dia = {
    id: string;
    data: Date;
    semanaId: string;
    horarios: Horario[];
};

export function HorariosList({
    dia,
    id,
    diaSemana,
    today,
}: {
    dia: Dia;
    id: number;
    diaSemana: string;
    today: number;
}) {
    async function handlePreencher({
        id,
        nome,
        telefone,
        observacao,
    }: {
        id: string;
        nome: string;
        telefone: string;
        observacao: string;
    }) {
        fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/preencher`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    horarioId: id,
                    nome,
                    telefone,
                    observacao,
                    key: "sqsaslp1212masasa",
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    }

    if (id < today) {
        return;
    }

    if (!dia) {
        return;
    }

    return (
        <li
            key={dia.id}
            className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-4 gap-2 items-stretch"
        >
            <h1
                className={`text-xl font-bold col-span-2 lg:col-span-4 ${
                    id == today ? "text-fuchsia-700" : ""
                }`}
            >
                {diaSemana}:{" "}
            </h1>

            {dia.horarios.length > 0
                ? dia.horarios.map((horario, index) => {
                      return (
                          <Horario
                              id={horario.id}
                              handlePreencher={
                                  handlePreencher
                              }
                              hora_inicio={
                                  horario.hora_inicio
                              }
                              key={index}
                              preenchido={
                                  horario.preenchido
                              }
                          />
                      );
                  })
                : "Nenhum horário disponível"}
        </li>
    );
}
