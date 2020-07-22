import React, { Fragment } from "react";

class RenterLease extends React.Component {
  constructor() {
    super();
    this.URL = "http://localhost:3000/api/v1/";
    this.state = {
      info: "",
      firstNameOnLease: "",
      lastNameOnLease: "",
      apartment: "",
      start_date: "",
      end_date: "",
      firstMonthsRent: 0.0,
      securityDeposit: 0.0,
      lastMonthsRent: 0.0,
      balance: 0.0,
    };
  }

  handleGetLease = () => {
    let token = localStorage.getItem("token");
    let allPayments = [];
    fetch(`${this.URL}renter_get_lease`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          this.parseLeaseInformation(data);
        }
        //let infoPanel = `Request {profile-detail} = firstname{${data.user.firstname}} lastname{${data.user.lastname}} phone{${data.user_contact[0].phone}} email {${data.user_contact[0].email}} `
        //  let infoPanel = `Request{renter_get_lease} = primary_lease{${JSON.stringify(data.primary_lease)}}`
        //  this.setState({textAreaValue: `${infoPanel}`});
      });
  };

  parseLeaseInformation = (json) => {
    if (json.primary_lease) {
      this.setState({
        firstNameOnLease: json.user_on_lease.firstname,
        lastNameOnLease: json.user_on_lease.lastname,
        apartment: json.property_on_lease.apartment,
        start_date: json.primary_lease.start_date,
        end_date: json.primary_lease.end_date,
        firstMonthsRent: json.primary_lease.first_month_rent,
        lastMonthsRent: json.primary_lease.last_month_rent,
        securityDeposit: json.primary_lease.security_deposit,
        balance: json.primary_lease.balance,
      });
    }
  };

  componentDidMount() {
    this.handleGetLease();
  }

  render() {
    return (
      <Fragment>
        <div className="lease_container" display="flex">
          <h3>Renter Lease</h3>
          <br></br>                    
            <h4>Name on Lease: <label>{`${this.state.firstNameOnLease} ${this.state.lastNameOnLease}`}</label></h4>            
            <h4>Unit Number: <label>{`${this.state.apartment}`}</label></h4>
            <h4>Date Signed: <label>{`${this.state.start_date}`}</label></h4>
            <h4>Lease Ends: <label>{`${this.state.end_date}`}</label> </h4>
            <h4>First Month's Rent: <label>{`${this.state.firstMonthsRent}`}</label></h4>
            <h4>Last Month's Rent: <label>{`${this.state.lastMonthsRent}`}</label></h4>
            <h4>Security Deposit: <label>{`${this.state.securityDeposit}`}</label> </h4>           
            <h4>Balance: <label>{`${this.state.balance}`}</label></h4>          
        </div>
      </Fragment>
    );
  }
}

export default RenterLease;
