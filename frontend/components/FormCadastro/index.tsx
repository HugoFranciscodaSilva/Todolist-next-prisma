'use client'

import { CadastroProps, CadastroSchema } from "@/schemas/UsuarioSchema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

export default function FormCadastro(){

    const queryClient = useQueryClient()

    async function CriarConta(data:CadastroSchema){
        const res = await api.post('/usuarios',data)
        return res
    }

    const {register,handleSubmit,reset,formState:{errors}} = useForm<CadastroSchema>({resolver:zodResolver(CadastroProps)})

    const {mutate,isPending} = useMutation({
        mutationFn:CriarConta,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['cadastro']})
            reset()
            alert("Conta criada!")
        },
        onError:(error)=>{
            console.log(error)
        }
    })

    function onSubmit(data:CadastroSchema){
        mutate(data)
    }

    
    return(
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div>
                <Label htmlFor="nome">Digite seu nome:</Label>
                <Input {...register("nome")} type="text" id="nome" placeholder="Fulano"/>
                {errors?.nome && <span className='text-red-500'>{errors.nome.message}</span>}
            </div>
            <div>
                <Label htmlFor="email">Digite seu email:</Label>
                <Input {...register("email")} type="email" id="email" placeholder="exemplo@exemplo.com"/>
                {errors?.email && <span className='text-red-500'>{errors.email.message}</span>}
            </div>
            <div>
                <Label htmlFor="senha">Digite sua senha:</Label>
                <Input {...register("senha")} type="password" id="senha" placeholder="••••••••••••"/>
                {errors?.senha && <span className='text-red-500'>{errors.senha.message}</span>}
            </div>
            <Button type="submit" className="w-full">{isPending ? 'Criando...' : 'Criar Conta'}</Button>
        </form>
    )
}