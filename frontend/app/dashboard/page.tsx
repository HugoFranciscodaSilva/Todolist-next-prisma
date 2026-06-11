import BotaoLogout from "@/components/BotaoLogout/BotaoLogout";
import DialogTarefa from "@/components/DialogTarefa/DialogTarefa";
import TabelaTarefa from "@/components/TabelaTarefa/TabelaTarefa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Clock, List, RefreshCcw } from "lucide-react";


export default function Dashboard(){

    return(
        <main className="relative h-dvh">
            {/* <Card className="absolute top-1/3 left-1/2 -translate-1/2 min-w-1/4">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Tarefas</CardTitle>
                    <DialogTarefa/>
                </CardHeader>
                <CardContent>
                    <TabelaTarefa/>
                </CardContent>
            </Card> */}
           <BotaoLogout/>
            <h1>Bom dia, Hugo</h1>
            <h4>sábado,30 de maio de 2026</h4>
            <section className="flex justify-around">
                <Card className="w-[20%] pl-7 justify-between">
                    <div className="bg-white/10 w-8 h-8 flex items-center rounded-md">
                        <List className="text-white w-6 m-auto"/>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Total de tarefas</p>
                        <h2 className="text-3xl">128</h2>
                    </div>
                </Card>
                <Card className="w-[20%] pl-7 justify-between">
                    <div className="bg-green-950/60 w-8 h-8 flex items-center rounded-md">
                        <CheckCircle className="text-emerald-500 w-6 m-auto"/>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Concluídas</p>
                        <h2 className="text-3xl">84</h2>
                    </div>
                </Card>
                <Card className="w-[20%] pl-7 justify-between">
                    <div className="bg-blue-950/60 w-8 h-8 flex items-center rounded-md">
                        <RefreshCcw className="text-blue-500 w-6 m-auto"/>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Em Andamento</p>
                        <h2 className="text-3xl">32</h2>
                    </div>
                </Card>
                <Card className="w-[20%] pl-7 justify-between">
                    <div className="bg-yellow-950/60 w-8 h-8 flex items-center rounded-md">
                        <Clock className="text-yellow-500 w-6 m-auto"/>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Pendentes</p>
                        <h2 className="text-3xl">12</h2>
                    </div>
                </Card>
            </section>
            <section className="w-[80%] m-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titulo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Prioridade</TableHead>
                            <TableHead>Prazo</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <span className="text-lg">Revisão de Design System</span>
                                <span className="text-[12px]">Mudar os tokens de cor para o modo escuro</span>
                            </TableCell>
                            <TableCell><span className="bg-blue-950/60 text-blue-500 p-2 rounded-3xl font-bold">• Em Andamento</span></TableCell>
                            <TableCell><span className="bg-red-950/60 text-red-500 p-2 rounded-3xl font-bold">Alta</span></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </main>
    )
}