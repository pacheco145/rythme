import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import { checkSession } from "../../api/auth.api";
import { useHistory, Redirect } from "react-router-dom";

const Navbar = () => {
    // const history = useHistory()

    // const checkUserSession = async () => {
    //     try {
    //         const user = await checkSession();
    //         if (user.message) {
    //             redirect()
    //         }
    //     } catch (error) {
    //         console.log("Error", error);
    //     }
    // };
    // const redirect = () => {
    //     if (location !== '/register') history.push('/login')
    // }
    // const movingBar = document.querySelector('#movingBar');
    // const scrolledDistance = movingBar.scrollLeft
    // console.log('scrolled', scrolledDistance)
    const location = useLocation();
    const url = location.pathname.split("/")[1];
    useEffect(() => {
        // moveBar();
        moveBar2();
        changeIcon();
        // checkUserSession();
        // return () => {
            //     cleanup
            // setTimeout(setInitBar(true))
            // }
        }, [url]);

        // const moveInitBar = () => {
        //     setTimeout(moveBar2(),300)
        // }
        
        // const [initBar, setInitBar] = useState(false)

        const navbarPositions = {
            'events': 'one',
            'my-concerts': 'two',
            '': 'three',
            'friends': 'four',
            'config': 'five'
        }

        const moveBar2 = () => {
            const svgBar = document.querySelector("#svgBar");
            if (svgBar) svgBar.className = '';
            let classToAdd = `navbar-position--${navbarPositions[url]}`;
            if (svgBar) svgBar.classList.add(classToAdd)
            // console.log(svgBar.classList)
        }
        
        // const [url, setUrl] = useState(location.pathname.split("/")[1]);
        const moveBar = () => {
            const movingBar = document.querySelector("#movingBar");
        // console.log('this is the BAR',movingBar)
        // console.log('this is the BAR2',movingBar.scrollWidth)
        // console.log('this is the BAR3',movingBar.clientWidth)
        const windowWidth = window
        .getComputedStyle(movingBar)
        .getPropertyValue("width");
        const widthNumer = windowWidth.split("px")[0];
        // const scrolledDistance = movingBar.scrollLeftMax
        // console.log('screen width',window.screen.width)
        const screenWidth = window.screen.width;
        const barStaticWidth = screenWidth * 1.793;
        // console.log('barWidth', barStaticWidth)
        // console.log('new try', barStaticWidth - screenWidth)
        const scrolledDistance2 = movingBar.scrollWidth - movingBar.clientWidth;
        // if (scrolledDistance2 === 0) scrolledDistance2 = (barStaticWidth - screenWidth) * 0.5
        const scrolledDistance = barStaticWidth - screenWidth;
        console.log('scrolledDistance2', scrolledDistance2)
        console.log('scrolledDistance', scrolledDistance)
        // console.log('new try scroll middle',scrolledDistance, 'and', scrolledDistance2);
        // console.log('scrolled', movingBar.clientWidth)
        // console.log('scrolled2', movingBar.scrollWidth)
        let param;
        
        switch (url) {
            case "":
                param = 0.5;
                break;
            case "events":
                param = 1;
                break;
            case "my-concerts":
                param = 0.75;
                break;
            case "friends":
                param = 0.25;
                break;
            case "config":
                param = 0;
                break;
            case "login":
                param = 0.5;
                break;
            default:
                param = 0.5;
        }
        // console.log('param', param)

        movingBar.scroll({
            left: 0.5 * scrolledDistance,
            behaviour: "smooth",
        });
        // if (scrolledDistance2 == 0) {
        // } else {
        //     movingBar.scroll({
        //         left: param * scrolledDistance2,
        //         behaviour: "smooth",
        //     });
        // }
        
        // console.log('bar weird', param * scrolledDistance2)
        // movingBar.animate({
        //     scrollLeft: param * scrolledDistance2,
        // }, 1000)
        // movingBar.scrollLeft = param * scrolledDistance2;
        // movingBar.scrollLeft = widthNumer / icon;
        // console.log(e.target)
        // console.log(widthNumer)
    };

    const changeIconVariables = {
        '': 2,
        'events': 0,
        'my-concerts': 1,
        'friends': 3,
        'config': 4
    }

    const changeIcon = (e) => {
        const iconDivs = document.querySelectorAll(".navbar__option");
        const iconBar = document.querySelector(".navbar__iconbar");
        // console.log('NAVBAR1', url)
        // console.log('NAVBAR2', changeIconVariables[url])
        // console.log('NAVBAR3',iconBar.childNodes[changeIconVariables[url]])
        iconDivs.forEach((iconDiv) => {
            let classExist = iconDiv.classList.value.includes(
                "navbar__option--selected"
            );
            if (classExist)
                iconDiv.classList.remove("navbar__option--selected");
        });
        let elementSelected = iconBar.childNodes[changeIconVariables[url]];
        if(elementSelected) elementSelected.classList.add("navbar__option--selected");
    };

    return (
        <nav className="navbar">
            <div className="navbar__iconbar">
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option "
                >
                    <Link to="/events">
                        <span className="navbar__icon d-flex-center-h">
                            <img src={window.location.origin + "/assets/events.svg"} alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            Events
                        </span>
                    </Link>
                </div>
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option"
                >
                    <Link to="/my-concerts">
                        <span className="navbar__icon d-flex-center-h">
                            <img src={window.location.origin + "/assets/my-concerts.svg"} alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            My tickets
                        </span>
                    </Link>
                </div>
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option navbar__option--selected"
                >
                    <Link to="/">
                        <span className="navbar__icon d-flex-center-h">
                            <img src={window.location.origin + "/assets/home.svg"} alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            Home
                        </span>
                    </Link>
                </div>
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option"
                >
                    <Link to="/friends">
                        <span className="navbar__icon d-flex-center-h">
                            <img src={window.location.origin + "/assets/friends.svg"} alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            Friends
                        </span>
                    </Link>
                </div>
                <div
                    onClick={(e) => {
                        moveBar();
                        changeIcon(e);
                    }}
                    className="navbar__option"
                >
                    <Link to="/config">
                        <span className="navbar__icon d-flex-center-h">
                            <img src={window.location.origin + "/assets/config.svg"} alt="" />
                        </span>
                        <span className="navbar__text d-flex-center-h">
                            Config
                        </span>
                    </Link>
                </div>
            </div>
            <div id="movingBar" className="navbar__innerbar">
                <div className="navbar__overflow-container">
                    <img id="svgBar" className="navbar-position--initial" src={window.location.origin + "/assets/navbar.svg"} alt="" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
