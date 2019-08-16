import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChallengeList from "./pages/ChallengeList";
import CreateChallenge from "./pages/CreateChallenge";
import EditChallenge from "./pages/EditChallenge";
import ChallengeManager from "./pages/ChallengeManager";
import AuthProvider from "./contexts/auth-context";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AnonRoute from "./components/AnonRoute";
import "./App.css";
import "milligram";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="container">
            <Navbar />
            <Switch>
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/challenges" exact component={ChallengeList} />
              <AdminRoute path="/challenges/manager" exact component={ChallengeManager} />
              <AdminRoute path="/challenges/manager/add" exact component={CreateChallenge} />
              <AdminRoute path="/challenges/manager/:challengeId/edit" exact component={EditChallenge} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
