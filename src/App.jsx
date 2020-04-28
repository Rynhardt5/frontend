import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Register, Login, LocationNotFound } from './pages';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/authActions';
import Navbar from './layout/Navbar';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route component={LocationNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
