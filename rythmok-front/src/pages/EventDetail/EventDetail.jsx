import {InfoCard, Map, Section} from './../../components'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './eventDetail.scss'

const EventDetail = (props) => {

    // const [inputValue, setInputValue] = useState()
    
    const {events, eventDetail, } = useSelector(state => state.data)
    const user = useSelector((state) => state.user.user);
    const favorites = user.favourites;
    // console.log('data', artists)
    // console.log('data', halls)
    // console.log('data', styles)

    const [eventsState, setEventsState] = useState(events)
    const [eventDetailState, setEventDetailState] = useState(eventDetail)

    // console.log("HOLA" , props)

    const idEvent = props.match.params.id;
    const allEvents = useSelector((state) => state.events.events);
    const eventData = allEvents.filter((event) => event._id === idEvent)[0];

    const [isFav, setIsFav] = useState(favorites.includes(eventData._id));

    const postAddFav = async () => {
        let urlAddFav = `http://localhost:4000/users/${user._id}/add-favourite/${eventData._id}`;
        const req = await fetch(urlAddFav, {
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
    // console.log(eventData.styles)

    const addRemoveFav = () => {
        setIsFav(!isFav);
    };

    const postBuy = async () => {
        // console.log(myProps)
        let urlBuy = `http://localhost:4000/users/${user._id}/buy/${idEvent}`;
        const req = await fetch(urlBuy, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
            // body: form,
        });
    };

    return (
        <div className="detail-container margin-page">
            <InfoCard {...props} myProps={props.location.myProps}/>
            <div className="detail-buttons">
                <button
                    className="detail-buttons__fav"
                    onClick={() => {addRemoveFav(); postAddFav(); }}
                >
                    <img
                        src={isFav ? "/assets/remove-fav.svg" : "/assets/add-fav.svg" }
                        alt=""
                    />
                </button>
                <button className="detail-buttons__buy" onClick={postBuy}>
                    <Link
                        to={{
                            pathname: `/events/eventdetail/${idEvent}/pay`,
                            myProps: props.myProps,
                            props: { ...props },
                        }}
                    >
                        Buy
                    </Link>
                </button>
            </div>

            <div className="detail-info">
                <span className="detail-info__hall">
                    {eventData.location.name}
                </span>
                <span className="detail-info__styles">
                    {eventData.styles.map((style, i, array) => {
                        if (++i === array.length) return style
                        else return style + ' / '
                    })}
                </span>
                <span className="detail-info__attendees">
                    {eventData.attendees.length} asistentes
                </span>
            </div>

            <div className="detail-description">
                {eventData.artists[0].bio}
            </div>
            <Map />
                       
        </div>
    )
}

export default EventDetail