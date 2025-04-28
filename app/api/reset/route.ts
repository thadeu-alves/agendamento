import { resetSemana } from "@/lib/resetSemana";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const body = await resetSemana("dev");

        return NextResponse.json(body);
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao pegar dias.", error },
            { status: 500 }
        );
    }
}
