"use client";

import { HorariosList } from "@/components/admin/HorariosList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dia } from "../page";

export const dynamic = "force-dynamic";

export default function Admin() {
    const { slug } = useParams();
    console.log(slug);
    const [data, setData] = useState<Dia[]>([]);
    const [loading, setLoading] = useState(false);
    const getMes = (data: number) => {
        const mesesDoAno = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ];
        return mesesDoAno[data];
    };
    const monthNumber = new Date().getMonth();
    const month = getMes(monthNumber);
    const year = new Date().getFullYear();

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

    if (data.length <= 0) {
        return;
    }

    return (
        <section className="bg-indigo-700">
            <div className="p-8 text-white space-y-2">
                <h1 className="text-2xl">
                    Olá, Administrador.
                </h1>
                <h3 className="text-white italic">
                    {loading
                        ? "Carregando..."
                        : month + ", " + year}
                </h3>
            </div>

            <HorariosList
                data={data}
                slug={slug ? slug[0] : ""}
            />
        </section>
    );
}
