'use client'

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
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
        <Table>
            <TableHeader>
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
            </TableBody>
        </Table>
    )
}