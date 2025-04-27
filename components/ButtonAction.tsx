"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function ButtonActionAdd({
    children,
    callBack,
    className,
}: Readonly<{
    children: React.ReactNode;
    callBack: (data?: { horario: string }) => void;
    className: string;
}>) {
    const [horario, setHorario] = useState<string>("09:00");

    function handleAction() {
        callBack({ horario });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className={className}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white gap-8">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Adicione um novo horário
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-1 md:flex-row"
                    >
                        <input
                            type="text"
                            placeholder="00:00 por exemplo"
                            value={horario}
                            onChange={(e) =>
                                setHorario(e.target.value)
                            }
                            className="w-full border p-2 rounded mb-4"
                            required
                        />

                        <AlertDialogAction
                            className="bg-blue-500 text-white flex-1"
                            onClick={handleAction}
                            type="submit"
                        >
                            Adicionar
                        </AlertDialogAction>

                        <AlertDialogCancel className="flex-1">
                            Cancelar
                        </AlertDialogCancel>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
