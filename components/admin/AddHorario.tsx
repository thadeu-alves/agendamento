"use client";

interface AddHorarioProps {
    handleAdd: (data: {
        diaId: string;
        hora_inicio: string;
    }) => void;
    diaId: string;
}

export function AddHorario({
    handleAdd,
    diaId,
}: AddHorarioProps) {
    return (
        <button
            onClick={() => {
                handleAdd({ diaId, hora_inicio: "23:00" });
            }}
            className="block bg-blue-400 text-white p-1 rounded mt-4"
        >
            Adicionar Horário
        </button>
    );
}
