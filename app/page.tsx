import { HorariosList } from "@/components/HorariosList";
import { prisma } from "@/lib/prisma";

export default async function Home() {
    const data = await prisma.dia.findMany({
        include: {
            horarios: true,
        },
    });

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
                {data.map((dia, id) => {
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
