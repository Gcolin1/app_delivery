import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faHouse, faListCheck, faRoute, faUser } from '@fortawesome/free-solid-svg-icons'
import "./style/NavBar.scss"

export const NavBar = () => {
  const location = useLocation();

  return (
    <nav className='navBar'>
      <Link className={`link ${location.pathname === '/' ? 'selected' : ''}`} to="/"><FontAwesomeIcon icon={faHouse} className='' /></Link>
      <Link className={`link ${location.pathname === '/new_orders' ? 'selected' : ''}`} to="/new_orders"><FontAwesomeIcon icon={faBell} className='' /></Link>
      <Link className={`link ${location.pathname === '/orders_accepted' ? 'selected' : ''}`} to="/orders_accepted"><FontAwesomeIcon icon={faListCheck} className='' /></Link>
      <Link className={`link ${location.pathname === '/pickedup_orders' ? 'selected' : ''}`} to="/pickedup_orders"><FontAwesomeIcon icon={faRoute} className='' /></Link>
      <Link className={`link ${location.pathname === '/profile' ? 'selected' : ''}`} to="/profile"><FontAwesomeIcon icon={faUser} className='' /></Link>
    </nav>
  )
}