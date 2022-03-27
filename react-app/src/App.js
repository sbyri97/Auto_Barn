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
import LoadingData from './components/EditCarForm/LoadingData';
import EachCar from './components/EachCar/EachCar';
import MyAccount from './components/MyAccount/MyAccount';
import UnauthenticatedUser from './components/auth/UnAuthenticated';
import PageNotFound from './components/NotFoundPages/pagenotfound';

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
    <>
      <NavBar />
      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route> */}
        <Route path="/unauthenticatedUser" exact={true}>
          <UnauthenticatedUser />
        </Route>
        {/* <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <ProtectedRoute path='/newCar' exact={true} >
          <NewCarForm />
        </ProtectedRoute>
        <ProtectedRoute path='/allCars' exact={true} >
          <AllCars />
        </ProtectedRoute>
        <ProtectedRoute path='/userCars/:userId' exact={true} >
          <UserCars />
        </ProtectedRoute>
        <ProtectedRoute path='/cars/:carId' exact={true} >
          <EachCar />
        </ProtectedRoute>
        <ProtectedRoute path='/myaccount' exact={true} >
          <MyAccount />
        </ProtectedRoute>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
