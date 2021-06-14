import { useSelector } from "react-redux"
import { InfoCard } from "../../components"
import './ticket.scss'


const Ticket = (props) => {

    // console.log(props)

    const events = useSelector(state=> state.events.events)
    let idTicket = props.match.params.id;

    const ticketInfo = events.find(event=>event._id === idTicket)

    // console.log(ticketInfo)


    return (
        <>
            <div className="ticket">
                <InfoCard {...props} />
                <div className="ticket__info">
                    <h3>{ticketInfo.artists[0].name}</h3>
                    <p>en {ticketInfo.location.name}</p>
                    <p>{ticketInfo.location.location}</p>
                    <p>Apertura de puertas a 20:00</p>
                </div>
                <div className="ticket__QR">
                    <img src="/assets/QR.png" alt="" />
                </div>
            </div>
            <button className="pdf">Download in PDF</button>
        </>
    )
}

export default Ticket