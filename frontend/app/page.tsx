import FormLogin from "@/components/FormLogin/FormLogin";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home(){
  return(
    <main className="w-[70%] h-dvh flex justify-center items-center m-auto">
      <section className="w-1/2 bg-white h-[80%] rounded-l-md glass-card flex flex-col gap-7 items-center justify-center">
          <div className="flex gap-2 items-center">
            <Check className="bg-roxo rounded-2xl w-10 text-black"/>
            <h1 className="text-2xl font-bold">TaskMaster</h1>
          </div>
          <picture>
            <Image src={'/Banner-tarefas.png'} alt="Banner de tarefas" height={200} width={300}/>
          </picture>
          <p className="text-center">Orquestre suas tarefas com <br /> precisão cirúrgica e clareza <br /> absoluta.</p>
      </section>
      <Card className="w-1/2 h-[80%] rounded-r-md rounded-l-none p-8 bg-azul">
        <CardHeader>
          <CardTitle className="text-2xl">Bem-Vindo de Volta</CardTitle>
          <CardDescription>Insira suas credenciais para acessar sua área de trabalho.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormLogin/>
        </CardContent>
        <Separator/>
        <CardFooter>
          <div className="flex gap-2 justify-center w-full">
            <p>Novo por aqui?</p>
            <Link href={'/cadastro'} className="text-roxo">Criar Conta</Link>
          </div>
        </CardFooter>
        <Separator/>
      </Card>
    </main>
  )
}