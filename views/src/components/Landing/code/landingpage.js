import React, {Component} from 'react';
import {Form,Button,Row} from 'react-bootstrap';
import '../style/landingpage.css';

export default class Landing extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userType:''
    };
  }
  render(){
    return(
      <div className='contain'>
        <div className = 'button'>
          <Button variant="primary" type="submit" onClick={()=>{this.setState({userType:"customer"});console.log(this.state.userType)}}>
            Continue as Customer
          </Button>
        </div>

        <div className = 'button'>
          <Button variant="primary" type="submit" onClick={()=>{this.setState({userType:"seller"});console.log(this.state.userType)}}>
            Continue as Seller
          </Button>
        </div>
      </div>
    )
  }
}
