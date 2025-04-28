import { Horario } from "@/components/Horario";
import { HorariosList } from "@/components/HorariosList";

type Horario = {
    id: string;
    hora_inicio: string;
    preenchido: boolean;
};

type Dia = {
    id: string;
    data: string;
    semanaId: number;
    horarios: Horario[];
};

export default async function Home() {
    const res = await fetch(
        `${process.env.NEXT_URL}/api/dias`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                all: false,
            }),
            next: {
                tags: ["get-horarios"],
            },
        }
    );
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

    return (
        <div className="bg-indigo-700 space-y-4">
            <div className="pt-4">
                <h2 className="text-center text-indigo-100 italic">
                    {month}, {year}
                </h2>
            </div>
            <ul className="bg-white p-4 space-y-8 rounded-2xl">
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
                        />
                    );
                })}
            </ul>
        </div>
    );
}
