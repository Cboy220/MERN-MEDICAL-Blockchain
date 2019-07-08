import React,{Component} from 'react';
import {Form,Button,Col, Row, Container} from 'react-bootstrap';
import '../style/signup.css'
class Signup extends Component{
  render(){
    return(
      <Container>
          <Form className='justify-content-md-center'>
            <h3> This is signup page </h3>
            <Row>
              <Col>
                <Form.Group  controlId="formGridEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="email" placeholder="Enter your first name" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group  controlId="formGridPassword">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="password" placeholder="Enter your last name" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group  controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group  controlId="formGridShopName">
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control placeholder="Enter your ShopName" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group  controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group  controlId="formGridPassword">
                  <Form.Label> Verify Password</Form.Label>
                  <Form.Control type="password" placeholder="Re-Enter Password" />
                </Form.Group>
              </Col>
            </Row>


            <Row>
              <Col>
                <Form.Group  controlId="formGridPan no">
                  <Form.Label>Pan No</Form.Label>
                  <Form.Control placeholder="Enter your shop PAN" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group  controlId="formGridCity">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="Select your Address" />
                </Form.Group>
              </Col>
            </Row>

              <Form.Group  controlId="formGridState">
                <Form.Label>Province</Form.Label>
                <Form.Control as="select">
                  <option>Choose...</option>
                  <option>Bagmati</option>
                  <option>Lumbini</option>
                  <option>Madhesh</option>
                  <option>Pahad</option>
                  <option>Himal</option>
                </Form.Control>
              </Form.Group>

              <Form.Group  controlId="tole">
                <Form.Label>Tole</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            </Container>
    )
  }
}

export default Signup;
