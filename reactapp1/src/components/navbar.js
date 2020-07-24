import React from 'react';
import { Navbar, Nav} from 'react-bootstrap'

function NavBar() {
  return (
    <Navbar expand='lg'>
    <Navbar.Brand >
    <span>
        Kitty shop
    </span>
    </Navbar.Brand>
    <Navbar.Toggle>Menu</Navbar.Toggle>
    <Navbar.Collapse className='justify-content-center' >
    <Nav className='justify-content-around' style={{width: '70%'}}>
      <Nav.Item>
        A propos
      </Nav.Item>
      <Nav.Item>
        Projets
      </Nav.Item>
      <Nav.Item>
        Contact
      </Nav.Item>
      <Nav.Item>
        CV
      </Nav.Item>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default NavBar;