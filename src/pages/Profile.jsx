import React, { useContext, useEffect, useState } from 'react'
import './style/Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { TopBar } from './components/TopBar'
import { api } from '../services/api'
import { Loading } from './components/Loading'
import { FormatCashReal } from './components/FormatCashReal'
import { AuthContext } from './auth/context/auth'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from './../assets/logoutIcon.png'
import ModalResgate from './components/ModalResgate'

export const Profile = () => {
  const [info, setInfo] = useState({ data: {}, chart: { chartData: [] } });
  const [openModal, setOpenModal] = useState(false)
  const [totalGanhosSemanais, setTotalGanhosSemanais] = useState(0);
  const [removingLoader, setRemovingLoader] = useState(false)
  const { logout } = useContext(AuthContext)

  const handleLogout = () =>{
    logout()
  }


  const getProfile = async () =>{
    try{
      const response = await api.post("/delivery/toggle-delivery-guy-status")

      const data = response.data;
      console.log(data)
      setInfo(data)

      if(data){
        setRemovingLoader(true)
        somaTotalGanhosSemanais(data.chart.chartData)
      }

    }catch(error){
      console.log(error)
    }
  }

  const somaTotalGanhosSemanais = (value) => {
    try {
      const total = value.reduce((acc, current) => acc + current.y, 0);
      console.log(total);
      setTotalGanhosSemanais(total)
    } catch (error) {
      console.error('Erro ao calcular total de ganhos semanais:', error);
      return 0;
    }
  
  };

  useEffect(() => {
    getProfile();
  }, [])



  return (
    <main className='container'>
      <TopBar/> 

      {removingLoader ? (
        <>
          <h1 className='entregador-nome'>{info.data?.name}</h1>

          <div>
            <section className='content-perfil'>
              <div className='info-perfil'>
                <div className='saldo-info'>
                  <div className='saldo'>
                    <h2>Saldo</h2>
                    <p><FormatCashReal valor={info.data?.wallet_balance}/></p>
                  </div>
                  <div className='retirado'>
                    <h2>Retirado</h2>
                    <p>R$ 450,00</p>
                  </div>
                </div>
                <div className='info-rating'>
                  <div className='pay-week'>
                    <h2>Ganhos da semana</h2>
                    <p><FormatCashReal valor={totalGanhosSemanais}/></p>
                  </div>
                  <div>
                    <h2>Avaliação</h2>
                    <div className='rating'>
                      <FontAwesomeIcon icon={faStar} className='icon' />
                      <p>{info.data?.averageRating}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className='container_resgatar'>
                <button onClick={() => setOpenModal(true)} className='btn_resgatar'>Solicitar pagamento</button>
            </section>
            <ModalResgate isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}/>

            <div className='container_logout'>
                <button onClick={handleLogout} className='btn_logout'><img src={LogoutIcon} alt="" /></button>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
      
    </main>
  )
}
