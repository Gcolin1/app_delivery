import React, { useEffect, useState } from 'react'
import { TopBar } from './components/TopBar'
import { api } from '../services/api'
import  "./style/OrdersAccepted.scss"
import OrderImg from '../assets/orderImg.png'
import { Loading } from './components/Loading'
import { Link } from 'react-router-dom'
import OrderDeliveryTimeCounter from './components/OrderDeliveryTimeCounter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMinus, faSquarePlus, faStar } from '@fortawesome/free-solid-svg-icons'


export const OrdersAccepted = () => {
  const [orders, setOrders] = useState([])
  const [show, setShow] = useState([])
  const [removingLoader, setRemovingLoader] = useState(false)

  const showToggle = (index) => {
    const updatedShowArray = [...show]; // Cria uma cópia do array de show
    updatedShowArray[index] = !updatedShowArray[index]; // Inverte o estado do item correspondente ao índice
    setShow(updatedShowArray); // Atualiza o array de show
  }

  const getOrders = async () =>{
    try{
      const response = await api.post("/delivery/get-delivery-orders")

      const data = response.data;
      console.log(data)
      setOrders(data)

      if(data){
        setRemovingLoader(true)
      }

    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <main className='container' >
        <TopBar />

        <div>
        {orders && orders.accepted_orders && orders.accepted_orders.length > 0 && orders.accepted_orders.map((item, index) => (
            <div className='orders_accepted_container'>
              <div className='cabeçalho'>
                <OrderDeliveryTimeCounter deliveryTimeFromApi={item.updated_at}/>
                <p className='id_order'>#{item.unique_order_id}</p> 
              </div>

              <Link to={`/order-details/${item.unique_order_id}`} state={{ 
                  dados: item.orderstatus_id, 
                  newOrder: false, 
                  accepted: true,
                  inRoute: false, 
                }}>
                <div className='info-order'>
                  <div className='info_loja'>
                    <p className='loja_name'><span>Loja:  </span>{item.restaurant.name}</p>
                    <p className='paragraph'><span>Endereço da loja:  </span>{item.restaurant?.address}</p>
                    <p><span>Numero: {item.restaurant?.contatoloja ? item.restaurant?.contatoloja : "----------"}</span></p>                  </div>

                  <div className='comission_info'>
                    <p className='comission_title'>Comissão</p>
                    <p className='price_orders'>R${item.commission}</p>
                  </div>
                </div>
              </Link>

              {show[index] ?
                <div className='info-entrega'>
                    <p>Endereço de entrega:  {item.address}</p>
                    <p>Modo de pagamento:  {item.payment_mode}</p>
                    <p>Observações:  {item.order_comment}</p>
                </div> 
                : ""
              }

              <div className='container-descricao-entrega'>
                <button onClick={() => showToggle(index)} className='btn-descricao-entrega'>Informações da entrega{!show[index] ? <FontAwesomeIcon icon={faSquarePlus} className='icon'/> : <FontAwesomeIcon icon={faMinus} className='icon'/>}</button>
              </div>
            </div>
        ))}{
            orders.accepted_orders > 0  && 'posts'
          }
          {
            orders.accepted_orders <= 0 && 
            <div className='orderAccepted_empty_container'>
              <img src={OrderImg} alt="" />
              <p>Nenhum pedido aceito!</p>
            </div>
          }
          {
            !removingLoader && <Loading/>
          }
        </div>
    </main>
  )
}
