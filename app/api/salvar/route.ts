import { Dia } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { semana } = await req.json();

        if (!semana || !Array.isArray(semana)) {
            console.error(
                "Formato de 'semana' inválido:",
                semana
            );
            return new Response("Dados inválidos", {
                status: 400,
            });
        }

        const allTransactions: Prisma.PrismaPromise<unknown>[] =
            [];

        semana.forEach((dia: Dia) => {
            const horariosIdsFront = dia.horarios
                .filter(
                    (horario) =>
                        horario.id && horario.id !== ""
                )
                .map((horario) => horario.id);

            // Primeiro: deletar os horários obsoletos
            allTransactions.push(
                prisma.horario.deleteMany({
                    where: horariosIdsFront.length
                        ? {
                              diaId: dia.id,
                              NOT: {
                                  id: {
                                      in: horariosIdsFront,
                                  },
                              },
                          }
                        : { diaId: dia.id },
                })
            );

            // Depois: atualiza ou cria os horários enviados
            for (const horario of dia.horarios) {
                if (horario.id && horario.id !== "") {
                    allTransactions.push(
                        prisma.horario.update({
                            where: { id: horario.id },
                            data: {
                                hora_inicio:
                                    horario.hora_inicio,
                            },
                        })
                    );
                } else {
                    allTransactions.push(
                        prisma.horario.create({
                            data: {
                                hora_inicio:
                                    horario.hora_inicio,
                                diaId: dia.id,
                            },
                        })
                    );
                }
            }
        });

        console.log(
            "Executando transações:",
            allTransactions.length
        );
        const result = await prisma.$transaction(
            allTransactions
        );
        console.log("Resultado da transação:", result);

        return Response.json({ ok: true });
    } catch (error) {
        console.error("Erro ao salvar horários:", error);
        return new Response(
            "Erro interno ao salvar os dados",
            { status: 500 }
        );
    }
}
