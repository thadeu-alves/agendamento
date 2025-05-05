import { HorariosList } from "@/components/HorariosList";

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

const getDiaSemana = (today: number) => {
    const diasDaSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ];
    return diasDaSemana[today];
};

export default async function Home() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/dias`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                all: true,
            }),
            next: {
                tags: ["get-horarios"],
            },
        }
    );

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ao buscar dados: ${text}`);
    }

    const data = (await res.json()) || [];

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
    const today = new Date().getDay();
    console.log(today);

    return (
        <div className="bg-indigo-700 space-y-4 min-h-screen flex flex-col">
            <div className="pt-4">
                <h1 className=" text-white text-center text-2xl px-4 font-bold md:py-8">
                    Instituição
                </h1>
                <h2 className="text-center text-indigo-100 italic">
                    {month}, {year}
                </h2>
            </div>
            <ul className="bg-white p-4 space-y-8 rounded-2xl flex-1">
                <li>
                    <h1 className=" text-indigo-800 text-center text-2xl px-4 font-bold md:py-8">
                        Olá, veja os horários disponiveis de
                        hoje:
                    </h1>
                </li>
                {data.map((dia: Dia, id: number) => {
                    return (
                        <HorariosList
                            dia={dia}
                            id={id}
                            key={id}
                            diaSemana={getDiaSemana(id)}
                            today={today}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
