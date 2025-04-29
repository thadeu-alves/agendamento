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

import Cookies from "js-cookie";

interface handlePreencherProps {
    id: string;
    nome: string;
    telefone: string;
    observacao: string;
}

export function Horario({
    preenchido,
    hora_inicio,
    id,
    handlePreencher,
}: {
    preenchido: boolean;
    hora_inicio: string;
    id: string;
    handlePreencher: (data: handlePreencherProps) => void;
}) {
    function handleAgendar() {
        handlePreencher({
            id,
            nome: Cookies.get("nome") || "",
            telefone: Cookies.get("telefone") || "",
            observacao: "Esta é minha observação",
        });
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }

    if (preenchido) {
        return (
            <div className="flex bg-indigo-700 transition-all ease-in-out px-4 py-2 w-full rounded-2xl text-white h-full">
                <div className="flex items-center w-full">
                    <div className="border-r-2 border-r-white h-8 flex items-center px-4 py-6">
                        <h1 className="font-bold">
                            {hora_inicio}
                        </h1>
                    </div>
                    <div className="text-center flex-1">
                        <h1 className="font-bold">
                            Preenchido
                        </h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="block bg-indigo-50 cursor-pointer hover:bg-indigo-100 transition-all ease-in-out px-4 py-2 w-full h-full rounded-2xl ">
                <div className="flex items-center ">
                    <div className="border-r-2 border-r-neutral-400 h-8 flex items-center px-4 py-6">
                        <h1 className="font-bold">
                            {hora_inicio}
                        </h1>
                    </div>
                    <div className="text-center flex-1">
                        <h1>Disponível</h1>
                    </div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white gap-8">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Agende seu horário para as{" "}
                        {hora_inicio}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This
                        will permanently delete your account
                        and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:flex-row-reverse">
                    <AlertDialogCancel className="flex-1">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-indigo-700 text-white flex-1 p-2 rounded border border-indigo-50"
                        onClick={handleAgendar}
                    >
                        Agendar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
