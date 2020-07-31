import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Nav from './navbar';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function Success(props) {

    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const addOrderToHistory = async () => {
            const basket = localStorage.getItem('basket');
            const sendToken = localStorage.getItem('token');
            await fetch('/success',{
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `basketFromFront=${basket}&tokenFromFront=${sendToken}`
            })
        }
        addOrderToHistory();
        props.resetBasket();
        localStorage.setItem('basket',JSON.stringify([]))
    }, [])
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
function mapStateToProps(state) {
    return { kittensFromStore: state.basket }
  }

function mapDispatchToProps(dispatch) {
    return {
      resetBasket: function() { 
          dispatch( {type: 'resetBasket'} ) 
      }
    }
  }
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
  )(Success);