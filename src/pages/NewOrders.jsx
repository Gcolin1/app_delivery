import React from 'react'
import  "./style/NewOrders.scss"
import { TopBar } from './components/TopBar';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function NewOrders () {
  return (
    <main className='container'>
        <TopBar />

        <Link className='link' to={'/order-details/HFR46389'} >
          <div className='new_order_container'>
            <div className='item1'>
                <p className='time'>A few seconds ago</p>
                <h4 className='price_orders'>R$2,99</h4>
            </div>
            <div className='detail_order'>
              <p className='loja_name'>Loja: <span>Burguer food</span></p>
              <p className='id_order'>#HFR46389</p>
            </div>
            <div className='address'>
             
              <p><FontAwesomeIcon icon={faLocationDot} className='icon' /> Rua nordestina 83, São Miguel</p>
            </div>
          </div>
        </Link>
    </main>
  )
}

export default NewOrders;
