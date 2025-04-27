import { HorariosList } from "@/components/admin/HorariosList";

export default async function Admin() {
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
        <section className="bg-indigo-700">
            <div className="p-8 text-white space-y-2">
                <h1 className="text-2xl">
                    Olá, Administrador.
                </h1>
                <h3 className="text-white italic">
                    {month}, {year}
                </h3>
            </div>
            <HorariosList />
        </section>
    );
}
