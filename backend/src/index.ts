import express from 'express'
import usuarioRoute from './routes/usuarioRoute.js'
import tarefaRoute from './routes/tarefaRoute.js'
import bcrypt from 'bcrypt'
import prisma from './lib/prisma.js'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import 'dotenv/config'

const app = express()

const JWT_SECRET = process.env.JWT_SECRET || ""

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Api rodando!")
})

app.post('/auth/login',async (req,res) =>{
    const {email,senha} = req.body

    try {
        const usuario = await prisma.usuario.findUnique({where:{email}})
        if(!usuario) return res.status(404).json({mensagem:"Usuario nao encontrado"})
        const senhaValida = await bcrypt.compare(String(senha),String(usuario?.senha))
        if(!senhaValida) return res.status(400).json({mensagem:"Email ou senha invalidos!"})

        const token = jwt.sign(
            {id: Number(usuario.id)},
            JWT_SECRET,
            {expiresIn: "1h"}            
        )
        res.status(200).json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao fazer login!"})
    }
})
app.use('/usuarios',usuarioRoute)

app.use('/tarefas',tarefaRoute)

app.listen(3001, ()=>{
    console.log("Servidor rodando em http://localhost:3001")
})