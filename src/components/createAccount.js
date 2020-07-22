import React, { Component, Fragment } from "react";

export default class CreateAccount extends Component {
    constructor(){
        super()
        this.URL = "http://localhost:3000/api/v1/";
        this.state = {
            nameSignup: "",
            passwordSignup: "",
        };
      }

  handleCreateUser = (event) => {
    event.preventDefault();
    fetch(`${this.URL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: this.state.nameSignup,
          password: this.state.passwordSignup,
        },
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        console.log(json);

        if (json.status == 200) {
          localStorage.setItem("token", json.jwt);
          // this.storeToken(json)      
          
          this.props.onStoreUser(json.user)
          if (json.user.admin) {
            this.props.history.push("/profile");
          } else {
            this.props.history.push("/profile");
          }
        }
      });//(json) => this.storeToken(json));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="col-md-6 login-form-2">
        <h3>AMP-Signup!</h3>
        <form onSubmit={this.handleCreateUser}>
          <div className="form-group">
            <input
              name="nameSignup"
              type="text"
              className="form-control"
              placeholder="User Name"
              value={this.state.nameSignup}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              name="passwordSignup"
              type="password"
              className="form-control"
              placeholder="Your Password *"
              value={this.state.passwordSignup}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Create Account" />
          </div>
        </form>
      </div>
    );
  }
}
