"use client";

import { Dia } from "@/app/page";
import { useEffect, useState } from "react";
import { HorariosList } from "./HorariosList";
import { useParams } from "next/navigation";

export default function Dias() {
    const { slug } = useParams();

    const [data, setData] = useState<Dia[]>([]);
    const [loading, setLoading] = useState(false);
    const [all, setAll] = useState(false);

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
                setLoading(true);
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
                            slug,
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
            } finally {
                setLoading(false);
            }
        };

        fetchDias();
    }, [slug]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!all && !loading) {
        console.log(data);
        return (
            <>
                <HorariosList
                    dia={data[today]}
                    id={today}
                    key={today}
                    diaSemana={getDiaSemana(today)}
                    today={today}
                />

                <div className="w-ful flex justify-center">
                    <button
                        className="bg-fuchsia-400 py-2 px-4 rounded text-white"
                        onClick={() => {
                            setAll(true);
                        }}
                    >
                        Ver Todos
                    </button>
                </div>
            </>
        );
    }

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
