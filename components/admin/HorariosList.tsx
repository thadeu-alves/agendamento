import { ButtonActionReset } from "@/components/admin/ButtonActionReset";
import { prisma } from "@/lib/prisma";
import { resetSemana } from "@/lib/resetSemana";
import { Dia } from "./Dia";
export async function HorariosList() {
    let semana = null;
    try {
        semana = await prisma.semana.findFirst({
            where: {
                slug: "dev",
            },
            include: {
                dias: {
                    include: {
                        horarios: true,
                    },
                },
            },
        });
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

            {semana?.dias.map((dia) => {
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
                        resetSemana(semana?.slug || "");
                    }}
                    className="block bg-red-500 p-2 mt-8 rounded text-white mx-auto"
                >
                    Reset Semana
                </ButtonActionReset>
            </li>
        </ul>
    );
}
