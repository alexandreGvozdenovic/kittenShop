import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import Nav from './navbar';

function Cancel() {
    const token = localStorage.getItem('token');

    if(token === '' || token === null) {
        return(<Redirect to='/' />)
    }
  return (
      <Container>
          <Nav />
          <Row>
              La transaction n'a pas été effectué
          </Row>
      </Container>
  );
}
export default Cancel