'use client'

import { Button} from '@/components/ui/button'
import { LogOut } from "lucide-react";
import Cookies from 'js-cookie'
import { redirect } from "next/navigation";

export default function BotaoLogout(){


    function Logout(){
        Cookies.remove('token')

        redirect('/')
    }


    return(
         <Button onClick={Logout} className="absolute right-10 bottom-10"><LogOut/> Sair da conta</Button>
    )
}