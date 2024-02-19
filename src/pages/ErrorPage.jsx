import React from 'react'
import "./style/ErrorPage.scss"
import Logo from "./../assets/logo.png"
import Erro from "./../assets/error.png"
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <div className='container-error'>
        <h1>OPS!<span>404</span></h1>
        <p>Parece que a página que você estava buscando não existe mais.</p>
        <img src={Erro} alt="erro 404" />
        <Link to="/" className='button_return'>Clique aqui para voltar ao inicio</Link>
        <img className='logo_error' src={Logo} alt="logo brasuca" />
        
    </div>
  )
}
