import prisma from "../lib/prisma.js"
import type { Request,Response } from "express"


interface CustomRequest extends Request{
    user?:any
}
export const getTarefa = async (req:CustomRequest,res:Response)=>{
    const id = req.user.id
    try {
        const resposta = await prisma.tarefa.findMany({where:{usuarioId:Number(id)}})
        res.status(200).json(resposta)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar tarefas!"})
    }
}
export const postTarefa = async (req:CustomRequest,res:Response)=>{
    const {nome,descricao,prazo,prioridade} = req.body

    const criadorId = req.user.id
    try {
        await prisma.tarefa.create({
            data:{
                nome,
                descricao,
                prioridade,
                prazo:new Date(prazo),
                usuarioId:Number(criadorId)
            }
        })
        res.status(201).json({mensagem:"Tarefa adicionada com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao criar tarefa!"})
    }
}
export const patchTarefa = async (req:Request,res:Response)=>{
    const {id} = req.params
    const {nome,descricao,prazo,status,prioridade} = req.body

    try {
        await prisma.tarefa.update({
            where:{
                id:Number(id)
            },
            data:{
                nome,
                descricao,
                prazo,
                status,
                prioridade
            }
        })
        res.status(200).json({mensagem:"Tarefa Atualizado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao atualizar tarefa!"})
    }
}
export const deleteTarefa = async (req:Request,res:Response)=>{
    const {id} = req.params

    try {
        await prisma.tarefa.delete({where:{id:Number(id)}})
        res.status(204).end()
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao deletar tarefa!"})
    }
}