import React, {Component} from 'react';

// import logo from './logo.svg';
import '../style/navbar.css';

import {Button,Nav,Navbar,NavDropdown,Form,FormControl} from 'react-bootstrap';
class navbarLower extends Component{
render(){
    return(
      <div>

          <Navbar className='topNavbar'  expand="lg">
              <Nav.Link href="/login" className='Login'>Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
              <Nav.Link href="/">Dope</Nav.Link>
          </Navbar>

            <Navbar className='downNavbar' bg='dark' expand="lg">
              <Navbar.Brand href="/"  ><img src = 'logo.png' alt ='logo' className='logo'></img></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <Nav.Link href="/" >Home</Nav.Link>
              <Nav.Link href="/">Contact</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              </Nav>
              <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
              </Form>
              </Navbar.Collapse>
            </Navbar>
        </div>

    )
  }
}

export default navbarLower;
