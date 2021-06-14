import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { registerAsync } from "../../redux/slices/user.slice";
import './Register.scss';

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
};

const Register = (props) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(INITIAL_STATE);
  const error = useSelector(state => state.user.error);

  const history = useHistory()
  // const redirect = () => history.push('/');

  const submit = async (ev) => {
    ev.preventDefault();

    dispatch(registerAsync({
      form,
    })).then(() => history.push('/'))

    setForm(INITIAL_STATE)

  };

  const changeInput = (ev) => {
    const { name, value } = ev.target;

    setForm({ ...form, [name]: value });
  };

  // console.log(props);

  return (
    
    <div className="background">
    <img className="logo" src="https://i.ibb.co/LtSRCS5/Logo.png" alt="Logo" border="0"/>
    <h1 className="title">Register</h1>

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
        <label htmlFor="username">
          <p className="form-container__text">Nombre de Usuario</p>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={changeInput}
            value={form.username}
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

        <button type="submit" className="form-container__button">Registro</button>

        {error && <div className="error">{error}</div>}
      </form>
      <a href="/login" className="link">¿Ya tienes un usuario?</a>
    </div>
  );
};

export default Register;
