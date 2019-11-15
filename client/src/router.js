import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Home from './pages/Home'
import Items from './pages/Items'
import Profile from './pages/Profile'
import Share from './pages/Share'

export default () => (
  <Router>
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/welcome" component={Home} />
      <Route path="/share" component={Share} />
      <Route exact path="/" component={Items} />
    </Switch>
  </Router>
)
