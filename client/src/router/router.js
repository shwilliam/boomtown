import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import {Welcome, Items, User, Share} from '../pages'

// TODO: 404 fallback

export default () => (
  <Router>
    <Switch>
      <Route path="/welcome" component={Welcome} />
      <ProtectedRoute path="/profile" component={User} />
      <ProtectedRoute path="/user/:id" component={User} />
      <ProtectedRoute path="/share" component={Share} />
      <ProtectedRoute exact path="/" component={Items} />
    </Switch>
  </Router>
)
