import React from 'react';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';
import Nav from './navbar';
const stripePromise = loadStripe('pk_test_SxRbDOfbYdtVZE3lyuDPbqJT00BRRUnLAK');


function Basket(props) {
  const token = localStorage.getItem('token');
  const basket = JSON.parse(localStorage.getItem('basket'));
  var sumPrice = 0;

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
        <td><img src={kitty.imgUrl} alt={kitty.name} width={128} /></td>
        <td className='align-middle'>{kitty.name}</td>
        <td className='align-middle'>{kitty.price}</td>
        <td className='align-middle'><i className="fas fa-times" style={{cursor: 'pointer'}} onClick={() => handleClick(kitty.id)}></i></td>
      </tr>
    )
})
  if(token === '' || token === null) {
    return(<Redirect to='/' />)
  }
  if(kittyBasket.length === 0) {
    return (
      <Container>
        <Nav />
        <Row>
          No items in your basket
        </Row>
      </Container>
    )
  } else {
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
          <Row className='mt-4'>
            <p>
              If you want to try the checkout use <strong>4242424242424242</strong> as card number and whatever you want for email, dates, cvc and name.
            </p>
          </Row>
      </Container>
  );
  }
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