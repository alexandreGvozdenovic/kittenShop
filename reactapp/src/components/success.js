import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from './navbar';
import { Redirect } from 'react-router-dom'

function Success() {
    const token = localStorage.getItem('token');
    if(token === '' || token === null) {
        return(<Redirect to='/' />)
    }
  return (
      <Container>
          <Nav />
          <Row>
              La transaction a été effectué avec succès
          </Row>
      </Container>
  );
}
export default Success