import FormCadastro from "@/components/FormCadastro";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Cadastro(){
    return(
        <Card className="w-1/4 absolute top-1/2 left-1/2 -translate-1/2">
      <CardHeader>
        <CardTitle>Cadastro</CardTitle>
        <CardDescription>Crie sua conta!</CardDescription>
      </CardHeader>
      <CardContent>
        <FormCadastro/>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <p>Já tem uma conta?</p>
          <Link href={'/'}>Clique aqui</Link>
        </div>
      </CardFooter>
    </Card>
    )
}