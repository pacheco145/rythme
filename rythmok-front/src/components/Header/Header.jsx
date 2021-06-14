import './header.scss'
import {useHistory, Link, withRouter} from 'react-router-dom'
import { useState, useEffect } from 'react';




const Header = (props) => {
    const [pageHeading, setPageHeading] = useState('Rythme');
    // const pageHeading = 'Rythme';
    const param = props.location.pathname;
    const firstParam = param.split('/')[1]
    // console.log(param.split('/'));

    useEffect(() => {
        choosePageHeadings()
        // console.log(param)
        // console.log(firstParam)

    }, [firstParam]);

    // const 

    const choosePageHeadings = () => {
        switch(firstParam){
            case '': setPageHeading('Rythme');
            break;
            case 'events': setPageHeading('Events');
            break;
            case 'my-concerts': setPageHeading('My concerts');
            break;
            case 'friends': setPageHeading('Friends');
            break;
            case 'config': setPageHeading('Configuration');
            break;
            default: setPageHeading('Rythme')
        }
    }

    const history = useHistory();
    const goBackwards = () => {
        history.goBack();
    }

    return (
        <header className="header">
            
            {firstParam && <button onClick={goBackwards} className="header__back">
                <img src="/assets/back.svg" alt="" />
            </button>}
            
            <span className="header__heading">{pageHeading}</span>
            
        </header>
    )
}

export default withRouter(Header)