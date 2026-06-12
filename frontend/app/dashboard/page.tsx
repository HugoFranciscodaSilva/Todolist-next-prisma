
import BotaoLogout from "@/components/BotaoLogout/BotaoLogout";
import DialogTarefa from "@/components/DialogTarefa/DialogTarefa";
import TabelaTarefa from "@/components/TabelaTarefa/TabelaTarefa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Clock, List, Pencil, RefreshCcw, Trash } from "lucide-react";


export default function Dashboard(){

    return(
        <main className="relative h-dvh bg-cinza px-20 space-y-5 pt-5">
           <BotaoLogout/>
           <div>
                <h1 className="text-3xl font-bold">Bom dia, Hugo</h1>
                <h4>sábado,30 de maio de 2026</h4>
           </div>
            <section className="flex justify-between">
                <Card className="w-[20%] pl-7 justify-between bg-azulescuro border-borda">
                    <div className="bg-white/10 w-8 h-8 flex items-center rounded-md">
                        <List className="text-white w-6 m-auto"/>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Total de tarefas</p>
                        <h2 className="text-3xl">128</h2>
                    </div>
                </Card>
                <Card className="w-[20%] pl-7 justify-between bg-azulescuro border-borda">
                    <div className="bg-green-950/60 w-8 h-8 flex items-center rounded-md">
                        <CheckCircle className="text-emerald-500 w-6 m-auto"/>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Concluídas</p>
                        <h2 className="text-3xl">84</h2>
                    </div>
                </Card>
                <Card className="w-[20%] pl-7 justify-between bg-azulescuro border-borda">
                    <div className="bg-blue-950/60 w-8 h-8 flex items-center rounded-md">
                        <RefreshCcw className="text-blue-500 w-6 m-auto"/>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Em Andamento</p>
                        <h2 className="text-3xl">32</h2>
                    </div>
                </Card>
                <Card className="w-[20%] pl-7 justify-between bg-azulescuro border-borda">
                    <div className="bg-yellow-950/60 w-8 h-8 flex items-center rounded-md">
                        <Clock className="text-yellow-500 w-6 m-auto"/>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Pendentes</p>
                        <h2 className="text-3xl">12</h2>
                    </div>
                </Card>
            </section>
            <section>
                <TabelaTarefa/>
            </section>
            <DialogTarefa/>
        </main>
    )
}