import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
import User from './components/User';
import Splash from './components/Splash/SplashPage'
import { authenticate } from './store/session';
import TimelineAllJokes from './components/Timeline/TimelineAllJokes';
import TimelineSingleJoke from './components/Timeline/TimelineSingleJoke';

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
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <Splash />
        </Route>
        <Route path='/sign-up' exact={true}>
          <Splash />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
         <ProtectedRoute path='/' exact={true} >
          <Splash />
        </ProtectedRoute>

        <ProtectedRoute path='/jokes' exact={true} >
          <TimelineAllJokes />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/jokes/post' exact={true} >
          <CreateJoke />
        </ProtectedRoute> */}

        <ProtectedRoute path='/jokes/:id' exact={true} >
          <TimelineSingleJoke />
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
