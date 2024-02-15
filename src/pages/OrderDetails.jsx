import { faCartShopping, faChevronLeft, faClock, faLocation, faLocationDot, faPhone, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './style/OrderDetails.scss'
import { api } from '../services/api'
import OrderDeliveryTimeCounter from './components/OrderDeliveryTimeCounter'
import { FormatCashReal } from './components/FormatCashReal'
import { Loading } from './components/Loading'
import './style/PickedupOrders.scss'


export const OrderDetails = (props) => {
  const { unique_order_id } = useParams()
  const [order, setOrder] = useState([])
  const location = useLocation();
  const [removingLoader, setRemovingLoader] = useState(false)
  const [inRoute, setInRoute] = useState(false)
  const [newOrder, setNewOrder] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [pin, setPin] = useState("")

//pega dados do orderid pelo location state da pagina neworder
 const orderstatus_id = location.state && location.state.dados
 const inRouteState = location.state.inRoute
 const acceptedState = location.state.accepted
 const newOrderState = location.state.newOrder
 const token = localStorage.getItem('@Auth:token');
 const order_id = order.id

 const navigate = useNavigate()

 const Goback = (event) => {
    event.preventDefault();
    navigate(-1)
  };

 const FinalizarEntrega = async () =>{
    if (order && inRoute) {
        const orderPin = order?.delivery_pin; 
        if (pin == orderPin) {
            const order_id = order.id
            const delivery_pin = pin.toString()
            setRemovingLoader(false)

            try{
                const response = await api.post("/delivery/deliver-order", {
                 token,
                 order_id,
                 delivery_pin
              })
          
                const data = response.data;
                console.log(data)
     
                if(response.status == 200){
                    setRemovingLoader(true)
                    alert("Pedido entregue com sucesso")
                    
                    setTimeout(() => {
                        navigate(-1);
                    }, 500)
                }
          
              }catch(error){
                console.log(error)
              }
        } else {
          console.log("PIN inválido");
          // Faça o que precisar quando o PIN for inválido
        }
      }else if(accepted){
        setRemovingLoader(false)

        try{
            const response = await api.post("/delivery/pickedup-order", {
             token,
             order_id,
          })
      
            const data = response.data;
            console.log(data)
 
            if(response.status == 200){
                setRemovingLoader(true)
                alert("Pedido enviado")
                setInRoute(true)
                setAccepted(false)
                setNewOrder(false)
            }
      
          }catch(error){
            console.log(error)
          }
      }else if(newOrder){
        const delivery_guy_id = order.user_id
        setRemovingLoader(false)

        try{
            const response = await api.post("/delivery/accept-to-deliver", {
             token,
             delivery_guy_id,
             order_id,
          })

            const data = response.data;
            console.log(data)
 
            if(response.status == 200){
                setRemovingLoader(true)
                alert("Pedido Aceito")
                setInRoute(false)
                setAccepted(true)
                setNewOrder(false)
            }
      
          }catch(error){
            console.log(error)
          }
      }
  }

  const getUniqueOrder = async () =>{
    const token = localStorage.getItem('@Auth:token');

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

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

    if(inRouteState === true){
        setInRoute(true)
    }else if(acceptedState === true){
        setAccepted(true)
    }else if(newOrderState === true){
        setNewOrder(true)
    }else{
        setAccepted(false)
        setNewOrder(false)
        setInRoute(false)
    }

    console.log(location.state)

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

                { inRoute ? 
                    <div className='container_total_delivery'>
                        <div className='container_total_order'>
                            <p>Valor do pedido: <span>{order?.total && <FormatCashReal valor={order.total} />}</span></p>
                        </div>

                        <div className='container_delivery_pin'>
                            <form onSubmit={FinalizarEntrega}><input type="number" className='inp_delivery_pin' placeholder='Código de entrega' value={pin} onChange={(e) => setPin(e.target.value)}/></form>
                        </div>
                    </div>
                    :
                    ""
                }

                <div className='content-button-aceitar'>
                    <button onClick={FinalizarEntrega} className='btn-acepted'>{
                       newOrder ? "Aceitar" : (accepted ? "Retirar" : "Finalizar entrega")
                    }</button>
                </div>
            </>
        ): (
            <Loading />
        )}
    </main>
  )
}
