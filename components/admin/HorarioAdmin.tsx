"use client";
import HorarioDisponivel from "./HorarioDisponivel";
import { HorarioIndisponivel } from "./HorarioIndisponivel";

export function HorarioAdmin({
    preenchido,
    hora_inicio,
    id,
    handleResetHorario,
    handleExcluirHorario,
    nome,
    tel,
    obs,
}: {
    preenchido: boolean;
    hora_inicio: string;
    id: string;
    handleResetHorario: (data: { id: string }) => void;
    handleExcluirHorario: (data: { id: string }) => void;
    nome: string;
    tel: string;
    obs: string;
}) {
    if (!preenchido) {
        return (
            <HorarioDisponivel
                hora_inicio={hora_inicio}
                handleExcluirHorario={handleExcluirHorario}
                id={id}
            />
        );
    }

    return (
        <HorarioIndisponivel
            hora_inicio={hora_inicio}
            id={id}
            handleResetHorario={handleResetHorario}
            nome={nome}
            obs={obs}
            tel={tel}
        />
    );
}
