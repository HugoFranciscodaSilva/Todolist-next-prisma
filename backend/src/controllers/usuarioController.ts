import prisma from "../lib/prisma.js"
import bcrypt from 'bcrypt'
import type { Request, Response} from 'express'

export const getUsuario = async (req:Request,res:Response) =>{
    try {
        const resposta = await prisma.usuario.findMany()
        res.status(200).json(resposta)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar usuarios!"})        
    }
}

export const postUsuario = async (req:Request,res:Response) =>{
    const { nome , email , senha } = req.body

    try {
        const senhaHash = await bcrypt.hash(String(senha),10)
        await prisma.usuario.create({
            data:{
                nome,
                email,
                senha:senhaHash
            }
        })
        res.status(201).json({mensagem:"Usuario criado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao criar usuario!"})
    }
}
export const patchUsuario = async (req:Request,res:Response) =>{
    
    try {
        const { id } = req.params
        const { nome , email , senha } = req.body

        const senhaHash = senha ? await bcrypt.hash(String(senha),10) : undefined

        const dadosAtualizados:any = {}

        if (nome) dadosAtualizados.nome = nome
        if (email) dadosAtualizados.email = email
        if (senhaHash) dadosAtualizados.senha = senhaHash

        await prisma.usuario.update({
            where:{
                id:Number(id)
            },
            data:{
                ...dadosAtualizados
            }
        })
        res.status(200).json({mensagem:"Usuario Atualizado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao atualizar usuario!"})
    }
}

export const deleteUsuario = async (req:Request,res:Response)=>{
    
    try {
        const {id} = req.params
        await prisma.usuario.delete({
            where:{
                id:Number(id)
            }
        })
        res.status(204).end()
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao deletar usuario!"})
    }
}