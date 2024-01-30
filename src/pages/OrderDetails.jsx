import { faCartShopping, faChevronLeft, faClock, faLocation, faLocationDot, faPhone, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './style/OrderDetails.scss'
import { api } from '../services/api'
import OrderDeliveryTimeCounter from './components/OrderDeliveryTimeCounter'
import { FormatCashReal } from './components/FormatCashReal'
import { Loading } from './components/Loading'


export const OrderDetails = () => {
  const { unique_order_id } = useParams()
  const [order, setOrder] = useState([])
  const location = useLocation();
  const [removingLoader, setRemovingLoader] = useState(false)

//pega dados do orderid pelo location state da pagina neworder
 const orderstatus_id = location.state && location.state.dados

 const navigate = useNavigate()

 const Goback = (event) => {
    event.preventDefault();
    navigate(-1)
  };

  

  const getUniqueOrder = async () =>{
    try{
      const response = await api.post("/delivery/get-single-delivery-order", {
       unique_order_id,
       orderstatus_id
    })

      const data = response.data;
      console.log(data)

      setOrder(data)

      if(data){
        setRemovingLoader(true)
      }

    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getUniqueOrder();
  }, [])

  return (
    <main className='container-page'>
        {  removingLoader ? (
            <>
                <div className='topBar'>
                    <Link onClick={Goback}><FontAwesomeIcon icon={faChevronLeft} className='icon' /></Link>
                    <p>Pedido: #{order.unique_order_id}</p>
                </div>

                <div className='order-values'>
                    <div className='item1'>
                        <h4 className='price_orders'>Total taxa de entrega: R$ {order?.commission && <FormatCashReal valor={order.commission} />}</h4>
                    </div>

                    <div className='total'>
                    <p className='total-to-pay'>Ganhos totais R$ {order?.commission && <FormatCashReal valor={order.commission} />}</p>
                    </div>
                </div>

                <section className='container-route'>
                    <section className='top-container-route'><p><FontAwesomeIcon icon={faClock} className='icon' />Pedido realizado:  <OrderDeliveryTimeCounter deliveryTimeFromApi={order.updated_at} className="time-order"/></p></section>

                    <section className='content-time-line'>
                        <section className='time-line-route'>
                            <div className='content-route-order'>
                                <div className='content-icon'>
                                    <FontAwesomeIcon icon={faCartShopping} className='icon' />
                                </div>
                                <div className='info-loja'>
                                    <h4>{order.restaurant?.name}</h4>
                                    <p>{order.restaurant?.address}</p>
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
                                    <h4>{order.user?.name}</h4>
                                    <p>{order.user?.phone}</p>
                                    <p>{order.address}</p>
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
                    { order && order.orderitems && order.orderitems.length > 0 && order.orderitems.map(item => (
                        <>
                            <div className='value1'>
                            <div className='order-itens'>
                                <h4>{item.quantity}x</h4>
                                <p>{item.name}</p>
                            </div>
                
                            <span>R$ {item.price }</span>
                            </div>
                        </>
                    ))}
                    <div className='value2'>
                        <p className='observacoes'>{order.order_comment}</p>
                        <p className='total-order-to-pay'>Total: <span>{order?.total && <FormatCashReal valor={order.total} />}</span></p>
                    </div>
                    
                </section>

                <div className='content-button-aceitar'>
                    <button className='btn-acepted'>Aceitar</button>
                </div>
            </>
        ): (
            <Loading />
        )}
    </main>
  )
}
