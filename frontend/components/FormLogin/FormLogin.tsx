"use client"


import { useForm } from 'react-hook-form'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { UsuarioProps, UsuarioSchema } from '@/schemas/UsuarioSchema'
import {zodResolver} from '@hookform/resolvers/zod/dist/zod.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { api } from '@/services/api'
import Cookies from 'js-cookie'

export default function FormLogin(){

    const searchParams = useSearchParams()
    const errorType = searchParams.get("error")

    useEffect(()=>{
        if(errorType === "unauthorized"){
            alert("Você precisa logar!")
            window.history.replaceState({},"","/")
        }
    },[errorType])
    const {register, reset, handleSubmit, formState: {errors}} = useForm<UsuarioSchema>({resolver: zodResolver(UsuarioProps)})
    const queryClient = useQueryClient()
    const router = useRouter()


    async function Logar(data:UsuarioSchema){
        const res = await api.post('/auth/login',data)
        return res.data
    }


    const {mutate, isPending} = useMutation({
        mutationFn: Logar,
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey:["logado"]})
            const umaHora = new Date(new Date().getTime() + 60 * 60 * 1000)
            Cookies.set('token',data.token,{expires: umaHora})
            reset()
            alert("Login Efetuado com sucesso!")
            router.push("/dashboard")
        },
        onError:(error) => {
            alert("Erro fazer login verifique o console!")
            console.log(error)
        }
    })

    function onSubmit(data:UsuarioSchema){
        mutate(data)
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor="email">Digite seu email:</Label>
                <Input {...register('email')} id="emai" type="email" placeholder="exemplo@exemplo.com"/>
                {errors?.email && <span className='text-red-500'>{errors.email.message}</span>}
            </div>
            <div>
                <Label htmlFor="senha">Digite sua senha:</Label>
                <Input {...register('senha')} id="senha" type="password" placeholder="•••••••••••"/>
                {errors?.senha && <span className='text-red-500'>{errors.senha.message}</span>}
            </div>
            <Button type="submit" className="w-full">{isPending ? 'Entrando...' : 'Entrar'}</Button>
        </form>
    )
}