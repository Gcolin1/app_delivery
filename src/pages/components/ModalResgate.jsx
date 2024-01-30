import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import './style/ModalResgate.scss'

export default function ModalResgate ({isOpen, setModalOpen}) {
    if(isOpen){
        return (
            <div className="container_resgate">
                <div className='container_button_fechar'>
                    <p>Valor do resgate</p>
                    <button onClick={setModalOpen}><FontAwesomeIcon icon={faX} className='icon' /></button>
                </div>

                
                <form className="form_resgate">
                    <input type="number" placeholder="R$ 0,00"
                        onKeyDown={(e) =>
                            ["ArrowUp", "ArrowDown", "e", "E"].includes(e.key) && e.preventDefault()
                        }
                    />
                    <button className="btn_resgatar">Resgatar</button>
                </form>
            </div>
        )
    }

    return(null)
}