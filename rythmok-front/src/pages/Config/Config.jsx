import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { checkSessionAsync, logoutAsync } from '../../redux/slices/user.slice';
import './config.scss'


const Config = (props) => {
    // console.log(props)
    const showConfigOption = (e) => {
        e.currentTarget.classList.toggle('config__button--selected');
        e.currentTarget.parentElement.childNodes[1].classList.toggle('config__button--hidden--selected');
        // console.log(e.currentTarget.parentElement.childNodes[1])
    }

    const history = useHistory()

    const dispatch = useDispatch()

    // const redirect = () => history.push('/login')

    const logout = () => {
        dispatch(logoutAsync()).then(()=>dispatch(checkSessionAsync()))
    }

    return (
        <div className="margin-page config">
            <div className="config__block">
                <h3>Personal</h3>
                <button className="config__button">
                    <span>Editar perfil</span>
                </button>
                <button className="config__button">
                    <span>Ubicación</span>
                </button>
                <button className="config__button">
                    <span>Sincronizar calendario</span>
                </button>
                <button className="config__button">
                    <span>Notificaciones</span>
                </button>
                <button className="config__button">
                    <span>Medios de pago</span>
                </button>
                <button className="config__button">
                    <span>Historial de compras</span>
                </button>
            </div>
            <div className="config__block">
                <h3>Sincronizar preferencias</h3>
                <button className="config__button">
                    <span>Sincroniza tu música</span>
                </button>
                <button className="config__button">
                    <span>Sincroniza tus salas favoritas</span>
                </button>
                <button className="config__button">
                    <span>Sincroniza tus contactos</span>
                </button>
            </div>
            <div className="config__block">
                <button className="config__button">
                    <span>Ayuda</span>
                </button>
                <div className="config__two-buttons">
                    <button className="config__button" onClick={showConfigOption}>
                        <span>Cerrar sesión</span>
                    </button>
                    <button className="config__button--hidden" onClick={logout}>
                        Confirm logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Config