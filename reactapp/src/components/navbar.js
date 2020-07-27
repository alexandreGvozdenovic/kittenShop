import React from 'react';
import { Navbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <Navbar expand='lg'>
    <Navbar.Brand >
      <Link to='/shop'>    
      <span>
        Kitty shop
      </span>
    </Link>
    </Navbar.Brand>
    <Navbar.Toggle>Menu</Navbar.Toggle>
    <Navbar.Collapse className='justify-content-center' >
    <Nav className='justify-content-around' style={{width: '70%'}}>
      <Nav.Item>
        <Link to='/shop'>Shop</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to='/basket'>Panier</Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Link>History</Link>
      </Nav.Item> */}
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default NavBar;