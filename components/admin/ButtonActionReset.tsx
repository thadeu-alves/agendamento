"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export function ButtonActionReset({
    children,
    callBack,
    className,
}: Readonly<{
    children: React.ReactNode;
    callBack: (data?: { horario: string }) => void;
    className: string;
}>) {
    function handleAction() {
        callBack();
        alert("Resetando Semana");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className={className}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white gap-8">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tem certeza disso?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:flex-row-reverse">
                    <AlertDialogCancel className="flex-1">
                        Cancelar
                    </AlertDialogCancel>

                    <button
                        className="bg-red-500 text-white flex-1 py-2 border border-red-950 rounded"
                        onClick={() => {
                            handleAction();
                        }}
                        type="submit"
                    >
                        Resetar
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
