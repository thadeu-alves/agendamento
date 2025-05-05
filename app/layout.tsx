import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Agende seu horário agora mesmo",
    description:
        "Desenvolvido por Thadeu ALves (www.thadeualves.site)",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
