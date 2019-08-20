import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import ChallengeList from "./pages/ChallengeList";
import CreateChallenge from "./pages/CreateChallenge";
import EditChallenge from "./pages/EditChallenge";
import ChallengeDetail from "./pages/ChallengeDetail";
import ChallengeManager from "./pages/ChallengeManager";

import NotFound from "./pages/NotFound";
import AuthProvider from "./contexts/auth-context";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AnonRoute from "./components/AnonRoute";
import "./App.css";
//import "./scss/css/main.css"
//import "milligram";


import firebase from "firebase";
import Dashboard from "./pages/Dashboard.js";

const config = {
  apiKey: "AIzaSyBj7EWAwq4T3SpSDYv_OkgOoIPrZtbaW6E",
  authDomain: "mulli-app.firebaseapp.com",
  storageBucket: "gs://mulli-app.appspot.com/"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <main className="container">
            <Navbar />
            <Switch>
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/" exact component={LandingPage} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/challenges" exact component={ChallengeList} />
              <AdminRoute path="/challenges/manager" exact component={ChallengeManager} />
              <PrivateRoute path="/challenges/:challengeId" exact component={ChallengeDetail} />
              <AdminRoute path="/challenges/manager/add" exact component={CreateChallenge} />
              <AdminRoute path="/challenges/manager/:challengeId/edit" exact component={EditChallenge} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
