import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import Nav from './navbar';
import Card from './card'

function Shop(props) {

    const [kittenArray, setKittenArray] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        var loadKittens = async () => {
            const data = await fetch('/load-kittens');
            const body = await data.json()
            setKittenArray(body.kittens);
        }
        loadKittens();
    }, [])

    var cardsKitty = kittenArray.map((kitty,i) => {
        return(
            <Col xs={6} key={i}>
                <Card 
                    kittyId={kitty._id}
                    kittyName={kitty.name} 
                    kittyAge={kitty.age}
                    kittyAvailable={kitty.available} 
                    kittyPrice={kitty.price}
                    kittyImg={kitty.imgUrl}
                />
            </Col>
        )
    })

    if(token === '' || token === null) {
        return(<Redirect to='/' />)
    }
  return (
      <Container>
          <Nav />
          <Row className='justify-content-center mt-4'>
              <p className='text-center'>Welcome to the Kitty Shop this is a fake e-shop made by <a href='https://alexandregvozdenovic.com/' target='_blank' rel='noopener noreferrer'>me</a>.
              <br/>Please think about adopting before buying pets !</p>
          </Row>
          <Row className='mt-4'>
              {cardsKitty}
          </Row>
      </Container>
  );
}

export default Shop;