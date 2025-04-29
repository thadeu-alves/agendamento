import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function resetSemana(slug: string) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const semanasDoCliente = await prisma.semana.findMany({
        where: { slug },
        include: {
            dias: {
                include: {
                    horarios: true,
                },
            },
        },
    });

    for (const semana of semanasDoCliente) {
        for (const dia of semana.dias) {
            await prisma.horario.deleteMany({
                where: { diaId: dia.id },
            });
        }

        await prisma.dia.deleteMany({
            where: { semanaId: semana.id },
        });

        await prisma.semana.delete({
            where: { id: semana.id },
        });
    }

    const inicioSemana = new Date(hoje);
    const diaAtual = inicioSemana.getDay();
    inicioSemana.setDate(inicioSemana.getDate() - diaAtual);

    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(fimSemana.getDate() + 6);

    const novaSemana = await prisma.semana.create({
        data: {
            slug,
            data_inicio: inicioSemana,
            data_fim: fimSemana,
        },
    });

    const dataDoDia = new Date(inicioSemana);
    for (let i = 0; i < 7; i++) {
        await prisma.dia.create({
            data: {
                data: new Date(dataDoDia),
                semanaId: novaSemana.id,
            },
        });

        dataDoDia.setDate(dataDoDia.getDate() + 1);
    }

    return {
        message: "Semana criada com sucesso!",
        semanaId: novaSemana.id,
    };
}
