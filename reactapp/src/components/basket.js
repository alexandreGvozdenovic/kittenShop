import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';
import Nav from './navbar';
import '../style/css/basket.css'
const stripePromise = loadStripe('pk_test_SxRbDOfbYdtVZE3lyuDPbqJT00BRRUnLAK');


function Basket(props) {
  const token = localStorage.getItem('token');
  const basket = JSON.parse(localStorage.getItem('basket'));
  var sumPrice = 0;
  console.log(props.kittensFromStore);

  const handleClick = (id) => {
    // Remove kitty from Redux Store
    props.removeKitty(id);
    // Remove kitty from local Storage
    let basketCopy = [...basket];
    let index = basket.findIndex( element => element.id === id);
    basketCopy.splice(index,1);
    localStorage.setItem('basket',JSON.stringify(basketCopy));
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    let kittens = JSON.stringify(props.kittensFromStore);
    const data = await fetch('/buy',{
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `kittensFromFront=${kittens}`
  })
  const body = await data.json()
  console.log(body);
  console.log('Session ID ===>')
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    sessionId : body.id,
  });
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `error.message`.
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


  if(token === '' || token === null) {
    return(<Redirect to='/' />)
  }
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
          <Row className='justify-content-end align-items-center'> Total Price: {sumPrice}€ <Button onClick={(e) => handleCheckout(e)}>Checkout</Button></Row>
      </Container>
  );
}

function mapStateToProps(state) {
    return { kittensFromStore: state.basket }
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