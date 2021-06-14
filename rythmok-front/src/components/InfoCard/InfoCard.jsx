import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkSession } from "../../api/auth.api";
import { useSelector } from "react-redux";
import "./infoCard.scss";
import { getEventDate } from "../../utils.js/dates";

const InfoCard = (props) => {
    // let eventData = props.myProps.eventData;
    // console.log(props);
    const idEvent = props.match.params.id;

    const allEvents = useSelector((state) => state.events.events);
    const eventData = allEvents.filter((event) => event._id === idEvent)[0];
    
    const state = useSelector((state) => state);
    
    const date = eventData.date
    // console.log(getEventDate(date, 'day'))


    return (
        <div className="info-card">
            <div className="info-card__image">
                <img
                    className="info-card__image"
                    src={eventData.artists[0].image}
                    alt=""
                />
            </div>
                
            <div className="info-card__info">
                <h3 className="info-card__artist">
                    {eventData.artists[0].name}
                </h3>
                <span className="info-card__date">
                    {getEventDate(date, 'wdmy')}
                </span>
                <span className="info-card__time">
                    {getEventDate(date, 'time')}
                </span>
                <span className="info-card__price">
                    {eventData.prize} €
                </span>
            </div>
        </div>

    );
};

export default InfoCard;
