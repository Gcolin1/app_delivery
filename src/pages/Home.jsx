import React, { useEffect, useState } from 'react'
import "./style/Home.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faStar } from '@fortawesome/free-solid-svg-icons';
import { TopBar } from './components/TopBar';
import { FormatCashReal } from './components/FormatCashReal';
import { api } from '../services/api';
import { Loading } from './components/Loading';


function Home() {
  const [show, setShow] = useState(null)
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ data: {}, chart: { chartData: [] } });
  const [removingLoader, setRemovingLoader] = useState(false)

  useEffect(() => {
      const storageUser = localStorage.getItem("@Auth:user")
      setUser(JSON.parse(storageUser))

      getProfile();

    const savedShowState = localStorage.getItem('show')

    if(savedShowState !== null){
      setShow(savedShowState === 'true')
    }
  }, []);

  const getProfile = async () =>{
    try{
      const response = await api.post("/delivery/toggle-delivery-guy-status")

      const data = response.data;
      console.log(data)
      setInfo(data)

      if(data){
        setRemovingLoader(true)
      }

    }catch(error){
      console.log(error)
    }
  }

  const showToggle = () => {
    const updatedShow = !show;
    setShow(updatedShow);

    localStorage.setItem('show', updatedShow.toString())
  }
  
  return (
    <main className="container" >
        <TopBar />

        {removingLoader ? (
          <>
            <section className='info_entregador'>
            <div className='entregador_name'>
              <p>Bem vindo {user ? user.name : 'Usuário'}!</p>
            </div>

            <div className='rating_entregador'>
              <FontAwesomeIcon icon={faStar} className='icon' />
              <p className='rating'>{info.data?.averageRating}</p>
            </div>
            </section>

            <section className='info_entregas'>
                <h2>Atividade</h2>
                <p>Saldo</p>

                <div className='wallet'> 
                    {
                    show ? <p className='value_wallet' >{info && info.data && info.data.wallet_balance  ? <FormatCashReal valor={info.data?.wallet_balance} /> : 'R$ 0,00'}</p> : <p className='value_wallet' >R$ -------</p>
                    }

                    <button onClick={showToggle}>
                      {
                        show ? <FontAwesomeIcon icon={faEyeSlash} className='icon' /> : <FontAwesomeIcon icon={faEye} className='icon' />
                      }
                    </button>
                </div>

                <div className='info_routes'>
                    <div>
                      <h2>Em andamento</h2>
                      <p>{info ? info.data?.onGoingCount : " "}</p>
                    </div>

                    <div>
                      <h2>Pedidos entregues</h2>
                      <p>{info ? info.data?.completedCount : " "}</p>
                    </div>
                </div>
            </section>
          </>
        ) : (
          <Loading />
        )
      }

    </main>
  )
}

export default Home;