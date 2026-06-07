import z from "zod";

export const TarefaProps = z.object({
    nome:  z.string().min(4, "Escreva ao menos 4 caracteres!").max(20,"Limite de 20 caracteres!"),
    descricao: z.string().min(4, "Escreva ao menos 4 caracteres!").max(100,"Limite de 100 caracteres!"),
    prioridade: z.enum(['Alto','Medio','Baixo'],{
        message: "Escolha uma prioridade!"
    }),
    prazo: z.date()
})

export type TarefaSchema = z.infer<typeof TarefaProps>