import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'
import Items from '../pages/Items'
import Profile from '../pages/Profile'
import Share from '../pages/Share'

export default () => (
  <Router>
    <Switch>
      <Route path="/welcome" component={Home} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/share" component={Share} />
      <ProtectedRoute exact path="/" component={Items} />
    </Switch>
  </Router>
)
