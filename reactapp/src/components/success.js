import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from './navbar';

function Success() {

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