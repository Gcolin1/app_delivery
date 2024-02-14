import React from 'react'
import "./style/NavBar.scss"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faHouse, faListCheck, faRoute, faUser } from '@fortawesome/free-solid-svg-icons'

export const NavBar = () => {
  return (
    <nav className='navBar'>
        <Link className='link' to="/" ><FontAwesomeIcon icon={faHouse} className='' /></Link>
        <Link className='link' to="/new_orders"><FontAwesomeIcon icon={faBell} className='' /></Link>
        <Link className='link' to="/orders_accepted"><FontAwesomeIcon icon={faListCheck} className='' /></Link>
        <Link className='link' to="/pickedup_orders"><FontAwesomeIcon icon={faRoute} className='' /></Link>
        <Link className='link' to="/profile"><FontAwesomeIcon icon={faUser} className='' /></Link>
    </nav>
  )
}
