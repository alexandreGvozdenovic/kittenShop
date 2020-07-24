import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from './navbar';
import Card from './card'

function Shop() {
    const dataKitty = [
        {
            name: 'Kitty 1',
            age: '6 months',
            available: true,
            price: 200,
            imgUrl: './kittens/cat_4.jpg'
        },
        {
            name: 'Kitty 2',
            age: '5 months',
            available: true,
            price: 250,
            imgUrl: './kittens/cat_5.jpg'
        },
        {
            name: 'Kitty 3',
            age: '7 months',
            available: true,
            price: 100,
            imgUrl: './kittens/cat_7.jpg'
        },
        {
            name: 'Kitty 4',
            age: '4 months',
            available: true,
            price: 150,
            imgUrl: './kittens/cat_8.jpg'
        },
    ]

    var cardsKitty = dataKitty.map((kitty,i) => {
        return(
            <Col xs={6} key={i}>
                <Card 
                    kittyName={kitty.name} 
                    kittyAge={kitty.age} 
                    kittyAvailable={kitty.available} 
                    kittyPrice={kitty.price}
                    kittyImg={kitty.imgUrl}
                />
            </Col>
        )
    })
  return (
      <Container>
          <Nav />
          <Row>
              {cardsKitty}
          </Row>
          
      </Container>
  );
}

export default Shop;