'use client'

import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { TarefaSchema } from "@/schemas/TarefaSchema";
import EditarTarefa from "../EditarTarefa/EditarTarefa";


interface TarefaExtends extends TarefaSchema{
    id:number,
    status:string
}
export default function TabelaTarefa(){

    const queryClient = useQueryClient()


    async function BuscarTarefas(){
        const res = await api.get('/tarefas')
        return res.data
    }
    
      async function Apagar(id:number){
        const res = await api.delete(`/tarefas/${id}`)
        return res.data
    }

    const {data,isLoading,isError} = useQuery<TarefaExtends[]>({
        queryKey:['tasks'],
        queryFn: BuscarTarefas,
        refetchInterval: 60 * 1000,
        select:(tarefas) =>{
            return [...tarefas].sort((a,b) => a.id - b.id)
        }
    })

    const {mutate,isPending,variables} = useMutation({
        mutationFn:Apagar,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['tasks']})
            alert("Tarefa apagada com sucesso!")
        },
        onError:(error)=>{
            console.log(error)
        }
    })

    function ApagarTarefa(id:number){
        mutate(id)
    }

    return(
        <Table className="border-separate border-spacing-0">
            {/* <TableHeader>
                <TableRow>
                    <TableHead className="rounded-tl-md">N</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead className="rounded-tr-md">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading && <TableRow><TableCell colSpan={7} className="text-center">Carregando...</TableCell></TableRow>}
                {isError && <TableRow><TableCell colSpan={7} className="text-red-500 text-center">Erro ao carregar tarefas!</TableCell></TableRow>}
                {data && data.length === 0 && <TableRow><TableCell colSpan={7} className="text-center">Não há tarefas</TableCell></TableRow>}
                {data?.map((tarefa:TarefaExtends,index:number)=>
                    <TableRow key={tarefa.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{tarefa.nome}</TableCell>
                        <TableCell>{tarefa.descricao}</TableCell>
                        <TableCell>{tarefa.status}</TableCell>
                        <TableCell>{tarefa.prazo ? new Date(tarefa.prazo).toLocaleDateString('pt-BR',{timeZone: 'UTC'}) : "Sem Prazo"}</TableCell>
                        <TableCell>{tarefa.prioridade}</TableCell>
                        <TableCell className="space-x-2">
                            <EditarTarefa tarefa={tarefa}/>
                            <Button disabled={isPending && variables === tarefa.id} variant={"destructive"} onClick={() => ApagarTarefa(tarefa.id)}><Trash/>{isPending && variables === tarefa.id ? 'Excluindo...' : 'Excluir'}</Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody> */}
            <TableHeader>
                        <TableRow>
                            <TableCell colSpan={5} className="border-b-none border-t-2 border-x-2 rounded-t-2xl text-2xl" >Minhas Tarefas</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-l-2">Titulo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Prioridade</TableHead>
                            <TableHead>Prazo</TableHead>
                            <TableHead className="border-r-2">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((tarefa:TarefaExtends) =>
                            <TableRow key={tarefa.id}>
                                <TableCell className=" border-l-2">
                                    <span className="text-lg">{tarefa.nome}</span><br />
                                    <span className="text-[12px]">{tarefa.descricao}</span>
                                </TableCell>
                                <TableCell><span className="bg-blue-950/60 text-blue-500 p-2 rounded-3xl font-bold">• {tarefa.status}</span></TableCell>
                                <TableCell><span className="bg-red-950/60 text-red-500 p-2 rounded-3xl font-bold">{tarefa.prioridade}</span></TableCell>
                                <TableCell>{tarefa.prazo ? new Date(tarefa.prazo).toLocaleDateString('pt-BR',{timeZone:"UTC"}) : 'Sem Prazo'}</TableCell>
                                <TableCell className="border-r-2">
                                    <div className="flex gap-2">
                                        <Pencil className="text-muted-foreground hover:text-white cursor-pointer"/>
                                        <Trash className="text-muted-foreground hover:text-white cursor-pointer"/>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell className=" border-l-2">
                                <span className="text-lg">Revisão de Design System</span><br />
                                <span className="text-[12px]">Mudar os tokens de cor para o modo escuro</span>
                            </TableCell>
                            <TableCell><span className="bg-blue-950/60 text-blue-500 p-2 rounded-3xl font-bold">• Em Andamento</span></TableCell>
                            <TableCell><span className="bg-red-950/60 text-red-500 p-2 rounded-3xl font-bold">Alta</span></TableCell>
                            <TableCell>12 Mai,2024</TableCell>
                            <TableCell className="border-r-2">
                                <div className="flex gap-2">
                                    <Pencil className="text-muted-foreground hover:text-white cursor-pointer"/>
                                    <Trash className="text-muted-foreground hover:text-white cursor-pointer"/>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell className="rounded-bl-md border-l-2 text-md" colSpan={4}>Mostrando 3 de 128 tarefas</TableCell>
                            <TableCell className="rounded-br-2xl border-r-2"><Button className="bg-cinza hover:bg-cinza/60 text-cinzaclaro">Ver Mais</Button></TableCell>
                        </TableRow>
                    </TableFooter>
        </Table>
    )
}