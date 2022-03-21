import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CarForm from './components/CarForm/CarForm';
import NewCarForm from './components/NewCarForm/NewCarForm';
import AllCars from './components/AllCars/allcars';
import HomePage from './components/Home/homePage';
import EditCarForm from './components/EditCarForm/EditCarForm';
import UserCars from './components/UserCars/UserCars';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route> */}
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route path='/newCar' exact={true} >
          <NewCarForm />
        </Route>
        <Route path='/editCar/:carId' exact={true} >
          <EditCarForm />
        </Route>
        <Route path='/allCars' exact={true} >
          <AllCars />
        </Route>
        <Route path='/userCars/:userId' exact={true} >
          <UserCars />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
