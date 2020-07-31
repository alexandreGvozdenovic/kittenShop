import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../style/css/card.css'
import { connect } from 'react-redux'
function CardComponent(props) {

  const handleClick = () => {
    let kitty = {
      id: props.kittyId,
      age: props.kittyAge,
      available: props.kittyAvailable,
      imgUrl: props.kittyImg,
      name: props.kittyName,
      price: props.kittyPrice
    }
    // Add kitty in REDUX STORE
    props.addKitty(kitty);
    // Add kitty in Local Storage
    var localStorageBasket = JSON.parse(localStorage.getItem('basket'));
    var index = localStorageBasket.findIndex( element => element.id === kitty.id);
    if(index === -1){
      localStorageBasket.push(kitty);
      localStorage.setItem('basket',JSON.stringify(localStorageBasket));
    }
  }
  return (
    
    <Card className='mb-4' >
    <Card.Img variant="top" src={props.kittyImg} height={384} />
    <Card.Body>
  <Card.Title>{props.kittyName} {props.kittyAge}</Card.Title>
        <Card.Text>
        Cat ipsum dolor sit amet, milk the cow reward the chosen human with a slow blink do i 
        like standing on litter cuz i sits when i have spaces, my cat buddies have no litter 
        i live in luxury cat life missing until dinner time.
        <br/>(Thanks catipsum : <a href='http://www.catipsum.com/index.php' target='_blank' rel="noopener noreferrer">link</a>)
        </Card.Text>
        <Card.Text className='text-right'>
          Price : {props.kittyPrice} <Button variant="primary" disabled={props.kittyAvailable === true ? false : true} onClick={() => handleClick()}>{props.kittyAvailable === true ? 'Buy' : 'Taken'}</Button>
        </Card.Text>
    </Card.Body>
    </Card>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addKitty: function(kittyFromFront) { 
        dispatch( {type: 'addKitty',kitty: kittyFromFront} ) 
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(CardComponent);
