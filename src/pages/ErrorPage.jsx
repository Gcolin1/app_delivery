import React from 'react'
import "./style/ErrorPage.scss"
import Logo from "./../assets/logo.png"

export const ErrorPage = () => {
  return (
    <div className='container-error'>
        <h1>Erro 404!</h1>
        <img src={Logo} alt="" />
    </div>
  )
}
