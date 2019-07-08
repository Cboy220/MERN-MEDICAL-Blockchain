import React,{ Component} from 'react'
import {Nav,Navbar,Link} from 'react-bootstrap'

class NavbarUpper extends Component{
  render()
    {
      return(

        <Navbar className='topNavbar'  expand="lg">
            <Nav.Link href="/login" className='Login'>Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/">Dope</Nav.Link>
        </Navbar>

      )
    }

}
 export default NavbarUpper
