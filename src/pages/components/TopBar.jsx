import React, { useState } from 'react'
import Logo from "./../../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./style/TopBar.scss"
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';

export const TopBar = () => {

  const [dis, setDisponivel] = useState(false)
  const [buttonColor, setButtonColor] = useState('#18C775');
  
  const toggleDisponivel = ()  => {
    if(dis == true){
      setDisponivel(false)
      setButtonColor('#18C775')
    }else{
      setDisponivel(true)
      setButtonColor('#CACACA')
    }
    console.log(dis)
  }

  return (
    <main>
        <div className='top'>
          <div className='logo'>
            <img src={Logo} alt="logo" />
          </div>
          
          <div className='buttons_top'>
            <button className='vehicle'>
              <FontAwesomeIcon icon={faMotorcycle} className='icon' />
            </button>
  
              <button onClick={toggleDisponivel} className='button-disponivel' style={{backgroundColor: buttonColor}}>
                { dis ? <p>indisponivel</p> : <p>disponivel</p> }
              </button>
          </div>
        </div>
    </main>

    
  )
}
