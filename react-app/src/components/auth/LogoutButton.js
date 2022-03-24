import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';
import { clearCarState } from '../../store/car';
import { clearBookingState } from '../../store/booking';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(clearCarState())
    await dispatch(clearBookingState())
    await dispatch(logout());
    return history.push("/")
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
