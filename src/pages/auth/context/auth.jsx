import { createContext, useState } from "react";
import { api } from "../../../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    //funcao que verifica se tem usuario logado no storage
    const  loadingStoreData = async () =>  {
        const storageUser = localStorage.getItem("@Auth:user")
        const storageToken = localStorage.getItem("@Auth:token")
        
        if(storageToken && storageUser){
            setUser(JSON.parse(storageUser))
            api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
        }
    }

    useEffect(() => {
        loadingStoreData();
    }, []);

    const signIn = async (data) => {
        const email = data.email 
        const password = data.password

        const response  = await api.post("/delivery/login", {
            email,
            password,
        })

        console.log(response)

        if(response.data.success == false){
            alert("E-mail ou senha inválidos")
        }else{
            setUser(response.data)
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.data.auth_token}`
            localStorage.setItem('@Auth:token', response.data.data.auth_token);
            localStorage.setItem('@Auth:user', JSON.stringify(response.data.data));
        }
    }

    const logout = () => {
        localStorage.clear()
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{
            user, 
            signed: !!user,
            signIn,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )

}