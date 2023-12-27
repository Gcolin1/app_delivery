import './style/Loading.scss'
import Loader from './../../assets/loading.svg'

export const Loading = () => {
    return (
      <div className='loading_container'>
        <img className='loading' src={Loader} alt="loading" />
      </div>
    )
  }