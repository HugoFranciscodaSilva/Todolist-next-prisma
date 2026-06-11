import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(request:NextRequest){
    const token = request.cookies.get('token')?.value

    const { pathname } = request.nextUrl

    if(pathname.startsWith("/dashboard") || pathname.startsWith("/tarefas")){
        if(!token){
            return NextResponse.redirect(new URL("/?error=unauthorized",request.url))
        }
    }
    
    if(pathname === "/" || pathname.startsWith("/cadastro")){
        if(token){
            return NextResponse.redirect(new URL("/dashboard",request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher:["/dashboard/:path*","/tarefas/:path*","/","/cadastro"]
}