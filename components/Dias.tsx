"use client";

import { Dia } from "@/app/page";
import { useEffect, useState } from "react";
import { HorariosList } from "./HorariosList";

export default function Dias() {
    const [data, setData] = useState<Dia[]>([]);
    const today = new Date().getDay();

    const getDiaSemana = (today: number) => {
        const diasDaSemana = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
        ];
        return diasDaSemana[today];
    };

    useEffect(() => {
        const fetchDias = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/api/dias`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            all: true,
                        }),
                    }
                );

                if (!res.ok) {
                    throw new Error(
                        "Erro ao buscar os dias"
                    );
                }

                const result: Dia[] = await res.json();
                setData(result || []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchDias();
    }, []);

    return data.map((dia: Dia, id: number) => {
        return (
            <HorariosList
                dia={dia}
                id={id}
                key={id}
                diaSemana={getDiaSemana(id)}
                today={today}
            />
        );
    });
}
