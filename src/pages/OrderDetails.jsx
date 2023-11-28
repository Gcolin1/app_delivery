import { faCartShopping, faChevronLeft, faClock, faLocation, faLocationDot, faPhone, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './style/OrderDetails.scss'


export const OrderDetails = () => {
  const { id } = useParams()

  return (
    <main className='container-page'>
        <div className='topBar'>
            <Link to={"/new_orders"} ><FontAwesomeIcon icon={faChevronLeft} className='icon' /></Link>
            <p>Pedido: #{id}</p>
        </div>

        <div className='order-values'>
            <div className='item1'>
                <h4 className='price_orders'>Total taxa de entrega: R$2,99</h4>
            </div>

            <div className='total'>
              <p className='total-to-pay'>Ganhos totais R$ 2,99 </p>
            </div>
        </div>

        <section className='container-route'>
            <section className='top-container-route'><p><FontAwesomeIcon icon={faClock} className='icon' /> Pedido realizado: 2 minutes ago</p></section>

            <section className='content-time-line'>
                <section className='time-line-route'>
                    <div className='content-route-order'>
                        <div className='content-icon'>
                            <FontAwesomeIcon icon={faCartShopping} className='icon' />
                        </div>
                        <div className='info-loja'>
                            <h4>Burguer Food</h4>
                            <p>Av 25 de Março</p>
                            <button className='button-map'> 
                                <FontAwesomeIcon icon={faShare} className='icon-map' />
                                Ver no mapa
                            </button>
                        </div>
                    </div>
                    <div className='content-route-order'>
                        <div className='content-icon'>
                            <FontAwesomeIcon icon={faLocationDot} className='icon' />
                        </div>
                        <div className='info-client'>
                            <h4>Guilherme colin</h4>
                            <p>11 99999-9999</p>
                            <p>Rua nordestina 83, jardim lapena</p>
                            <p>Referencia: Adegas fuk`s</p>
                            <div className='buttons'>
                                <button className='button-map'> 
                                    <FontAwesomeIcon icon={faShare} className='icon-map' />
                                    Ver no mapa
                                </button>

                                <button className='button-phone'> 
                                    <FontAwesomeIcon icon={faPhone} className='icon-map' />
                                    Ligar agora
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>

        <section className='content-total-order'>
            <div className='value1'>
                <div className='order-itens'>
                    <h4>1x</h4>
                    <p>X-Tudo</p>
                </div>
    
                <span>R$34,50</span>
            </div>
            <div className='value2'>
                <p className='observacoes'>null/Dinheiro não precisa de troco</p>
                <p className='total-order-to-pay'>Total: <span>R$39,50</span></p>
            </div>
        </section>

        <div className='content-button-aceitar'>
            <button className='btn-acepted'>Aceitar</button>
        </div>
    </main>
  )
}
