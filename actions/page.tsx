"use server";

import { prisma } from "@/lib/prisma";

export async function getData() {
    const data = await prisma.dia.findMany({
        include: {
            horarios: true,
        },
    });

    return data;
}
