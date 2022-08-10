import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { AiOutlineClose } from 'react-icons/ai';
import './LoginForm.css';

const LoginForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/  ' />;
  }

  return (
    <div className='LoginWrapper'>
      <div className='LoginClose'>
        <div onClick={() => setShowModal(false)} className='LoginCloseButtonContainer'>
          <AiOutlineClose className='LoginCloseButtonContainer' />
        </div>
      </div>
      <div className='Loginwithoutclose'>
        <img className='LoginIcon' src='https://i.imgur.com/IRQ5Wrh.png' alt="icon"></img>
        <p className='LoginText'>Sign in to Joker</p>

        <form onSubmit={onLogin}>
        <div className='LoginErrorContainer'>
          {errors.map((error, ind) => (
            <div className='LoginError' key={ind}>{error}</div>
          ))}
        </div>
          <div className='LoginFieldContainer'>
            <label htmlFor='email'>Email</label>
            <input
              className='LoginInput'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='LoginFieldContainer'>
            <label htmlFor='password'>Password</label>
            <input
              className='LoginInput'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
        </form>
          <button onClick={onLogin} className='LoginSubmit' type='submit'>Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
