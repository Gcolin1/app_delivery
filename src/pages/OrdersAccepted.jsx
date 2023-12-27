import React, { useEffect, useState } from 'react'
import { TopBar } from './components/TopBar'
import { api } from '../services/api'
import  "./style/OrdersAccepted.scss"
import OrderImg from '../assets/orderImg.png'
import { Loading } from './components/Loading'
import { Link } from 'react-router-dom'
import OrderDeliveryTimeCounter from './components/OrderDeliveryTimeCounter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

export const OrdersAccepted = () => {
  const [orders, setOrders] = useState([])
  const [removingLoader, setRemovingLoader] = useState(false)

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
        {orders && orders.accepted_orders && orders.accepted_orders.length > 0 && orders.accepted_orders.map(item => (
          <Link key={item.order_id} className='link' to={{ pathname:`/order-details/${item.unique_order_id}`, state: { dados : item.orderstatus_id } }} >
            <div className='new_order_container'>
              <div className='item1'>
              <OrderDeliveryTimeCounter deliveryTimeFromApi={item.updated_at}/>
                <h4 className='price_orders'>R${item.commission}</h4>
              </div>
              <div className='detail_order'>
                <p className='loja_name'>Loja: <span>{item.restaurant.name}</span></p>
                <p className='id_order'>#{item.unique_order_id}</p>
              </div>
              <div className='address'>
                <p><FontAwesomeIcon icon={faLocationDot} className='icon' /> {item.address}</p>
              </div>
            </div>
          </Link>
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
