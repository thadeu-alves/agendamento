"use client";
import { HorarioAdmin } from "@/components/admin/HorarioAdmin";
import { ButtonActionAdd } from "@/components/admin/ButtonAction";
import Image from "next/image";
import { Horario } from "@/app/page";

interface DiaProps {
    id: string;
    diaSemana: string;
    horarios: {
        id: string;
        telefone: string | null;
        observacao: string | null;
        hora_inicio: string;
        preenchido: boolean;
        nome_cliente: string | null;
        diaId: string;
    }[];
    onAddHorario: (horario: Horario) => void;
    onRemoveHorario: (data: {
        diaId: string;
        horarioId: string;
    }) => void;
}

export function Dia({
    id,
    diaSemana,
    horarios,
    onAddHorario,
    onRemoveHorario,
}: DiaProps) {
    async function handleResetHorario({
        id,
    }: {
        id: string;
    }) {
        console.log(id);
    }

    async function handleExcluirHorario({
        id,
        diaId,
    }: {
        id: string;
        diaId: string;
    }) {
        onRemoveHorario({ horarioId: id, diaId });
    }
    return (
        <li
            key={id}
            className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-4 gap-2 items-stretch"
        >
            <h1 className="text-xl font-bold col-span-2 lg:col-span-4">
                {diaSemana}:{" "}
            </h1>
            {horarios.length > 0
                ? horarios.map((horario, index) => (
                      <HorarioAdmin
                          id={horario.id}
                          diaId={id}
                          handleResetHorario={
                              handleResetHorario
                          }
                          handleExcluirHorario={
                              handleExcluirHorario
                          }
                          hora_inicio={horario.hora_inicio}
                          key={index}
                          preenchido={horario.preenchido}
                          nome={horario.nome_cliente || ""}
                          tel={horario.telefone || ""}
                          obs={horario.observacao || ""}
                      />
                  ))
                : "Nenhum horário disponível"}

            <ButtonActionAdd
                callBack={async (horario) => {
                    onAddHorario({
                        diaId: id,
                        hora_inicio:
                            horario?.horario || "00:00",
                        id: "",
                        nome_cliente: "",
                        observacao: "",
                        preenchido: false,
                        telefone: "",
                    });
                }}
                className="block mt-4 bg-indigo-700 text-white p-2 rounded w-fit md:col-span-2 lg:col-span-4"
            >
                <Image
                    src="/add.svg"
                    alt="add icon"
                    width={20}
                    height={20}
                />
            </ButtonActionAdd>
        </li>
    );
}
