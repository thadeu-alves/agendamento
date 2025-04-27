import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);
        const {
            horarioId,
            nome,
            telefone,
            observacao,
            key,
        } = body;

        if (key !== "sqsaslp1212masasa") {
            return NextResponse.json({
                message: "Falha",
            });
        }

        console.log("Id: " + horarioId);

        if (!horarioId || !nome || !telefone) {
            return NextResponse.json(
                { message: "Dados incompletos." },
                { status: 400 }
            );
        }

        const horario = await prisma.horario.update({
            where: { id: horarioId },
            data: {
                preenchido: true,
                nome_cliente: nome,
                telefone,
                observacao,
            },
        });

        return NextResponse.json({
            message: "Horário agendado com sucesso.",
            horario,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao agendar horário.", error },
            { status: 500 }
        );
    }
}
