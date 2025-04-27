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
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

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

                    <AlertDialogAction
                        className="bg-red-500 text-white flex-1"
                        onClick={handleAction}
                        type="submit"
                    >
                        Resetar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
