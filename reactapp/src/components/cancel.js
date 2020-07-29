import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from './navbar';

function Cancel() {

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