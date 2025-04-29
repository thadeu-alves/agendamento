import { HorarioAdmin } from "@/components/admin/HorarioAdmin";
import { ButtonActionAdd } from "@/components/ButtonAction";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import Image from "next/image";

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
}

export function Dia({ id, diaSemana, horarios }: DiaProps) {
    async function handleResetHorario({
        id,
    }: {
        id: string;
    }) {
        "use server";

        await prisma.horario.update({
            where: { id },
            data: {
                preenchido: false,
                nome_cliente: null,
                telefone: null,
                observacao: null,
            },
        });
        revalidateTag("get-horarios");
    }

    async function handleExcluirHorario({
        id,
    }: {
        id: string;
    }) {
        "use server";
        await prisma.horario.delete({
            where: { id },
        });
        revalidateTag("get-horarios");
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
                    "use server";

                    await prisma.horario.create({
                        data: {
                            diaId: id,
                            hora_inicio:
                                horario?.horario || "00:00",
                        },
                    });
                    revalidateTag("get-horarios");
                }}
                className="block mt-4 bg-indigo-700 text-white p-2 rounded w-fit md:col-span-2 lg:col-span-4"
            >
                <Image
                    src="./add.svg"
                    alt="add icon"
                    width={20}
                    height={20}
                />
            </ButtonActionAdd>
        </li>
    );
}
