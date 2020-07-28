import React from 'react';
import { Navbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function NavBar(props) {
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
        <Link to='/basket'>Panier{props.kittenFromStore.length > 0 ? '(' + props.kittenFromStore.length + ')' : ''  }</Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Link>History</Link>
      </Nav.Item> */}
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

function mapStateToProps(state) {
  return { kittenFromStore: state.basket }
}

export default connect(
    mapStateToProps,
    null
)(NavBar);