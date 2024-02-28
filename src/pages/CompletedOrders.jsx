import React, { useEffect, useState } from 'react'
import  "./style/CompletedOrders.scss"
import OrderImg from '../assets/orderImg.png'
import { TopBar } from './components/TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Loading } from './components/Loading';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FormatCashReal } from './components/FormatCashReal';

function CompletedOrders () {
  const [orders, setOrders] = useState([])
  const [removingLoader, setRemovingLoader] = useState(false)
  const navigate = useNavigate()

  const Goback = (event) => {
    event.preventDefault();
    navigate(-1)
  };

  const getCompletedOrders = async () =>{
    try{
      const response = await api.post("/delivery/get-completed-orders")

      const data = response.data;
      console.log(data.data)
      setOrders(data.data)

      if(data){
        setRemovingLoader(true)
      }

    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getCompletedOrders();
  }, [])


  return (
    <main className='container'>
        <TopBar />

        <div>
            <Link style={{color: "#000"}} onClick={Goback}><FontAwesomeIcon icon={faChevronLeft} className='icon'/> Voltar</Link>
        </div>

        {orders && orders.length > 0 && orders.map(item => (
          <>
             <div className='container_orders'>
                <div className='top_completed_order'>
                    <p>{item.updated_at}</p>
                    <p>{item.order?.unique_order_id}</p>
                </div>

                <div className='info_completed_order'>
                    <p>Endereço: {item.order?.address}</p>
                    <p>Forma de pagamento: {item.order?.payment_mode}</p>
                    <p>Total do pedido: <FormatCashReal valor={item.order?.payable} /></p>
                </div>
             </div>
          </>
        ))}
        {
            orders.new_orders <= 0 && 
            <div className='order_empty_container'>
              <img src={OrderImg} alt="" />
              <p>Nenhum pedido completo!</p>
            </div>
        }
        {
          !removingLoader && <Loading/>
        }

        
    </main>
  )
}

export default CompletedOrders;
