import 'dotenv/config'
import type { Request,Response , NextFunction} from 'express'
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || ""

interface CustomRequest extends Request{
    user?: any
}

export const loginMiddleware = async (req:CustomRequest,res:Response,next:NextFunction) =>{

    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(401).json({mensagem:"Token não fornecido"})

    const [scheme, token] = authHeader.split(' ')

    if(!token || scheme !== "Bearer") return res.status(401).json({mensagem:"Token malformatado"})


    try {
        const decode = jwt.verify(token,JWT_SECRET)

        req.user = decode
        return next()
    } catch (error) {
        return res.status(401).json({mensagem:"Token invalido ou experado!"})
    }
}