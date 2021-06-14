
import { Home, EventDetail,EventsPage, Payform, MyConcerts, Config, FriendsPage, Ticket, LandingPage  } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { getHomeInfo } from "./redux/slices/homeInfo.slice";
import { getEventsAsync } from "./redux/slices/events.slice";
import { getUsersAsync } from "./redux/slices/users.slice";
import { useEffect, useState } from "react";
import "./styles/styles.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Redirect,
} from "react-router-dom";
import { Register, Login, PrivateRoute } from "./components";
import { checkSession, logout } from "./api/auth.api";
import "./App.scss";
import { Header, Navbar } from "./components";
import { checkSessionAsync } from "./redux/slices/user.slice";
import { Helmet } from "react-helmet";

const App = () => {
    // const [user, setUser] = useState(null);
    const {user} = useSelector(state => state.user)
    // console.log(user)
    const dispatch = useDispatch();
    // const history = useHistory();
    // history.push('/landing')
    // console.log(history)

    const [landing, setLanding] = useState(true)

    const landingOut = () => setLanding(false)
    const state = useSelector(state=>state)
    
    useEffect(() => {
        dispatch(getHomeInfo());
        dispatch(getEventsAsync());
        dispatch(getUsersAsync());
        dispatch(checkSessionAsync());
        setTimeout(landingOut, 4000)
        console.log(state)
    }, []);
    

    return (
        <Router>
            <div className="app">
                <Helmet>
                    <title>Rythme</title>
                    <link rel="stylesheet" 
                        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                        crossorigin=""
                    />
                    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                            integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                            crossorigin=""
                    ></script>
                </Helmet>
                {/* {landing && <LandingPage />} */}
                <LandingPage />
                {user && <Header />}
                {user && <div className="header-space"></div>}
                <div className="route-pages-container">
                    {/* <button onClick={logout} style={{position: 'absolute', top: '50vh', left: '50vw', backgroundColor: 'red', cursor:'pointer'}}>Logout</button> */}
                    <Switch>
                        <Route
                                path="/landing"
                                exact
                                component={LandingPage}
                            />
                        <Route
                            path="/register"
                            exact
                            component={Register}
                        />
                        <Route
                            path="/login"
                            exact
                            component={Login}
                        />
                        {/* <PrivateRoute
                            path="/events/eventdetail"
                            exact
                            component={EventDetail}
                        /> */}
                        <PrivateRoute
                            path="/events/eventdetail/:id"
                            exact
                            component={EventDetail}
                        />
                        <PrivateRoute
                            path="/my-concerts/:id"
                            exact
                            component={Ticket}
                        />
                        <PrivateRoute path="/" exact component={Home} />
                        <PrivateRoute path="/config" exact component={Config} />
                        <PrivateRoute path="/events" exact component={EventsPage} />
                        <PrivateRoute path="/my-concerts" exact component={MyConcerts} />
                        <PrivateRoute path="/friends" exact component={FriendsPage} />
                        <PrivateRoute path="/events/eventdetail/:id/pay" exact component={Payform}  />
                    </Switch>
                </div>
                {user && <div className="nav-space"></div>}
                {user && <Navbar />}

            </div>
        </Router>
    );
};

export default App;
