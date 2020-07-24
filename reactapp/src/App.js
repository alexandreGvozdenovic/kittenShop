import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/login';
import Shop from './components/shop';
import Basket from './components/basket';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/shop' component={Shop} />
        <Route path='/basket' component={Basket} />
      </Switch>
    </Router>
  );
}

export default App;
