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
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import AuthProvider from "./contexts/auth-context";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AnonRoute from "./components/AnonRoute";

import "./App.css";
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
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              {/* <PrivateRoute path="/" exact render={(props) => <><Navbar /><LandingPage {...props} /> </>} /> */}
              <PrivateRoute path="/dashboard" exact render={(props) => <><Navbar /><Dashboard {...props} /> </>} />
              <PrivateRoute path="/challenges" exact render={(props) => <><Navbar /><ChallengeList {...props} /> </>} />
              <AdminRoute path="/challenges/manager" exact render={(props) => <><Navbar /><ChallengeManager {...props} /> </>} />
              <PrivateRoute path="/challenges/:challengeId" exact render={(props) => <><Navbar /><ChallengeDetail {...props} /> </>} />
              <AdminRoute path="/challenges/manager/add" exact render={(props) => <><Navbar /><CreateChallenge {...props} /> </>} />
              <AdminRoute path="/challenges/manager/:challengeId/edit" exact render={(props) => <><Navbar /><EditChallenge {...props} /> </>} />
              <PrivateRoute path="/profile" exact render={(props) => <><Navbar /><Profile {...props} /> </>} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
