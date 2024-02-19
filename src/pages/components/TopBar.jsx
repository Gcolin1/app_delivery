import React, { useEffect, useState } from 'react';
import Logo from "./../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./style/TopBar.scss";
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export const TopBar = () => {
  const [dis, setDisponivel] = useState(false);
  const [buttonColor, setButtonColor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggleDisponivel = () => {
    const newDisponivel = !dis;
    setDisponivel(newDisponivel);
    const newButtonColor = newDisponivel ? '#18C775' : '#CACACA';
    setButtonColor(newButtonColor);
    localStorage.setItem('status', newDisponivel);
    localStorage.setItem('status_color', newButtonColor);
  };

  const CustomAlert = () => (
    <div className="custom-alert">
      <p>Clique no botão para alterar o status para {dis ? 'Disponivel' : 'Indisponivel'} para entrega.</p>
      <button className='btn_alert' onClick={() => setShowAlert(false)}>Fechar</button>
    </div>
  );

  useEffect(() => {
    const savedStatusState = localStorage.getItem('status');

    if(savedStatusState !== null) {
      setDisponivel(savedStatusState === 'true'); // Corrigido para analisar 'true' ou 'false' corretamente
    }
  }, []);

  useEffect(() => {
    const savedStatusColor = localStorage.getItem('status_color');
    if(savedStatusColor !== null) {
      setButtonColor(savedStatusColor);
    }
  }, []);

  return (
    <main>
      <div className='top'>
        <div className='logo'>
          <img src={Logo} alt="logo" />
        </div>
          
        <div className='buttons_top'>
          <button className='vehicle' onClick={() => setShowAlert(true)}>
            <FontAwesomeIcon icon={faQuestion} className='icon' />
          </button>
  
          <button onClick={toggleDisponivel} className='button-disponivel' style={{backgroundColor: buttonColor}}>
            { dis ? <p>disponivel</p> : <p>indisponivel</p>}
          </button>
        </div>
      </div>
      
      {showAlert && <CustomAlert />}
    </main>
  );
};