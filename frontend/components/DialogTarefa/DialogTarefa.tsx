'use client'

import { CalendarIcon, PlusCircle } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Controller, useForm } from "react-hook-form";
import { TarefaProps, TarefaSchema } from "@/schemas/TarefaSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { api } from "@/services/api";

export default function DialogTarefa(){

    const {register,reset,handleSubmit,formState: {errors},control} = useForm<TarefaSchema>({resolver:zodResolver(TarefaProps)})
    const queryClient = useQueryClient()

    
    async function CriarTarefa(data:TarefaSchema){
        const res = await api.post('/tarefas',data)
        return res.data
    }

    const {mutate, isPending } = useMutation({
        mutationFn: CriarTarefa,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey:['tasks']})
            reset()
            alert("Tarefa Adicionada com sucesso!")
        },
        onError:(error)=>{
            console.log(error)
        }
    })

    function onSubmit(data:TarefaSchema){
        mutate(data)
    }

    return(
        <Dialog>
            <DialogTrigger className={buttonVariants({variant:"default"})}><PlusCircle/>Nova Tarefa</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova Tarefa</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <Label htmlFor="nome">Nome da Tarefa:</Label>
                        <Input maxLength={20} {...register("nome")} id="nome" type="text" placeholder="Fazer comprar..."/>
                        {errors?.nome && <span className="text-red-500">{errors.nome.message}</span>}
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="descricao">Descrição da Tarefa:</Label>
                        <Textarea className="break-all" maxLength={100} {...register("descricao")} placeholder="Comprar maças,uva,banana"/>
                        {errors?.descricao && <span className="text-red-500">{errors.descricao.message}</span>}
                    </div>
                    <div className="mb-2">
                        <Controller name="prioridade" control={control} render={({field}) =>(
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Escolha prioridade"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Prioridade</SelectLabel>
                                        <SelectItem value="Alto">Alto</SelectItem>
                                        <SelectItem value="Médio">Médio</SelectItem>
                                        <SelectItem value="Baixo">Baixo</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}/>
                    </div>
                    <div>
                        <Controller name="prazo" control={control} render={({field}) => (
                            <Popover>
                                <PopoverTrigger className={buttonVariants({variant:"secondary"})}>
                                    <CalendarIcon/>
                                    {field.value ? (format(new Date(field.value), "PPP", {locale : ptBR})) : 
                                        <span>Selecione uma data</span>
                                    }
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} onSelect={field.onChange}  />
                                </PopoverContent>
                            </Popover>
                        )}/>
                    </div>
                    <div className="flex justify-end gap-2">
                        <DialogClose className={buttonVariants({variant:"secondary"})}>Cancelar</DialogClose>
                        <Button type="submit">{isPending ? 'Adicionando...' : "Adicionar"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}