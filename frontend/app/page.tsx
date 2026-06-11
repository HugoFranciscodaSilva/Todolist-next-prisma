import FormLogin from "@/components/FormLogin/FormLogin";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home(){
  return(
    <Card className="w-1/4 absolute top-1/2 left-1/2 -translate-1/2">
      <CardHeader>
        <CardTitle>Bem-Vindo de Volta</CardTitle>
        <CardDescription>Insira suas credenciais para acessar sua área de trabalho.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormLogin/>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 justify-center w-full">
          <p>Novo por aqui?</p>
          <Link href={'/cadastro'} className="text-roxo">Criar Conta</Link>
        </div>
      </CardFooter>
    </Card>
  )
}