import React, { PureComponent, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';

class NotLoggedInNav extends PureComponent {

  renderLogin = () => {
    //const { history } = this.props;
      // this.props.history.push("/signin");

  }

  render() {
    return (   
      <Fragment> 
      <nav className="navbar flex-column">
        <h3 className="navbar-brand" to="/">
          AMP!                             
        </h3>               
        <h4>
          <NavLink style={{ color: "red" }} to="/signin">
            SignIn
          </NavLink>
        </h4>
        <h4>
          <NavLink style={{ color: "red" }} to="/create_account">
            Create Account
          </NavLink>
        </h4>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"></li>
          </ul>
        </div>
      </nav>   
      {this.renderLogin()}
      </Fragment> 
    );
  }
}

export default withRouter(NotLoggedInNav);
