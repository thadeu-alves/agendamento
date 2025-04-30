"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function FormPage() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (nome && telefone) {
            Cookies.set("nome", nome);
            Cookies.set("telefone", telefone);
            router.push("/");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-20 space-y-4 p-4"
        >
            <h1 className="text-2xl font-bold">
                Identifique-se
            </h1>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="tel"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) =>
                    setTelefone(e.target.value)
                }
                className="w-full border p-2 rounded"
                required
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded"
            >
                Entrar
            </button>
        </form>
    );
}
