import React, { useEffect, useState } from 'react'
import "./style/Home.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faStar } from '@fortawesome/free-solid-svg-icons';
import { TopBar } from './components/TopBar';
import { FormatCashReal } from './components/FormatCashReal';


function Home() {
  const [show, setShow] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
      const storageUser = localStorage.getItem("@Auth:user")
      setUser(JSON.parse(storageUser))
  }, []);

  const showToggle = () => {
    if(show == true){
      setShow(false)
    }else{
      setShow(true)
    }
  }
  
  return (
    <main className="container" >
        <TopBar />

        <section className='info_entregador'>
            <div className='entregador_name'>
              <p>Bem vindo {user ? user.name : 'Usuário'}!</p>
            </div>

            <div className='rating_entregador'>
              <FontAwesomeIcon icon={faStar} className='icon' />
              <p className='rating'>5.0</p>
            </div>
        </section>

        <section className='info_entregas'>
            <h2>Atividade</h2>
            <p>Saldo</p>

            <div className='wallet'> 
                {
                 show ? <p className='value_wallet' >{user?.wallet_balance && <FormatCashReal valor={user.wallet_balance} />}</p> : <p className='value_wallet' >R$ -------</p>
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
                  <p>{user ? user.onGoingCount : " "}</p>
                </div>

                <div>
                  <h2>Pedidos entregues</h2>
                  <p>{user ? user.completedCount : " "}</p>
                </div>
            </div>

            <div className='dinheiro_em_maos'>
                <h2>Dinheiro em mãos</h2>
                <p className='value_wallet' >R$39,50</p>
            </div>
        </section>

    </main>
  )
}

export default Home;