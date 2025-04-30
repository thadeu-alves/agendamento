"use client";

import { ButtonActionReset } from "@/components/admin/ButtonActionReset";
import { Dia } from "./Dia";
import ButtonAction from "../ButtonAction";
import { Dia as DiaProps } from "@/lib/data";
import { useState } from "react";
import { Horario } from "@/app/page";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export function HorariosList({
    data,
}: {
    data: DiaProps[];
}) {
    const [semana, setSemana] = useState(data);
    const [loading, setLoading] = useState(false);

    const getDiaSemana = (data: Date) => {
        const diasDaSemana = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
        ];
        const date = new Date(data);
        return diasDaSemana[date.getDay()];
    };

    async function handleReset() {
        await fetch(`${process.env.NEXT_URL}/api/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async function handleSalvar() {
        console.log(process.env.NEXT_URL);
        setLoading(true);
        await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/salvar`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ semana }),
            }
        );
        window.location.reload();
    }

    function addHorario(novoHorario: Horario) {
        const novaSemana = semana.map((dia) => {
            if (dia.id === novoHorario.diaId) {
                return {
                    ...dia,
                    horarios: [
                        ...dia.horarios,
                        novoHorario,
                    ],
                };
            }
            return dia;
        });
        setSemana(novaSemana);
    }

    function removeHorario({
        diaId,
        horarioId,
    }: {
        diaId: string;
        horarioId: string;
    }) {
        const novaSemana = semana.map((dia) => {
            if (dia.id === diaId) {
                return {
                    ...dia,
                    horarios: dia.horarios.filter(
                        (h) => h.id !== horarioId
                    ),
                };
            }
            return dia;
        });
        setSemana(novaSemana);
    }

    return (
        <ul className="bg-white p-4 space-y-8 rounded-xl">
            <li className="space-y-4">
                <h1 className="text-2xl font-bold text-indigo-800">
                    Você está em ambiente administrador.
                </h1>
                <h2 className="text-indigo-300">
                    As alterações serão refletidas para os
                    clientes.
                </h2>
            </li>

            {semana.map((dia) => {
                const diaSemana = getDiaSemana(dia.data);
                return (
                    <Dia
                        diaSemana={diaSemana}
                        horarios={dia.horarios}
                        id={dia.id}
                        key={dia.id}
                        onAddHorario={addHorario}
                        onRemoveHorario={removeHorario}
                    />
                );
            })}

            <li className="flex flex-col gap-4">
                <ButtonAction
                    callback={handleSalvar}
                    className={cn(
                        "bg-indigo-900 text-white mx-auto mt-8 ",
                        semana == data
                            ? "bg-gray-200 cursor-not-allowed"
                            : loading
                            ? "bg-indigo-400"
                            : ""
                    )}
                >
                    {loading ? "Salvando..." : "Salvar"}
                </ButtonAction>
                <ButtonActionReset
                    callBack={handleReset}
                    className="block bg-red-500 p-2 rounded text-white mx-auto"
                >
                    Reset Semana
                </ButtonActionReset>
            </li>
        </ul>
    );
}
