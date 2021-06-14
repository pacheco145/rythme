/*

import {useState} from "react";
import {PayForm} from "../../pages/PayForm/PayForm";
*/
import { useSelector } from "react-redux";
import "./payform.scss";
/*
const INITIAL_STATE={
    username:"",
    email:"",
}
const Payform = (props)=>{
    const[form,setForm] = useState(INITIAL_STATE);
    const[error,setError]= useState("")

    const submit = async(ev)=>{
        ev.preventDefault();
    }
    try{
    }cacth (error)}
    setError(error.message)
    const changeInput = (ev)=>{
    }
}
*/

const Payform = (props) => {
    const { myProps } = props.location;

    const events = useSelector(state => state.events.events)
    const user = useSelector(state => state.user.user)
    // console.log(user)

    const idEvent = props.match.params.id;

    const event = events.find(event=>event._id === idEvent)

    const postBuy = async () => {
        let urlBuy = `http://localhost:4000/users/${user._id}/buy/${event._id}`;
        const req = await fetch(urlBuy, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
            // body: form,
        });
        console.log(req);
    };
    // console.log(myProps);
    return (
        <div className="form-page">
            <div className="form">
                <div className="form__header">
                    <h2>Compra Tus Entradas </h2>
                </div>
                <div className="form__body">
                    <h4>Entrada General: {event.prize} €</h4>
                    <select>
                        <option value="1 entrada">1 entrada</option>
                        <option value="2 entrada">2 entrada</option>
                        <option value="3 entrada">3 entrada</option>
                        <option value="4 entrada">4 entrada</option>
                    </select>
                    <p className="form__gastos-gestion">Gastos de gestión: 1.90€</p>
                    <hr />
                    <p className="form__prize">Total: {event.prize + 0.9} €</p>

                    <h2>Datos del comprador</h2>

                    <input type="text" placeholder="Nombre y apellidos"></input>
                    <input type="email" placeholder="Email"></input>
                    <input type="text" placeholder="Cod.Postal"></input>

                    <h2>Pago con tarjeta</h2>

                    <input type="number" placeholder="Nº Tarjeta"></input>
                    <input type="number" placeholder="mes/año"></input>
                    <input type="number" placeholder="CVV"></input>
                    <input type="text" placeholder="Titular"></input>
                    <button className="form__pay" type="submit" onClick={postBuy}>
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Payform;
