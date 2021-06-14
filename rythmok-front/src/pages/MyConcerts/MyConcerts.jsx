import { useState } from "react"
import { useSelector } from "react-redux"
import { EventCard } from "../../components"
import './myConcerts.scss'


const MyConcerts = () => {
    const {favourites, acquisted} = useSelector(state => state.user.user)
    const user = useSelector(state => state.user.user)
    console.log(user)
    // console.log(acquisted)
    const events = useSelector(state=>state.events.events)
    // console.log(events)
    const favoritesFiltered = events.filter(event=>favourites.includes(event._id))
    const acquistedFiltered = events.filter(event=>acquisted.includes(event._id))
    // console.log(favoritesFiltered)
    // console.log(acquistedFiltered)

    const [showBuyButton, setShowBuyButton] = useState(false)

    const [whatToShow, setWhatToShow] = useState(acquistedFiltered);

    const showAcquisted = () => {
        setWhatToShow(acquistedFiltered); 
        setShowBuyButton(false);
    }

    const showFavorites = () => {
        setWhatToShow(favoritesFiltered);
        setShowBuyButton(true);
    }

    const changeButtonColor = (e) => {
        const buttons = document.querySelectorAll(".my-concert-filters__option");
        buttons.forEach((button) => {
            let classExist = button.classList.value.includes(
                "my-concert-filters__option--selected"
            );
            if (classExist)
                button.classList.remove("my-concert-filters__option--selected");
        });
        e.target.classList.add("my-concert-filters__option--selected");
    }


    return (
        <>
            <div className="my-concert-filters">
                <button className="my-concert-filters__option my-concert-filters__option--selected" onClick={(e)=> {showAcquisted(); changeButtonColor(e)}}>My concerts</button>
                <button className="my-concert-filters__option" onClick={(e)=> {showFavorites(); changeButtonColor(e)}}>My favorites</button>
            </div>
            <div className="events">
                    {whatToShow && whatToShow.map((event, index) => <EventCard key={index} event={event} showBuyButton={showBuyButton} />)}

            </div>
        </>
    )
}

export default MyConcerts