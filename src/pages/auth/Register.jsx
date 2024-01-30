import React, { useContext, useState } from 'react'
import "./style/Register.scss"
import LogoB from "./../../assets/logo-b.png"
import { AuthContext } from './context/auth'
import { Link, Navigate } from 'react-router-dom'

export const Register = () => {
    const [email, setEmail] = useState("") 
    const [nome, setNome] = useState("") 
    const [phone, setPhone] = useState("") 
    const [password, setPassword] = useState("") 
    const [emptyValues, setEmptyValues] = useState(false)
    const [validEmail, setValidEmail] = useState(false)

    const { signIn, signed } = useContext(AuthContext)

    const handleRegister = async (e) => {
        e.preventDefault()
        
        let emptyValues = Object.values({email, password, nome}).some(obj => obj == '');
        setEmptyValues(emptyValues)

        console.log(nome)

        let lowerCaseEmail = email.toLowerCase()
        let validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(lowerCaseEmail)
        setValidEmail(validEmail)

        console.log(validEmail)

        if(!emptyValues && validEmail){
            const data = {
                nome,
                email,
                phone,
                password
            }
            await signIn(data) 
        }
    }

    if(signed){
        return <Navigate to="/" />
    }else{
        return (  
            <main className='container-register'>
                <div className='container-logo'>
                    <img src={LogoB} alt="logo-branco" className='logo'/>
                  
                </div>
                
                <div className='content-inputs-register'>
                    <h2>Cadastre-se</h2>

                    <form onSubmit={handleRegister} className='inputs'>
                         <input className='inp' type="text" name="name" placeholder='Nome completo' value={nome} onChange={(e) => setNome(e.target.value)}/>
                        { emptyValues && !nome ? <span className='msgError'>Nome precisa ser preenchido</span> : ""}

                        <input className='inp' type="email" name="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        { emptyValues && !email ? <span className='msgError'>E-mail precisa ser preenchido</span> : ""}
                        { (!validEmail &&  email !== "") && <span className='msgError'>E-mail invalido</span> }

                        <input className='inp' type="number" name="phone" placeholder='Número de telefone' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        { emptyValues && !phone ? <span className='msgError'>Número precisa ser preenchido</span> : ""}

                        <input className='inp' type="password" name="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                        { emptyValues && !password ? <span className='msgError'>senha precisa ser preenchido</span> : ""}

                        <p className='link-login'>Já tem cadastro?<Link to="/auth/login"> Clique aqui</Link></p>

                        <button className='btnLogin' type='submit'  >Cadastrar</button>
                    </form>
                </div>

            </main>
        )
        }
}
