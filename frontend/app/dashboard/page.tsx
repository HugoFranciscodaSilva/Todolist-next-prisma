import BotaoLogout from "@/components/BotaoLogout/BotaoLogout";
import DialogTarefa from "@/components/DialogTarefa/DialogTarefa";
import TabelaTarefa from "@/components/TabelaTarefa/TabelaTarefa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function Dashboard(){

    return(
        <main className="relative h-dvh">
            <Card className="absolute top-1/3 left-1/2 -translate-1/2 min-w-1/4">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Tarefas</CardTitle>
                    <DialogTarefa/>
                </CardHeader>
                <CardContent>
                    <TabelaTarefa/>
                </CardContent>
            </Card>
           <BotaoLogout/>
        </main>
    )
}