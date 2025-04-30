"use client";

import Image from "next/image";

interface HorarioDisponivelProps {
    hora_inicio: string;
    handleExcluirHorario: (data: {
        id: string;
        diaId: string;
    }) => void;
    id: string;
    diaId: string;
}

export default function HorarioDisponivel({
    hora_inicio,
    handleExcluirHorario,
    id,
    diaId,
}: HorarioDisponivelProps) {
    return (
        <div className="flex bg-gray-100 transition-all ease-in-out px-4 py-2 w-full rounded-2xl text-black h-full">
            <div className="flex items-center w-full">
                <div className="border-r-2 border-r-white h-8 flex items-center px-4 py-6">
                    <h1 className="font-bold">
                        {hora_inicio}
                    </h1>
                </div>
                <div className="text-center flex-1">
                    <h1 className="font-bold">
                        Disponível
                    </h1>
                </div>
                <div>
                    <button
                        className="block bg-red-500 p-2 rounded text-white"
                        onClick={() => {
                            handleExcluirHorario({
                                id,
                                diaId,
                            });
                        }}
                    >
                        <Image
                            src="./trash.svg"
                            alt="trash icon"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
