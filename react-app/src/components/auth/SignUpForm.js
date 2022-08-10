import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validationErrors = [];

    if (displayName.length <= 20 &&
      displayName.length >= 4 &&
      username.length <= 40 &&
      username.length >= 4 &&
      email.length <= 40 &&
      email.length >= 9 &&
      email.match(emailRegex) &&
      password.length <= 255 &&
      password.length >= 8 &&
      password === repeatPassword
    ) {
      const data = await dispatch(signUp(displayName, username, email, password));
      if (data) {
        setErrors(data)
      } else {
        setShowModal(false);
        history.push('/jokes')
      }
    } else {
      if (displayName.length < 4 || displayName.length > 20) {
        validationErrors.push("Displayname must be between 4 and 20 characters");
      }
      if (username.length < 4 || username.length > 40) {
        validationErrors.push("Username must be between 4 and 40 characters");
      }
      if (email && !email.match(emailRegex)) {
        validationErrors.push("Email is not a valid email");
      }
      if (email.length < 9 || email.length > 40) {
        validationErrors.push("Email must be between 9 and 40 characters");
      }
      if (password.length < 8 || password.length > 40) {
        validationErrors.push("Password must be between 8 and 255 characters");
      }
      if (password.length > 255) {
        validationErrors.push("Password must be less than 255 characters");
      } else {
        if (password !== repeatPassword) {
          validationErrors.push('Passwords do not match');
        }
      }
      setErrors(validationErrors);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateDisplayname = (e) => {
    setDisplayName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/'/>;
  }

  return (
    <div className='SignupWrapper'>
      <div className='SignupHeader'>
        <div className='SignupTitle'>
          <div onClick={() => setShowModal(false)} className='SignupCloseButtonContainer'>
            <AiOutlineClose className='SignupCloseButton' />
          </div>
          <p className='SignUpTitleText'>Create your account</p>
        </div>
      </div>
      <form className="SignupForm" onSubmit={onSignUp}>
        <div className='SignupErrorContainer'>
          {errors.map((error, ind) => (
            <div className='SignupError' key={ind}>{error}</div>
          ))}
        </div>
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Displayname</label>
          <input
            className='SignupInput'
            type='text'
            name='displayname'
            onChange={updateDisplayname}
            value={displayName}
            required={true}
          ></input>
        </div>
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Username</label>
          <input
            className='SignupInput'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
        </div>
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Email</label>
          <input
            className='SignupInput'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
        </div>
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Password</label>
          <input
            className='SignupInput'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Repeat Password</label>
          <input
            className='SignupInput'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
      </form>
      <button onClick={onSignUp} className='SignupSubmitButton' type='submit'>Sign up</button>
    </div>
  );
};

export default SignUpForm;
