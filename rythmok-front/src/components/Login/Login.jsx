import  { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { loginAsync } from "../../redux/slices/user.slice";
import './Login.scss';

const INITIAL_STATE = {
    email:"",
    password:"",
};

const Login = (props)=>{
    const dispatch = useDispatch()
    const [form, setForm] = useState(INITIAL_STATE);
    const {error} = useSelector(state => state.user)
    const history = useHistory();

    const [landing, setLanding] = useState(false)

    const landingOut = () => setLanding(false)
    useEffect(() => {
        setTimeout(landingOut, 4000)
    }, [])

    
    


    // const redirect = () => history.push('/')

    const submit = async (ev)=>{
        ev.preventDefault();

        dispatch(loginAsync({
            form,
            // cb: redirect
        })).then(() => history.push('/'))

        setForm(INITIAL_STATE)
    };
    const changeInput=(ev) =>{
        const {name , value } = ev.target;

        setForm({...form, [name]: value});
    };
    
    
    return (
        <>
        <div className="background">
            <img className="logo" src="assets/logo.png" alt="Logo" border="0"/>
            <h1 className="title">Login</h1>
        
            <form onSubmit={submit} className = "form-container">
                <label htmlFor="email">
                <p className="form-container__text">Email</p>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    onChange={changeInput}
                    value={form.email}
                    className="form-container__input"
                />
                </label>
                <label htmlFor="password">
                <p className="form-container__text">Password</p>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={changeInput}
                    value={form.password}
                    className="form-container__input"
                />
                </label>
                <button type="submit" className="form-container__button"> Login</button>
                {error && <div className="error">{error}</div>}
            </form>
            <a href="/register" className="link">Registrate</a>
        </div>
        {landing && 
            <div className="background landing">
                <img className="logo landing__logo" src="assets/logo.png" alt="Logo" border="0"/>
            </div>
        }
        
        </>
        
    );
}
export default Login
