"use client";

import { cn } from "@/lib/utils";

export default function ButtonAction({
    children,
    callback,
    className,
}: Readonly<{
    children: React.ReactNode;
    callback: () => void;
    className: string;
}>) {
    return (
        <button
            onClick={callback}
            className={cn("px-4 py-2 rounded", className)}
        >
            {children}
        </button>
    );
}
