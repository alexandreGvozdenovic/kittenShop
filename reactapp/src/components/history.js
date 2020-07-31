import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import Nav from './navbar';

function History() {
    const token = localStorage.getItem('token');
    const [history, setHistory] = useState([])
    useEffect(() => {
        const loadHistory = async () => {
            const token = localStorage.getItem('token');
            const data = await fetch(`/load-history?tokenFromFront=${token}`);
            const body = await data.json()
            setHistory(body);
        }
        loadHistory();
    }, [])

    const orderDetails = history.map((item) => {
        return (
            <tr>
                <td><img src={item.imgUrl} alt={item.name} width={128} /></td>
                <td className='align-middle'>{item.name}</td>
                <td className='align-middle'>{item.price}</td>
            </tr>
        )
    })

    if(token === '' || token === null) {
        return(<Redirect to='/' />)
    }
    if(history.length === 0) {
        return (
            <Container>
            <Nav />
            <Row>
                No orders yet
            </Row>
        </Container>
        )
    }
  return (
      <Container>
          <Nav />
          <Row>
              Your latest orders
          </Row>
          <Row>
          <Table striped hover className='text-center'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails}
              </tbody>
            </Table>
          </Row>

      </Container>
  );
}
export default History;