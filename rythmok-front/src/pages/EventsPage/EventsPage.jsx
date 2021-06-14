import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EventCard } from "../../components";
import './eventsPage.scss'


const inputObject = {
    inputArtists: '',
    inputStyles: '',
    inputHalls: '',
}

const EventsPage = (props) => {
    // console.log('info item', props)
    let typeOfData = props.location.typeOfData;
    let isStyle = (typeOfData === "Styles")
    let isArtist = (typeOfData === "Artists")
    let isHall = (typeOfData === "Halls")
    let infoItem = props.location.infoItem;

    const events = useSelector(state => state.events.events)
    const [eventsFiltered, setEventsFiltered] = useState(events)
    // console.log('EVENTS',events)
    // const [artistsValue, setArtistsValue] = useState('caca')


    const setInputObjectFunction = () => {
        if(isArtist) {
            document.getElementById('artists').value = props.location.infoItem.name;
            inputObject.inputArtists = document.getElementById('artists').value.toLowerCase()
        }
        if(isStyle) {
            document.getElementById('styles').value = props.location.infoItem;
            inputObject.inputStyles = document.getElementById('styles').value.toLowerCase()
        }
        if(isHall) {
            document.getElementById('halls').value = props.location.infoItem.name;
            inputObject.inputHalls = document.getElementById('halls').value.toLowerCase()
        }
        // console.log(inputObject)
    }

    const setFilteredEventsFunction = () =>{
        let eventsFilteredVar = []
        if (events) eventsFilteredVar = events.filter(event => {
            // console.log(inputObject.inputStyles)
            // console.log('styleees', event.styles)
            // console.log('styleees FILTER', event.styles.filter(style => style.includes(inputObject.inputStyles))[0])
            return (
                event.artists[0].name.toLowerCase().includes(inputObject.inputArtists) &&
                event.location.name.toLowerCase().includes(inputObject.inputHalls) &&
                event.styles.filter(style=>style.toLowerCase().includes(inputObject.inputStyles))[0] 
                // event.styles.includes(inputObject.inputStyles) 
            )
        })

        // console.log('filtrado', eventsFilteredVar)

        setEventsFiltered(eventsFilteredVar)
    }

    useEffect(() => {
        setInputObjectFunction()
        setFilteredEventsFunction()
        
        
    }, [events])



    
    const handleInput = (e) => {

        // console.log('TARGET',e.target.className)
        // setArtistsValue(e.target.value.toLowerCase())
        // let whichInput = e.target.className;
        // console.log('nameeee',e.target.name)
        if (e.target.name === 'styles') inputObject.inputStyles = e.target.value.toLowerCase();
        if (e.target.name === 'artists') inputObject.inputArtists = e.target.value.toLowerCase();
        if (e.target.name === 'halls') inputObject.inputHalls = e.target.value.toLowerCase();
        setFilteredEventsFunction()
        // let toSetArtist = events.filter(event => event.artists[0].name.includes(inputValue))
        let toSetStyle = events.filter(event => {
            // console.log('input value', inputValue)

            // console.log('retornado', event.styles.filter(style => style.includes(inputValue)))
            // return event.styles.filter(style => style.includes(inputValue)[0])
        })
        // let toFilter = 
        // setEventsFiltered()
        // .styles[0].name.includes(inputValue)
        // console.log('to filter', toSetStyle)
    }

    return (
        <>
            {/* <h1>{thingToFilter}Nothing</h1> */}
            <div className="filters">
                <input type="text" placeholder="artist" className="artist" name="artists" id="artists" onChange={handleInput} />
                <input type="text" placeholder="styles" className="styles"  name="styles"  id="styles" onChange={handleInput} />
                <input type="text" placeholder="halls" className="halls" name="halls"  id="halls" onChange={handleInput} />
                <input type="date" placeholder="date" className="date" name="date"  id="date" onChange={handleInput} />
            </div>
            <div className="events">
                {eventsFiltered && eventsFiltered.map((event, index) => <EventCard key={index} event={event} />)}

            </div>
        </>
    )
}

export default EventsPage