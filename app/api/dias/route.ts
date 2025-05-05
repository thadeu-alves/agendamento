import { Horario, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { all, slug } = body;

        if (!slug) {
            return NextResponse.json(
                { message: "Slug é obrigatório." },
                { status: 400 }
            );
        }

        const semana = await prisma.semana.findFirst({
            include: {
                dias: {
                    include: {
                        horarios: true,
                    },
                },
            },
            where: {
                slug,
            },
        });

        if (!semana) {
            return NextResponse.json(
                {
                    message: `Semana com slug '${slug}' não encontrada.`,
                },
                { status: 404 }
            );
        }

        const allDias = semana.dias;

        if (all) {
            return NextResponse.json(allDias);
        }

        const today = new Date().getDay();
        const now = new Date().getHours();

        const filteredDias = allDias.map((dia) => ({
            ...dia,
            horarios: dia.horarios.filter((h: Horario) => {
                if (!h.hora_inicio) return false;
                const hour = parseInt(
                    h.hora_inicio.slice(0, 2)
                );
                return Number.isNaN(hour) ? 0 : hour;
                return hour > now;
            }),
        }));

        return NextResponse.json(filteredDias.slice(today));
    } catch (error) {
        console.error(
            "Erro ao processar a requisição:",
            error
        );
        return NextResponse.json(
            {
                message: "Erro ao processar os dias.",
                error: String(error),
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
