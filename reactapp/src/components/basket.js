import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './navbar';
import '../style/css/basket.css'

function Basket(props) {
  var sumPrice = 0;
  console.log(props.kittensFromStore);
  const handleClick = (id,price) => {
    props.removeKitty(id);
  }
  var kittyBasket = props.kittensFromStore.map((kitty,i) => {
    sumPrice += kitty.price;
    return(
      <tr>
        <td><img src={kitty.imgUrl} width={128} /></td>
        <td className='align-middle'>{kitty.name}</td>
        <td className='align-middle'>{kitty.price}</td>
        <td className='align-middle'><i className="fas fa-times" style={{cursor: 'pointer'}} onClick={() => handleClick(kitty.id)}></i></td>
      </tr>
    )
})
console.log(sumPrice);


    // if(props.tokenFromStore === '') {
    //     return(<Redirect to='/' />)
    // }
  return (
      <Container>
          <Nav />
          <Row>
            Items in your basket
          </Row>
          <Row>
            <Table striped hover className='text-center'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {kittyBasket}
              </tbody>
            </Table>
          </Row>
          <Row className='justify-content-end align-items-center'> Total Price: {sumPrice}€ <Button>Checkout</Button></Row>
      </Container>
  );
}

function mapStateToProps(state) {
    return { 
      tokenFromStore: state.token,
      kittensFromStore: state.basket
    }
  }

function mapDispatchToProps(dispatch) {
    return {
      removeKitty: function(kittyIdFromFront) { 
          dispatch( {type: 'removeKitty', kittyId: kittyIdFromFront} ) 
      }
    }
  }
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
  )(Basket);