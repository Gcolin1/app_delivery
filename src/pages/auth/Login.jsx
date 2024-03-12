import React, { useContext, useState } from 'react'
import "./style/Login.scss"
import LogoB from "./../../assets/logo-b.png"
import { AuthContext } from './context/auth'
import { Link, Navigate } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail] = useState("") 
    const [password, setPassword] = useState("") 
    const [emptyValues, setEmptyValues] = useState(false)
    const [validEmail, setValidEmail] = useState(false)

    const { signIn, signed } = useContext(AuthContext)

    const handleSignIn = async (e) => {
        e.preventDefault()
        
        let emptyValues = Object.values({email, password}).some(obj => obj == '');
        setEmptyValues(emptyValues)

        let lowerCaseEmail = email.toLowerCase()
        let validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(lowerCaseEmail)
        setValidEmail(validEmail)

        console.log(validEmail)

        if(!emptyValues && validEmail){
            const data = {
                email,
                password
            }
            await signIn(data) 
        }
    }

    if(signed){
        return <Navigate to="/" />
    }else{
        return (  
            <main className='container-login'>
                <div className='container-logo'>
                    <img src={LogoB} alt="logo-branco" className='logo'/>
                    <h1>Bem-vindo ao Brasuca!</h1>
                </div>
                
                <div className='content-inputs'>
                    <h2>Login</h2>

                    <form onSubmit={handleSignIn} className='inputs'>
                        <input className='inp' type="email" name="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        { emptyValues && !email ? <span className='msgError'>E-mail precisa ser preenchido</span> : ""}
                        { (!validEmail &&  email !== "") && <span className='msgError'>E-mail invalido</span> }
                        <input className='inp' type="password" name="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                        { emptyValues && !password ? <span className='msgError'>senha precisa ser preenchido</span> : ""}

                       {/*
                            <div className='links-cad'>
                                <p>Ainda não tem cadastro? <span>
                                    <Link to="/auth/register" >Clique aqui</Link>
                                </span></p>
                                <p><Link>Esqueceu a senha?</Link></p>
                            </div>
                        */}

                        <button className='btnLogin' type='submit'  >Entrar</button>
                    </form>
                </div>

            </main>
        )
        }
}
