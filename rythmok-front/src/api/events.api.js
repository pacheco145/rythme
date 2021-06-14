const URL_BASE = "http://localhost:4000";
const URL_EVENTS = `${URL_BASE}/events`;
const URL_ADD_FAV = `${URL_BASE}/users/:id/add-favourite/:idEvent`;


const getEvents = async() => {
    try {
        const events = await fetch(URL_EVENTS).then(res=>res.json())
        // console.log('from api', events)
        return events
        
    } catch (error) {
        console.log(error)
    }
}





const postAddFav = async(form) => {
    const req = await fetch(URL_ADD_FAV, {
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

export {getEvents, postAddFav}

