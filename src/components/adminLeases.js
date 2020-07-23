import React, { Fragment } from "react";
import './adminLeases.css';

class AdminLeases extends React.Component {
  constructor(props) {
    super(props);
    this.URL = "http://localhost:3000/api/v1/";
    this.state = {
      active: true,
      numberOfGuests: 2,
      leases: [

        // { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
        // { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
        // { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
        // { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
      ],
      filteredLeases: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'active' ? target.checked : target.value;
    const name = target.name;

    this.filterTables(value)
    
    this.setState({
      [name]: value
    });    
  }

  filterTables(currValue)
  {
    if(currValue == true)
    {
      let filteredLeasesTemp = this.state.leases.filter(lease => lease.status == true)
      this.setState({
        filteredLeases: filteredLeasesTemp        
      })
    }
    else
    {      
      let filteredLeasesTemp = this.state.leases.filter(lease => lease.status == false)
      this.setState({
        filteredLeases: filteredLeasesTemp        
      })
    }
  }

  renderTableHeader() {      
      
    if(this.state.filteredLeases.length > 0)
    {
       
       let header = Object.keys(this.state.filteredLeases[0])
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
  }


  renderTableData() {            
    //return this.state.leases.map((lease, index) => {
       
      return this.state.filteredLeases.map((lease, index) => {
       //const { id, name, age, email } = lease //destructuring
       //const { id, balance, lease_type_id, monthly_rent_price, property_security_deposit } = lease //destructuring

       const {id,	user_id,	lease_type_id,	status, monthly_rent_price, balance, property_address_id,
         created_at, updated_at, start_date, end_date, first_month_rent, last_month_rent, security_deposit } = lease
       return (
           <tr key={id}>
              <td>{id}</td>
              <td>{user_id}</td>
              <td>{lease_type_id}</td>
              <td>{status.toString()}</td>
              <td>{monthly_rent_price}</td>
              <td>{balance}</td>
              <td>{property_address_id}</td>
              <td>{created_at}</td>
              <td>{updated_at}</td>
              <td>{start_date}</td>
              <td>{end_date}</td>
              <td>{first_month_rent}</td>
              <td>{last_month_rent}</td>              
              <td>{security_deposit}</td>
           </tr>
       )
    })
    }

    componentDidMount(){
      let token = localStorage.getItem('token');   
      let allLeases = []; 
      fetch(`${this.URL}admin_get_all_leases`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, 
        }             
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        //console.log(data.info)
        if(data.leases){
          allLeases = data.leases.map((lease) =>
          {
            return lease;
          });
        }
        //debugger
        console.log(allLeases)
        this.setState({
          leases: allLeases,
      });
      this.filterTables(!this.state.value);
      })
    }

    handleNewLease = () => {           
      this.props.history.push("/admin_new_lease");
    }


  render() {
    return (
      <Fragment>          
        <div className="lease_container" display="flex">
          <h3>Admin Leases</h3>             
            <br></br>         
             <button onClick={this.handleNewLease}>New Lease</button>
            
            <br></br>
            <br></br>
            <label>Active/Terminated</label>
            <br></br>
          <input
            name="active"
            type="checkbox"
            checked={this.state.active}
            onChange={this.handleInputChange} />         

          <table id='filteredLeases'>
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

export default AdminLeases
