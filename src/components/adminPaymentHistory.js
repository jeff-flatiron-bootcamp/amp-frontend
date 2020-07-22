import React, { Fragment } from "react";
import './adminPaymentHistory.css';

class AdminPaymentHistory extends React.Component {

  constructor(props) {
    super(props);
    this.URL = "http://localhost:3000/api/v1/";
    this.state = {
      active: true,      
      payments: [],
      selectedUser: {},
      users: []
    };    
  }

  adminGetAllUsers = () => {
      let token = localStorage.getItem('token');   
      let allUsers = []; 
      fetch(`${this.URL}admin_get_all_users`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, 
        }             
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)        
        if(data.users){
          allUsers = data.users.map((renter) =>
          {
            return renter;
          });
        }
        console.log(allUsers)
        this.setState({
          users: allUsers,
      });
      })
  }

  adminGetPaymentHistoryForUser = () => {
    let token = localStorage.getItem('token');   
    let allPayments = []; 
    fetch(`${this.URL}admin_get_payment_history_for_renter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: this.state.selectedUser
      })
    })
    .then(res => res.json())
    .then(data => {
       console.log(data) 
       if(data.payment_history){
        allPayments = data.payment_history.map((payment) =>
        {
          return payment;
        });
      }       
       this.setState({
        payments: allPayments
       })          
       //let infoPanel = `Request {profile-detail} = firstname{${data.user.firstname}} lastname{${data.user.lastname}} phone{${data.user_contact[0].phone}} email {${data.user_contact[0].email}} `
      //  let infoPanel = `Request{renter_get_payment_history} = payment_history{${JSON.stringify(data.payment_history)}}`
      //  this.setState({textAreaValue: `${infoPanel}`});
      
    })
  }

  populateUsers = () => {
    return this.state.users.map((user) => <option key={user.id} value={user.id}>{`${user.id}-${user.username}-${user.firstname} ${user.lastname}`}</option>)
  }

  handleUserSelection = (e) => {
    this.setState({selectedUser:e.target.value}, this.adminGetPaymentHistoryForUser());    
  }

  renderTableHeader() {            
    if(this.state.payments.length > 0)
    {       
       let header = Object.keys(this.state.payments[0])
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
  }


  renderTableData() {                  
      return this.state.payments.map((payment, index) => {       

       const {id,	lease_id,	amount, created_at, updated_at } = payment
       return (
           <tr key={id}>
              <td>{id}</td>
              <td>{lease_id}</td>
              <td>{amount}</td>
              <td>{created_at}</td>
              <td>{updated_at}</td>
           </tr>
       )
    })
    }

  componentDidMount(){
    this.adminGetAllUsers();
    //this.adminGetAllPayments();
  }

  userCheck()
  {
    if(this.state.users)
    {
      return this.state.users.count > 0 ? true : false      
    }
    return false;
  }

  render() {
    return (
      <Fragment>  
        <div className="lease_container" display="flex" flex-direction="column">
          <h3>Payment History</h3>                              
          <select value={this.state.selected_user} onChange={this.handleUserSelection}>{this.populateUsers()}</select>    
          <br></br>     
          <table id='payments'>
             <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
             </tbody>
          </table>
          </div>     
      </Fragment>
    );
  }
}

export default AdminPaymentHistory
