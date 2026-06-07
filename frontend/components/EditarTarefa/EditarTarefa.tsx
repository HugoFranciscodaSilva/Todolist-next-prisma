import { CalendarIcon, Edit } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { TarefaProps, TarefaSchema } from "@/schemas/TarefaSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


export default function EditarTarefa({tarefa}:any){

    const queryClient = useQueryClient()

    async function Editar(data:TarefaSchema){
        const res = await api.patch(`/tarefas/${tarefa.id}`,data)
        return res.data
    }


    const {register,reset,handleSubmit,formState:{errors}, control} = useForm<TarefaSchema>({resolver: zodResolver(TarefaProps),
        defaultValues:{
            nome:tarefa.nome,
            descricao:tarefa.descricao,
            prioridade:tarefa.prioridade,
            prazo:new Date(tarefa.prazo)
        }})

    const {mutate,isPending} = useMutation({
        mutationFn:Editar,
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey:['tasks']}),
            reset()
            alert("Tarefa atualizada com sucesso!")
        },
        onError:(error)=>{
            console.log(error)
        }
    })

    function onSubmit(data:TarefaSchema){
        mutate(data)
    }

    useEffect(()=>{
        if(tarefa){
            reset({
                nome:tarefa.nome,
                descricao:tarefa.descricao,
                prioridade:tarefa.prioridade,
                prazo:tarefa.prazo ? new Date(tarefa.prazo) : undefined
            })
        }
    },[tarefa,reset])

    return(
        <Dialog>
            <DialogTrigger className={buttonVariants({variant:"default"})}><Edit/> Editar</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Tarefa</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <Label htmlFor="nome">Novo Nome:</Label>
                        <Input maxLength={20} {...register("nome")} id="nome" type="text" placeholder={tarefa.nome}/>
                        {errors?.nome && <span className="text-red-500">{errors.nome.message}</span>}
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="descricao">Descrição da Tarefa:</Label>
                        <Textarea className="break-all" maxLength={100} {...register("descricao")} placeholder={tarefa.descricao}/>
                        {errors?.descricao && <span className="text-red-500">{errors.descricao.message}</span>}
                    </div>
                    <div className="mb-2">
                        <Controller name="prioridade" control={control} render={({field}) =>(
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={`Prioridade antiga`}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{tarefa.prioridade}</SelectLabel>
                                        <SelectItem value="Alto">Alto</SelectItem>
                                        <SelectItem value="Medio">Médio</SelectItem>
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
                                        <span>Data antiga: {new Date(tarefa.prazo).toLocaleDateString("pt-BR",{timeZone:"UTC"})}</span>
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