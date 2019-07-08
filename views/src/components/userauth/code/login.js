import React,{Component} from 'react';
import {Form,Button,Row} from 'react-bootstrap';
import '../style/login.css';
import FlashMessage from 'react-flash-message';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password: '',
      isError:false,
      errorMessage:'Error SomeWhere'
    }

    //this.getStat = this.getStat.bind(this);
    this.login = this.login.bind(this);
  }
  login(){
    console.log('this is login function')
  }

  getStat=()=>{
    if(this.state.isError){
      return(
        <div class="alert alert-danger" variant='danger' role="alert">
          {this.state.errorMessage}
        </div>
      );
    }
    else{
      return null;
    }
  }

  handlelogin=(e)=>{
    e.preventDefault();
    console.log("from Here");
    console.log(this.state.username+"   and    "+this.state.password);
    let formData = new FormData();    //formdata object

    formData.append('email', this.state.username);   //append the values with key, value pair
    formData.append('password', this.state.password);
    const URL = 'http://192.168.10.5:3000/users/login';
    fetch(URL,{
            method: 'POST',
            headers: {
               Accept: 'application/json',
            },
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson.status == 'error'){
            this.setState({
              isError:true,
              errorMessage:responseJson.message
            });
          }

          if(responseJson.status == 'success')
          {
            if(responseJson.verify == 'no'){
              this.props.navigation.navigate('verifyuser',{
                userId:responseJson.userid,
                token:responseJson.verificationtoken,
                jwtToken:responseJson.jwttoken,
                email:this.state.email,
                password:this.state.password
              });
            }

            if(responseJson.verify == 'yes'){
              alert(responseJson.success);
              // (async()=>{
              //   try {
              //     await AsyncStorage.setItem('userid', responseJson.userid);
              //     await AsyncStorage.setItem('jwttoken', responseJson.jwttoken);
              //   } catch (e) {
              //     // saving error
              //     console.log(e);
              //   }
              // })();

              this.props.navigation.navigate('HomeTabNavigator',{
                userId:responseJson.userid,
                token:responseJson.verificationtoken
              });
            }
          }
          })
        .catch((error) =>{
          console.error(error);
        });
    }

  render(){
    return(
      <Row className='justify-content-md-center'>
        <Form>
          <h3> This is login page </h3>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(event)=> {
              this.setState({username: event.target.value,isError:false});
            }} />

          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(event)=> {
              this.setState({password: event.target.value,isError:false});
            }} />
          </Form.Group>

          {this.getStat()}
          
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handlelogin}>
            Submit
          </Button>
      </Form>
    </Row>
    )
  }
}

export default Login;
