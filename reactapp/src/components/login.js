import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Form,  Button } from 'react-bootstrap';
import '../style/css/login.css'
import { connect } from 'react-redux'
function Login() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [userExists, setUserExists] = useState(false);
    const [errors, setErrors] = useState('')
    const emptyBasket = [];
    const handleSignUp = async (e) => {
        e.preventDefault();
        const data = await fetch('/sign-up',{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
        })
        const body = await data.json()
        console.log(body);
        if(body.result === true) {
            localStorage.setItem('token',body.token);
            localStorage.setItem('basket',JSON.stringify(emptyBasket));
            setUserExists(true)
        }
        if(body.error.length > 0) {
            var concatErrors = 'Liste des erreurs : '
            for (let i = 0 ; i < body.error.length ; i++) {
                concatErrors = concatErrors + body.error[i] +', '
            }
            setErrors(concatErrors.slice(0,concatErrors.length -2));
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        const data = await fetch('/sign-in',{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
        })
        const body = await data.json()
        console.log(body);
        if(body.result === true) {
            localStorage.setItem('token',body.token);
            localStorage.setItem('basket',JSON.stringify(emptyBasket));
            setUserExists(true)
            
        }
        if(body.error.length > 0) {
            var concatErrors = 'Liste des erreurs : '
            for (let i = 0 ; i < body.error.length ; i++) {
                concatErrors = concatErrors + body.error[i] +', '
            }
            setErrors(concatErrors.slice(0,concatErrors.length -2));
        }
    }
  
  if (userExists === true) {
      return ( <Redirect to='/shop' />)
  }

  return (
      <Container className='d-flex flex-column justify-content-center main-container'>
          <Row className='justify-content-center'>coucou</Row>
          <Row className='d-flex justify-content-around main-row'>
              {/* SIGN UP START */}
              <Col xs={{span:4}}>
              <p>SIGN UP</p>
              <Form>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Names</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder="First name" 
                        value={firstName} 
                        onChange={ (e) => setFirstName(e.target.value) }
                    />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Last Name"
                        value={lastName}
                        onChange={ (e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmailSignUp">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={signUpEmail}
                        onChange= { (e) => setSignUpEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPasswordSignUp">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={signUpPassword}
                        onChange={ (e) => setSignUpPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={ (e) => handleSignUp(e)}>
                    Submit
                </Button>
              </Form>
              {/* SIGN UP END */}
              </Col>
              
              {/* SIGN IN */}
              <Col xs={{span:4}}>
              <p>SIGN IN</p>

              <Form>
                <Form.Group controlId="formBasicEmailSignIn">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={signInEmail}
                        onChange= { (e) => setSignInEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPasswordSignIn">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={signInPassword}
                        onChange= { (e)=> setSignInPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={ (e) => handleSignIn(e)}>
                    Submit
                </Button>
              </Form>
              {/* SIGN IN END */}
              </Col>
          </Row>
          <Row className='justify-content-center error-row'>{errors}</Row>
      </Container>
  );
}

export default Login;