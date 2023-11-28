import React, { useContext, useState } from 'react'
import "./style/Login.scss"
import LogoBranco from "./../../assets/logo-branco.png"
import { AuthContext } from './context/auth'
import { Navigate } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail] = useState("") 
    const [password, setPassword] = useState("") 

    const { signIn, signed } = useContext(AuthContext)

    const handleSignIn = async (e) => {
        e.preventDefault()
        const data ={
            email,
            password
        }

        await signIn(data)
    }

    if(signed){
        return <Navigate to="/" />
    }else{

        return (  
            <main className='container-login'>
                <div className='container-logo'>
                    <img src={LogoBranco} alt="logo-branco" className='logo'/>
                </div>
                
                <div className='content-inputs'>
                    <h2>Login</h2>

                    <form onSubmit={handleSignIn} className='inputs'>
                        <input className='inp' type="email" name="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input className='inp' type="password" name="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button className='btnLogin' type='submit'  >Entrar</button>
                    </form>
                </div>

            </main>
        )
        }
}
