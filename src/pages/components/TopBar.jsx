import React, { useEffect, useState } from 'react';
import Logo from "./../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./style/TopBar.scss";
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../services/api';
import LoadingBtn from "./../../assets/loading-btn.svg" 

export const TopBar = () => {
  const [dis, setDisponivel] = useState(false);
  const [buttonColor, setButtonColor] = useState("#ccc");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar o indicador de loading
  const token = localStorage.getItem('@Auth:token');

  useEffect(() => {
    // Recuperar o estado salvo do botão ao carregar a página
    const savedStatus = localStorage.getItem('status');
    if (savedStatus !== null) {
      setDisponivel(savedStatus === 'true');
      setButtonColor(savedStatus === 'true' ? "#18C775" : "#ccc");
    }
  }, []);

  const toggleDisponivel = async () => {
    setLoading(true); // Define o estado de loading como true durante a 

    try {
      const response = await api.post("/delivery/toggle-delivery-guy-status", {
        token,
        toggle_status: !dis,
      });

      const responseData = response.data;
      console.log(responseData);

      if (responseData.success) {
        const status = responseData.data.status;
        console.log(status);
        setDisponivel(status === 1);
        setButtonColor(status === 1 ? "#18C775" : "#ccc");

        // Salvar o novo estado do botão no localStorage
        localStorage.setItem('status', status === 1 ? 'true' : 'false');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Define o estado de loading como false após a requisição
    }
  };

  const CustomAlert = () => (
    <div className="custom-alert">
      <p>Clique no botão para alterar o status para {dis ? 'Indisponível' : 'Disponível'} para entrega.</p>
      <button className='btn_alert' onClick={() => setShowAlert(false)}>Fechar</button>
    </div>
  );

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
  
          <button
            onClick={toggleDisponivel}
            className='button-disponivel'
            style={{ backgroundColor: buttonColor }}
            disabled={loading} // Desativa o botão durante o carregamento
          >
            {loading ? <img src={LoadingBtn} style={{
              width: "15px",
            }} /> : dis ? <p>disponível</p> : <p>indisponível</p>}
          </button>
        </div>
      </div>
      
      {showAlert && <CustomAlert />}
    </main>
  );
};