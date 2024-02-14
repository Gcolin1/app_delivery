import React, { useEffect, useState } from 'react'
import  "./style/NewOrders.scss"
import DeliveryBoy from '../assets/deliveryBoy.png'
import { TopBar } from './components/TopBar';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Loading } from './components/Loading';
import OrderDeliveryTimeCounter from './components/OrderDeliveryTimeCounter';

function NewOrders () {
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
    <main className='container'>
        <TopBar />

        {orders && orders.new_orders && orders.new_orders.length > 0 && orders.new_orders.map(item => (
          <Link to={`/order-details/${item.unique_order_id}`} state={{ dados: item.orderstatus_id, tela: 'new_orders' }}>
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
        ))}
        {
            orders.new_orders <= 0 && 
            <div className='order_empty_container'>
              <img src={DeliveryBoy} alt="" />
              <p>Nenhum pedido encontrado!</p>
            </div>
        }
        {
          !removingLoader && <Loading/>
        }

        
    </main>
  )
}

export default NewOrders;
