import { ButtonActionReset } from "@/components/admin/ButtonActionReset";
import { Dia } from "./Dia";
import { Dia as DiaProps } from "@/app/page";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export async function HorariosList() {
    let data = null;
    try {
        const res = await fetch(
            `${process.env.NEXT_URL}/api/dias`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    all: true,
                }),
                next: {
                    tags: ["get-horarios"],
                },
            }
        );

        data = (await res.json()) || [];
    } catch (error) {
        console.error("Erro ao buscar semanas:", error);
    }

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
        "use server";
        await fetch(`${process.env.NEXT_URL}/api/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        revalidateTag("get-horarios");
    }

    return (
        <ul className="bg-white p-4 space-y-8 rounded-xl">
            <li className="space-y-4">
                <h1 className="text-2xl font-bold text-indigo-800">
                    Você esta em ambiente administrador.
                </h1>
                <h2 className="text-indigo-300">
                    As alterações serão refletidas para os
                    clientes.
                </h2>
            </li>

            {data.map((dia: DiaProps) => {
                const diaSemana = getDiaSemana(dia.data);
                return (
                    <Dia
                        diaSemana={diaSemana}
                        horarios={dia.horarios}
                        id={dia.id}
                        key={dia.id}
                    />
                );
            })}

            <li>
                <ButtonActionReset
                    callBack={async () => {
                        "use server";
                        handleReset();
                    }}
                    className="block bg-red-500 p-2 mt-8 rounded text-white mx-auto"
                >
                    Reset Semana
                </ButtonActionReset>
            </li>
        </ul>
    );
}
