import React, { Fragment, PureComponent } from "react";
import NotLoggedInNav from "./notLoggedInNav";
import AdminNav from "./adminNav";
import RenterNav from "./renterNav";

class ConditionalNavBar extends PureComponent {
  renderNotLoggedInNav = () => {
    //let result = this.props.existingTokenCheck();

    // const {signOutHandler, user} = this.props
    // let result = localStorage.getItem("token")
    // console.log("The value of token check = ")
    // console.log(result);
    // console.log("End token check")
     
     
    return (
      <Fragment>
        <NotLoggedInNav />        
      </Fragment>
    );
  };

  renderLoggedInNav = () => {
    
    let localStorageUser = JSON.parse(localStorage.getItem('user'))
    
    //if (this.props.user.admin) {
    if(localStorageUser.admin){
      return (
        <Fragment>
          <AdminNav onSignOut={this.props.signOutHandler} />
        </Fragment>
      );
    }
    else
    {
      return (
          <Fragment>
            <RenterNav onSignOut={this.props.signOutHandler} />
          </Fragment>
        );
    }
  };

  tokenInStorage = () => {
    //debugger
    if(localStorage.getItem("token") && (localStorage.getItem("token") != "undefined" ))
    {
      return true
    }
    return false
  }

  render() {
    console.log("hello");
    return (
      <>
       {/* {this.props.user.id ? this.renderLoggedInNav() : this.renderNotLoggedInNav()} */}
       {this.tokenInStorage() ? this.renderLoggedInNav() : this.renderNotLoggedInNav()}
      </>
    );
  }
}

export default ConditionalNavBar;
