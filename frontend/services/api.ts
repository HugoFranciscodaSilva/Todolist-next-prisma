import axios from "axios";
import Cookie from 'js-cookie'

export const api = axios.create({
    baseURL:"/api"
})

api.interceptors.request.use((config)=>{
    const token = Cookie.get('token')

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config

},(error) =>{
    return Promise.reject(error)
})