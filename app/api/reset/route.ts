import { resetSemana } from "@/lib/resetSemana";
import { console } from "inspector";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { slug } = await req.json();
        console.log(slug);
        const body = await resetSemana(slug);
        return NextResponse.json(body);
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao pegar dias.", error },
            { status: 500 }
        );
    }
}
