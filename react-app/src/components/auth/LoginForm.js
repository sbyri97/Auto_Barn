import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import DemoButton from '../NavBar/demo';

const LoginForm = () => {
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
    return <Redirect to='/' />;
  }

  return (
    <div>
      <div className='loginBlackBox'>
        <div className='loginElements'>
          <div className='ab-logo'>
          </div>
          <form className='formMainDiv' onSubmit={onLogin}>
            <div className='errors'>
              {errors?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='formWelcomeBox'>
              <h2 className='formWelcomeBoxTxt'>Log in Below.</h2>
            </div>
            <div>
              <label className='forminputs'>
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
                placeholder='Password'
                name='password'
                onChange={updatePassword}
                value={password}
                />
              </label>
            </div>
            <div className='loginSubmitButtons'>
              <button type='submit' className='loginSubmitBtn'>LOG IN</button>
            </div>
          </form>
          <div className='orBox'>
            <div className='orElement'>------------------ OR ------------------</div>
          </div>
          <div className='demoUserBox'>
          <DemoButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
