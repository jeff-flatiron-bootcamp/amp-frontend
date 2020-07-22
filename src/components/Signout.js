import React, { Fragment } from "react";

class SignOut extends React.Component {

  localFunction = () => {
    const { OnSignOut } = this.props
    debugger
  }
  componentDidMount() {
    console.log("SignOut componentDidMount")
  }

  render() {
    return (
      <Fragment>
          {this.localFunction()}
          <ul>
            <li>Does this work?</li>
          </ul>
      </Fragment>
    );
  }
}

export default SignOut//withRouter(SignOut);
