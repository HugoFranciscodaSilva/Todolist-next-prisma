import z from 'zod'


export const UsuarioProps = z.object({
    email: z.email("Insira um email válido!"),
    senha:z.string().min(3,"Insira ao menos 3 caracteres")
})

export type UsuarioSchema = z.infer<typeof UsuarioProps>