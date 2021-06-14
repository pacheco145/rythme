const URL_BASE = "http://localhost:4000";
const URL_USERS = `${URL_BASE}/users`;
const URL_ADD_FRIEND = `${URL_BASE}/users/:id/add-friend/:idFriend`;


const getUsers = async() => {
    try {
        const users = await fetch(URL_USERS).then(res=>res.json())
        console.log('from api', users)
        return users
        
    } catch (error) {
        console.log(error)
    }
}

const addFriend = async(form) => {
    const req = await fetch(URL_ADD_FRIEND, {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': '*' // CORS
        },
        credentials: 'include',
        body: JSON.stringify(form),
    });
    const response = await req.json();
    return response;
}

export {getUsers, addFriend}