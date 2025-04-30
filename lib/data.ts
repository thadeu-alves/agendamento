import { Horario } from "@/app/page";
import { prisma } from "./prisma";

export interface Dia {
    horarios: Horario[];
    id: string;
    data: Date;
}

const data: Horario[] = [];
export const allDias: Dia[] = [];

export function pushToAllData(object: Dia) {
    allDias.push(object);
}

export function pushData(object: Horario) {
    data.push(object);
    allDias.map((dia) => {
        console.log(object.diaId);
        if (dia.id === object.diaId) {
            dia.horarios.push(object);
        }
    });
    console.log(allDias);
}

export function removeData(object: Horario) {
    data.splice(data.indexOf(object));
}

export function salvar() {
    data.map(async (h: Horario) => {
        await prisma.horario.create({
            data: {
                hora_inicio: h.hora_inicio,
                diaId: h.diaId,
            },
        });
    });
}
