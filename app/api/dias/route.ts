import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { all } = body;

        const allDias = await prisma.dia.findMany({
            include: {
                horarios: true,
            },
        });

        if (all) {
            return NextResponse.json(allDias);
        }

        const today = new Date().getDay();
        const now = new Date().getHours();

        allDias[0].horarios = allDias[0].horarios.filter(
            (h) => {
                const number = parseInt(
                    h.hora_inicio.slice(0, 2)
                );
                return number > now;
            }
        );

        return NextResponse.json(allDias.slice(today, 7));
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao pegar dias.", error },
            { status: 500 }
        );
    }
}
