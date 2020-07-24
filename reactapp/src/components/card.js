import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../style/css/card.css'
function CardComponent(props) {

  return (
    
    <Card className='mb-4' >
    <Card.Img variant="top" src={props.kittyImg} height={384} />
    <Card.Body>
    <Card.Title>{props.kittyName}</Card.Title>
        <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
    </Card.Body>
    </Card>
  );
}

export default CardComponent;