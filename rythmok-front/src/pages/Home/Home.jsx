import {Section} from '../../components';
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import './home.scss'

const Home = () => {
    
    // const [inputValue, setInputValue] = useState()
    
    const {artists, styles, halls} = useSelector(state => state.data)
    const {username} = useSelector(state=> state.user.user)
    // console.log('user', username)
    
    // console.log('data', artists)
    // console.log('data', halls)
    // console.log('data', styles)

    const [artistsState, setArtistsState] = useState(artists)
    const [stylesState, setStylesState] = useState(styles)
    const [hallsState, setHallsState] = useState(halls)
    
    const handleInput = (e) => {
        let writtenInputValue = e.target.value.toLowerCase();
        let artistsFiltered = artists.filter(artist=>artist.name.toLowerCase().includes(writtenInputValue))
        let stylesFiltered = styles.filter(style=>style.toLowerCase().includes(writtenInputValue))
        let hallsFiltered = halls.filter(hall=>hall.name.toLowerCase().includes(writtenInputValue))
        // console.log('written', writtenInputValue)
        // console.log('On state', stylesFiltered)
        
        setArtistsState(artistsFiltered)
        setStylesState(stylesFiltered)
        setHallsState(hallsFiltered)
    }
    useEffect(()=>{
        // console.log(artistsState, stylesState, hallsState)

    }, [])

    return (
        <>
            <div className="welcome">
                <h1>¡Hola {username}!</h1>
                <h2>¿Qué concierto te apetece?</h2>
            </div>
            <div className="input-container d-flex-center-h">
                <input type="text" placeholder="Search" name="search" onChange={handleInput}></input>
            </div>
            
            <Section info={artistsState}>
                <h2>Artists</h2>
            </Section>
            <Section info={stylesState}>
                <h2>Genres</h2>
            </Section>
            <Section info={hallsState}>
                <h2>Halls</h2>
            </Section>
            
        </>
    )
}

export default Home