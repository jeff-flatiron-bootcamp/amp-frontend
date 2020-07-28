import React, { Fragment, PureComponent } from "react";

class PropertyAddress extends PureComponent {

  render() {
      debugger
    return (
      <Fragment>          
          <h3>User</h3>
          <h4>{this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf("/")+1)}</h4>
      </Fragment>
    );
  }
}

export default PropertyAddress
