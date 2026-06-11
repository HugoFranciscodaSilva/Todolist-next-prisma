import z from 'zod'


export const CadastroProps = z.object({
    nome:z.string().min(3,"Insira ao menos 3 caracteres"),
    email: z.email("Insira um email válido!"),
    senha:z.string().min(3,"Insira ao menos 3 caracteres")
})

export type CadastroSchema = z.infer<typeof CadastroProps>


export const LoginProps = z.object({
    email: z.email("Insira um email válido!"),
    senha:z.string().min(3,"Insira ao menos 3 caracteres")
})

export type LoginSchema = z.infer<typeof LoginProps>