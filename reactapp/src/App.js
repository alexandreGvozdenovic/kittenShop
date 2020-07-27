import React from 'react';
// React router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// My components
import Login from './components/login';
import Shop from './components/shop';
import Basket from './components/basket';
// Redux
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import token from './reducers/token.reducer'
import basket from './reducers/basket.reducer'
const store = createStore(combineReducers({token, basket}))


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/shop' component={Shop} />
          <Route path='/basket' component={Basket} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
