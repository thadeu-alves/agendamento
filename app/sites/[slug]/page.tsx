import Dias from "@/components/Dias";

export interface Horario {
    id: string;
    preenchido: boolean;
    nome_cliente: string;
    hora_inicio: string;
    telefone: string;
    observacao: string;
    diaId: string;
}

export interface Dia {
    id: string;
    data: Date;
    semanaId: string;
    horarios: Horario[];
}

export default async function Home() {
    const getMes = (data: number) => {
        const mesesDoAno = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ];
        return mesesDoAno[data];
    };

    const monthNumber = new Date().getMonth();
    const month = getMes(monthNumber);
    const year = new Date().getFullYear();

    return (
        <div className="bg-fuchsia-700 space-y-4 min-h-screen flex flex-col">
            <div className="pt-4">
                <h1 className=" text-white text-center text-2xl px-4 font-bold md:py-8">
                    Bella Nails
                </h1>
                <h2 className="text-center text-fuchsia-100 italic">
                    {month}, {year}
                </h2>
            </div>
            <ul className="bg-white p-4 space-y-8 rounded-2xl flex-1">
                <li>
                    <h1 className=" text-fuchsia-800 text-center text-2xl px-4 font-bold md:py-8">
                        Olá, veja os horários disponiveis de
                        hoje:
                    </h1>
                </li>
                <Dias />
            </ul>
        </div>
    );
}
