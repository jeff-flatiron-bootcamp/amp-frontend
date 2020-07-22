import React, { Component } from "react";

class SignIn extends Component {
  state = {
    nameLogin: "",
    passwordLogin: "",
  };

  handleLogin = (event) => {
    event.preventDefault();
    const { nameLogin, passwordLogin } = this.state;
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: nameLogin,
          password: passwordLogin,
        },
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        console.log(json);
        
        if (json.status == 200) {
        
          localStorage.setItem("token", json.jwt);
          // this.storeToken(json)      
          localStorage.setItem("user", JSON.stringify(json.user));
          this.props.onStoreUser(json.user)
          if (json.user.admin) {
            this.props.history.push("/profile");
          } else {
            this.props.history.push("/profile");
          }
        }
      });
  };


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount() {
    //debugger
  }

  render() {
    return (
      <div className="col-md-6 login-form-1">
        <h3>AMP-Login!</h3>
        <form onSubmit={this.handleLogin}>
          <div className="form-group">
            <input
              name="nameLogin"
              type="text"
              className="form-control"
              placeholder="User Name"
              value={this.state.nameLogin}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="passwordLogin"
              type="password"
              className="form-control"
              placeholder="Your Password *"
              value={this.state.passwordLogin}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Sign In" />
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
