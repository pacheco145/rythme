import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './eventCard.scss'
import { checkSession } from "../../api/auth.api";
import { getEventDate } from "../../utils.js/dates";

const EventCard = (props) => {
    const eventData = props.event;
    const user = useSelector(state=>state.user.user);
    const favorites = user.favourites;
    
    const [isFav, setIsFav] = useState(favorites.includes(eventData._id));
    const state = useSelector(state=>state);
    
    console.log(eventData._id)
    // let isFav = favorites.includes(eventData._id)
    
    const addRemoveFav = () => {
        setIsFav(!isFav)
        // setIsFav(favorites.includes(eventData._id))
    }

    let path = `/events/eventdetail/${eventData._id}`

    let showBuyButton = true;
    if (props.showBuyButton === false) {
        showBuyButton = false;
        path = `/my-concerts/${eventData._id}`;
    }
    // console.log('props EVENT CARD', props)


    const date = getEventDate;

    const postAddFav = async() => {
        let urlAddFav = `http://localhost:4000/users/${user._id}/add-favourite/${eventData._id}`;
        const req = await fetch(urlAddFav, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include',
            // body: form,
        });
        console.log(req)
    }

    const postBuy = async() => {
        // console.log(user._id, eventData._id)
        let urlBuy = `http://localhost:4000/users/${user._id}/buy/${eventData._id}`;
        const req = await fetch(urlBuy, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include',
            // body: form,
        });
        console.log(req)
    }

    // console.log(eventData._id)
   
    // const URL_ADD_FAV = `${URL_BASE}/users/:id/add-favourite/:idEvent`;
    // props.event
    return (
        <div className="event-card">
            <div className="event-card__image">
                <img src={eventData.artists[0].image} alt="" />
            </div>
            <div className="event-card__info">
                <div className="event-card__date-hall">
                    <span className="event-card__date">{date(eventData.date, 'ddmmyy')}</span>
                    <span className="event-card__hall">{eventData.location.name}</span>
                </div>
                {/* <span>{eventData.date}</span> */}
                <h3 className="event-card__artist">
                    <Link to={{ pathname: path, myProps:{eventData, user}, props: {...props} }}>
                        {eventData.artists[0].name}
                    </Link>
                </h3>
                <div className="event-card__last-row">
                    <span className="event-card__styles">
                        {eventData.styles.map((style, index, styles)=> {
                            {/* console.log('index: ', index, 'length: ', styles.length) */}
                            if (index === (styles.length - 1)) return `${style}`
                            else return `${style} / `
                        })}
                    </span>
                    <span className="event-card__attendees">{eventData.attendees.length} asistentes</span>
                    <span className="event-card__price">{eventData.prize} €</span>
                </div>
                <div className="event-card__buttons">
                    <button className="event-card__fav" onClick={()=>{addRemoveFav(); postAddFav()}}>
                    {/*  */}
                        <img 
                            src={isFav ? '/assets/remove-fav.svg' : '/assets/add-fav.svg'} 
                            alt="" />
                    </button>
                    {showBuyButton && <button className="event-card__buy" onClick={postBuy} >
                        <Link to={{ pathname: `/events/eventdetail/${eventData._id}/pay`, myProps:{eventData, user}, props: {...props} }}>Buy</Link>
                    </button>}
                </div>
            </div>
        </div>
    )
    // <h1>{props.event.artists.name}</h1>
}

export default EventCard