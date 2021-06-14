const URL_BASE = "http://localhost:4000";
const URL_ARTISTS = `${URL_BASE}/artists`;
const URL_STYLES = `${URL_BASE}/styles`;
const URL_HALLS = `${URL_BASE}/halls`;

const artistsFunction = async () => {
        try {
            const myData = await fetch(URL_ARTISTS).then(res=>res.json())
            return myData;
            // setArtists(myData)
            // console.log(myData)
        } catch (error) {
            console.log(error)
        }
    }

    const stylesFunction = async () => {
        try {
            const myData = await fetch(URL_STYLES).then(res=>res.json())
            // console.log(myData)
            return myData
            // setStyles(myData)
        } catch (error) {
            console.log(error)
        }
    }

    const hallsFunction = async () => {
        try {
            const myData = await fetch(URL_HALLS).then(res=>res.json())
            // console.log(myData)
            return myData
            // setHalls(myData)
        } catch (error) {
            console.log(error)
        }
    }

export {artistsFunction, stylesFunction, hallsFunction}
