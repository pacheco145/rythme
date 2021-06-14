import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EventCard, FriendCard } from "../../components"
import './friendsPage.scss'


const FriendsPage = () => {
    const users = useSelector(state=>state.users.users)
    const user = useSelector(state => state.user.user)
    // console.log(user)
    // console.log(users)

    let friends;
    if (users) friends = users.filter(userOfUsers => {
        // console.log(userOfUsers._id)
        // console.log(user.friends)
        return  user.friends.includes(userOfUsers._id)
    })
    // console.log(friends)



    const [whatToShow, setWhatToShow] = useState(friends);

    const [showedUsers, setShowedUsers] = useState(false)

    let usersFiltered = users

    const handleInput = (e) => {
        let inputValue = e.target.value.toLowerCase();
        usersFiltered = users.filter(userOfUsers=>{
            // console.log(userOfUsers.username)
            // console.log(inputValue)
            return userOfUsers.username.toLowerCase().includes(inputValue)
        })
        setWhatToShow(usersFiltered)
    }

    const refreshFriends = () => setWhatToShow(friends)

    const showUsers = () => {
        setWhatToShow(users);
        setShowedUsers(true); 
    }

    const showFriends = () => {
        setWhatToShow(friends);
        setShowedUsers(false);
    }

    const changeButtonColor = (e) => {
        const buttons = document.querySelectorAll(".users-filters__option");
        buttons.forEach((button) => {
            let classExist = button.classList.value.includes(
                "users-filters__option--selected"
            );
            if (classExist)
                button.classList.remove("users-filters__option--selected");
        });
        e.target.classList.add("users-filters__option--selected");
    }


    return (
        <>
            <div className="users-filters">
                <button className="users-filters__option users-filters__option--selected" onClick={(e)=> {showFriends(); changeButtonColor(e)}}>My friends</button>
                <button className="users-filters__option" onClick={(e)=> {showUsers(); changeButtonColor(e)}}>Users</button>
                {showedUsers && 
                    <input className="users-filters__option  users-filters__option--search" placeholder="Search" onChange={handleInput} ></input> 
                }
            </div>
            <div className="users">
                {whatToShow && whatToShow.map((user, index) => <FriendCard user={user} showedUsers={showedUsers} showFriends={showFriends} />)}
            </div>
        </>
    )
}

export default FriendsPage