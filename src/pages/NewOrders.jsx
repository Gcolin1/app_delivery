  import React, { useEffect, useState } from 'react'
  import  "./style/NewOrders.scss"
  import DeliveryBoy from '../assets/deliveryBoy.png'
  import IndisponivelPng from '../assets/indisponivel.png'
  import { TopBar } from './components/TopBar';
  import { faLocationDot, faMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { Link } from 'react-router-dom';
  import { api } from '../services/api';
  import { Loading } from './components/Loading';
  import OrderDeliveryTimeCounter from './components/OrderDeliveryTimeCounter';

  function NewOrders () {
    const [orders, setOrders] = useState([])
    const [removingLoader, setRemovingLoader] = useState(false)
    const [show, setShow] = useState([])
    const [online, setOnline] = useState([])

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

    const getStatus = () => {
      const stateStatus = localStorage.getItem('status') 
      setOnline(stateStatus)
      console.log(stateStatus)
    }

    useEffect(() => {
      getOrders();
      getStatus()
    }, [])


    return (
      <main className='container'>
      <TopBar />

      {/* Verifica se não há pedidos */}
      {(orders.new_orders?.length >= 0 && online === "false") && (
        <div className='order_empty_container'>
          <div className='offline-message'>
            <p>Você está indisponível.</p>
            <img src={IndisponivelPng} alt="" />
            <p>Por favor, fique disponível para aceitar novos pedidos</p>
          </div>
        </div>
      )}

      {/* Verifica se não há pedidos */}
      {orders.new_orders?.length <= 0 && online !== "false" && (
        <div className='order_empty_container'>
          <>
            <img src={DeliveryBoy} alt="" />
            <p>Nenhum pedido encontrado!</p>
          </>
        </div>
      )}

      {/* Renderizar os pedidos se houver */}
      {orders.new_orders?.length > 0 && online === "true" && (
        orders.new_orders.map((item, index) => (
          <div className='orders_accepted_container' key={index}>
            <div className='cabeçalho'>
              <OrderDeliveryTimeCounter deliveryTimeFromApi={item.updated_at}/>
              <p className='id_order'>#{item.unique_order_id}</p> 
            </div>

            <Link to={`/order-details/${item.unique_order_id}`} state={{ 
              dados: item.orderstatus_id, 
              newOrder: true, 
              accepted: false,
              inRoute: false
            }}>
              <div className='info-order'>
                <div className='info_loja'>
                  <p className='loja_name'><span>Loja:  </span>{item.restaurant.name}</p>
                  <p className='paragraph'><span>Endereço da loja:  </span>{item.restaurant?.address}</p>
                  <p><span>Numero: {item.restaurant?.contatoloja ? item.restaurant?.contatoloja : "----------"}</span></p>                  
                </div>

                <div className='comission_info'>
                  <p className='comission_title'>Comissão</p>
                  <p className='price_orders'>R${item.commission}</p>
                </div>
              </div>
            </Link>

            {show[index] &&
              <div className='info-entrega'>
                <p>Endereço de entrega:  {item.address}</p>
                <p>Modo de pagamento:  {item.payment_mode}</p>
                <p>Observações:  {item.order_comment}</p>
              </div> 
            }

            <div className='container-descricao-entrega'>
              <button onClick={() => showToggle(index)} className='btn-descricao-entrega'>Informações da entrega{!show[index] ? <FontAwesomeIcon icon={faSquarePlus} className='icon'/> : <FontAwesomeIcon icon={faMinus} className='icon'/>}</button>
            </div>
          </div>
        ))
      )}

      {/* Renderizar a mensagem de carregamento */}
      {!removingLoader && (
        <Loading />
      )}
    </main>
    )
  }

  export default NewOrders;
