import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//contain the layout
import { Home, Register, Login, LocationNotFound } from './pages';
import Navbar from './layout/Navbar';

export default function App() {
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
}
