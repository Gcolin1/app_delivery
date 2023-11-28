import { createContext, useState } from "react";
import { api } from "../../../services/api";



export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    //funcao que verifica se tem usuario logado no storage
    const  loadingStoreData = async () =>  {
        const storageUser = localStorage.getItem("@Auth:user")
        const storageToken = localStorage.getItem("@Auth:token")
        
        if(storageToken && storageUser){
            setUser(storageUser)
        }

        loadingStoreData()
    }

    const signIn = async (email, password) => {
        const response  = await api.post("/login", {
            email,
            password,
        })

        if(response.data.error){
            alert(response.data.error)
        }else{
            setUser(response.data)
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`
            localStorage.setItem('@Auth:token', response.data.token);
            localStorage.setItem('@Auth:token', response.data.user);
        }
    }

    return(
        <AuthContext.Provider value={{
            user, 
            signed: !!user,
            signIn,
        }}>
            {children}
        </AuthContext.Provider>
    )

}