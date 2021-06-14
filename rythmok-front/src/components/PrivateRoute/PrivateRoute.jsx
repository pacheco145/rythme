import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";


const PrivateRoute = (props) => {
    const state = useSelector(state => state);
    const user = useSelector(state => state.user.user);
    // console.log('EL STAATEEEE', state);
    // console.log('EL STAATEEEE', state);
    // return <h1>{user}</h1>
    if (user===null) {
        return <h1>Loading...</h1>
    }

    if (user===false) {
        return <Redirect to="/login" />
    }

    if (user) {
        return <Route {...props} />
    }
}

export default PrivateRoute