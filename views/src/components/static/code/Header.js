import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button,Navbar,Container, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl } from 'react-bootstrap';
import { Column, Row } from 'simple-flexbox';
import '../style/Header.css';

export default class Header extends Component{
  render(){
    return(
      <div>
        <Navbar style={{height: 35}} bg="light" variant="light">
        <Container>
            <Nav className="ml-auto">
              <Nav.Link>
                <Link to="/about" className="navItem">ABOUT US</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/topics" className="navItem">CONTACT US</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/topics" className="navItem">FEATURE YOUR BUSINESS</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/topics" className="navItem">DELIVERY LOCATION</Link>
              </Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Container>
        <Row verticle='center' flexGrow = {1}>
          <Column flexGrow={1} horizontal='center'>
            <img
              alignSelf='start'
              alt=""
              src={require("../../Img/newphoto.png")}
              width="300"
              height="100"
              className="d-inline-block align-top"
            />
          </Column>
          <Column flexGrow={1} verticle='center' horizontal='center' justifyContent='center'>
            <Form inline>
              <FormControl style={{ margin: 0}} type="text" placeholder="Book Name" className="mr-sm-2" />
              <Button style={{ marginLeft: '-5em'}} >Search</Button>
            </Form>
          </Column>

          <Column flexGrow={0.5} horizontal='center' justifyContent='center'>
            <img
              alignSelf='start'
              alt=""
              src={require("../../Img/cart.png")}
              width="45"
              height="45"
              className="d-inline-block align-top"
            />
          </Column>

          <Column horizontal='center' justifyContent='center'>
            <img
              alignSelf='start'
              alt=""
              src={require("../../Img/user.png")}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />
          </Column>

          </Row>

        </Container>
      </div>

    );
  }
}
