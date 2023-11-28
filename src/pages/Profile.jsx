import React from 'react'
import './style/Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { TopBar } from './components/TopBar'

export const Profile = () => {
  return (
    <main className='container'>
      <TopBar/> 

      <h1 className='entregador-nome' >Guilherme Colin</h1>
      
      <div>
          <section className='content-perfil'>

              <div className='info-perfil'>
                  <div className='saldo-info'>
                    <div className='saldo' >
                      <h2>Saldo</h2>
                      <p>R$ 50,00</p>
                    </div>

                    <div className='retirado'>
                      <h2>Retirado</h2>
                      <p>R$ 450,00</p>
                    </div>
                  </div>

                  <div className='info-rating'>
                    <div className='pay-week'>
                      <h2>Ganhos da semana</h2>
                      <p>R$ 450,00</p>
                    </div>

                    <div>
                      <h2>Avaliação</h2>
                      <div className='rating'>
                        <FontAwesomeIcon icon={faStar} className='icon' />
                        <p>5.0</p>
                      </div>
                    </div>
                  </div>
              </div>
          </section>
      </div>
    </main>
  )
}
