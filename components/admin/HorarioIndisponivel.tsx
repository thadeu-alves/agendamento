"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface HorarioIndisponivelProps {
    hora_inicio: string;
    nome: string;
    tel: string;
    obs: string;
    id: string;
    handleResetHorario: (data: { id: string }) => void;
}

export function HorarioIndisponivel({
    hora_inicio,
    nome,
    tel,
    obs,
    id,
    handleResetHorario,
}: HorarioIndisponivelProps) {
    function handleAction() {
        handleResetHorario({ id });
        setTimeout(() => {
            router.refresh();
        }, 100);
        router.refresh();
    }

    const router = useRouter();

    return (
        <AlertDialog>
            <AlertDialogTrigger className="block bg-indigo-400 cursor-pointer hover:bg-indigo-300 transition-all ease-in-out p-4 w-full h-full rounded-2xl text-white">
                <div className="flex items-center ">
                    <div className="border-r-2 border-r-gray-300 h-8 flex items-center px-4 py-6">
                        <h1 className="font-bold">
                            {hora_inicio}
                        </h1>
                    </div>
                    <div className="text-center flex-1 space-y-2">
                        <h1>Agendado por {nome}</h1>
                        <h2 className="text-sm">{tel}</h2>
                        <h3 className="text-xs">{obs}</h3>
                    </div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white gap-8">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Excluir horário agendado de {nome}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita.
                        Tome muito cuidado.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:flex-row-reverse">
                    <AlertDialogCancel className="flex-1">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 text-white flex-1"
                        onClick={handleAction}
                    >
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
