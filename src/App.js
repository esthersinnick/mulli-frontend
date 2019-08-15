import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar.js';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './contexts/auth-context';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AnonRoute from './components/AnonRoute';
import './App.css';
import 'milligram';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="container">
            <h1>Basic React Authentication</h1>
            <Switch>
              <PrivateRoute><Navbar /></PrivateRoute>
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/private" component={Private} />
              <AdminRoute />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    )
  }
}

export default App;
