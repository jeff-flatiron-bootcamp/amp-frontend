import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ConditionalNavBar from "./components/conditionalNavBar";

import SignIn from "./components/signIn";
import CreateAccount from "./components/createAccount";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Profile from './components/profile'
import LoggedOut from './components/loggedOut'
import AdminLease from './components/adminLeases'
import RenterLease from './components/renterLease'
import RenterPaymentHistory from './components/renterPaymentHistory'
import AdminPaymentHistory from './components/adminPaymentHistory'

export default class App extends Component {
  state = {
    nav_panel: "",
    content_panel: "",
    admin: false,
    user: {},
    token: {}
  };

  signOutHandler = (e) => {
    console.log("signOut reached");
    this.storeUser({});
    localStorage.clear();
    
  };

  // conditionalRender = () => {
  //   if(localStorage.getItem("token"))
  //   {

  //   }
  //   else
  //   {

  //   }
  // }

  storeUser = (userToStore, token) => {    
    this.setState({user: userToStore})
    //debugger
  }

  render() {
    return (
      <Router>
        <div className="flex-container-row">
          <div className="link-panel">
            <ConditionalNavBar user={this.state.user} signOutHandler={this.signOutHandler}
            />
          </div>
          <Switch>
            {/* <Route exact path="/sign_out" render={(props) => <SignOut {...props} /> } /> */}
            {/* <Route exact path="/"> {this.state.user ? <Redirect to="/login" /> : <Redirect to="/home"/>}</Route> */}
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/renter_lease" component={RenterLease} />
            <Route exact path="/admin_leases" component={AdminLease} />
            <Route exact path="/renter_payment_history" component={RenterPaymentHistory} />
            <Route exact path="/admin_payment_history" component={AdminPaymentHistory} />
            <Route exact path="/logged_out" component={LoggedOut} />
            {/* <Route exact path="/"> <Redirect to="/login" /></Route> */}
            {/* <Route path="/login" component={Login} /> */}
            
            <Route exact path="/signin" render={(props) => <SignIn {...props} onStoreUser={this.storeUser} />} />
            <Route exact path="/create_account" render={(props) => <CreateAccount {...props} onStoreUser={this.storeUser} />} />

            {/* <Route exact path="/signin" component={SignIn} /> */}
            
            {/*<Route exact path="/create_account" component={CreateAccount} />     */}
          </Switch>
        </div>
      </Router>
    );
  }
}
