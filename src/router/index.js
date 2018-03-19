import React from 'react'
import { 
  Route, 
  BrowserRouter as Router,
  Switch 
} from 'react-router-dom'
import asyncComponent from '../asyncComponent'
import history from '../common/history';

const Register = asyncComponent(() => import('../container/register'))

const Root = () => (
  <Router history={history}>
    <Switch>
      <Route path='/register' component={Register} />
    </Switch>
  </Router>
)

export default Root;