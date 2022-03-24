import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import DemoButton from '../NavBar/demo';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
      const newUser = {name, username, email, password, confirm_password: repeatPassword}
      const data = await dispatch(signUp(newUser));
      if (data) {
        setErrors(data)
      }
    // }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
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
    return <Redirect to='/' />;
  }

  return (
    <div className='signUpBlackBox'>
      <div className='signUpElements'>
        <div className='ab-logo'>
        </div>
        <form className='formMainDiv' onSubmit={onSignUp}>
          <div className='errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='formWelcomeBox'>
            <h2 className='formWelcomeBoxTxt'>Sign up to shop vehicles.</h2>
          </div>
          <div>
            <label className='forminputs'>
              <input
              type='text'
              className='formInputIndiv'
              placeholder='Name'
              name='name'
              onChange={updateName}
              value={name}
              />
              <input
              type='text'
              className='formInputIndiv'
              placeholder='Username'
              name='username'
              onChange={updateUsername}
              value={username}
              />
              <input
                type='text'
                className='formInputIndiv'
                placeholder='Email'
                name='email'
                onChange={updateEmail}
                value={email}
              />
              <input
              type='password'
              className='formInputIndiv'
              placeholder='Create a password'
              name='password'
              onChange={updatePassword}
              value={password}
              />
              <input
                type='password'
                className='formInputIndiv'
                placeholder='Confirm the password'
                name='confirm_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
              />
            </label>
          </div>
          <div className='submitButtons'>
            <button type='submit' className='submitBtn'>CONTINUE</button>
          </div>
        </form>
        <div className='orBox'>
          <div className='orElement'>------------------ OR ------------------</div>
        </div>
        {/* <div className='loginFromSignUp'>
          <h2 className='loginFromSignUpTxt'>Already on Spotify?</h2>
          <div className='loginFromSignUpBtn'>
              <LoginFormModal />
          </div>
        </div> */}
        <div className='demoUserBox'>
          <DemoButton />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
