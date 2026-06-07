import FormLogin from "@/components/FormLogin/FormLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home(){
  return(
    <Card className="w-1/4 absolute top-1/2 left-1/2 -translate-1/2">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Acesse sua conta!</CardDescription>
      </CardHeader>
      <CardContent>
        <FormLogin/>
      </CardContent>
    </Card>
  )
}