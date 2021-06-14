import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { checkSessionAsync } from '../../redux/slices/user.slice';
import { addFriendAsync, getUsersAsync } from '../../redux/slices/users.slice';
import './friendCard.scss'

const FriendCard = (props) => {
    const history = useHistory()
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch();

    const [form, setForm] = useState('');

    const redirect = () => history.push('/friends');

    const addFriend = async() => {
        
        
        let URL_ADD_FRIEND = `http://localhost:4000/users/${user._id}/add-friend/${props.user._id}`;
        const req = await fetch(URL_ADD_FRIEND, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // CORS
            },
            credentials: 'include',
            // body: JSON.stringify(form),
        });
        console.log(req)
        // const response = await req.json();
        // return response;
        dispatch(getUsersAsync())
        dispatch(checkSessionAsync())
        props.showFriends()
    }


    return(
        <div className="user-card ">
            <div className="user-card__img">
                <img src="assets/user.svg" alt="" />
            </div>
            <div className="user-card__info">
                <h3>@{props.user.username}</h3>
                {!props.showedUsers && <p>Write a message to your new friend</p>}
            </div>
            {props.showedUsers && 
                <div className="user-card__add" onClick={addFriend} >
                    <img src="assets/addFriend.svg"></img>
                </div>
            }
        </div>
    )
}

export default FriendCard