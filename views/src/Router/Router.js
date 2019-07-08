import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import NavbarUpper from '../components/home/code/navbar.upper';
import NavbarLower from '../components/home/code/navbar.lower';
import Footer from '../components/static/code/footer';
import Header from '../components/static/code/Header';
import Carousel from '../components/carousel/code/carousel';
import Login from '../components/userauth/code/login';
import Signup from '../components/userauth/code/signup';
import Landing from '../components/Landing/code/landingpage';


class Routero extends Component{
  render(){
    return(
      <Router>
          <div>
            <Header />
            <Route  exact path='/' component={Footer,NavbarLower, Carousel} />
            <Route  path='/login' component={Login}/>
            <Route  path='/signup' component={Signup}/>
            <Route path ='/landing' component={Landing}/>
            <Footer/>
          </div>
      </Router>
    );
  }
}

export default Routero;
