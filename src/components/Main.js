import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home'
import Register from '../Register'
import Profile from '../Profile'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/register' component={Register}/>
      <Route path='/profile' component={Profile}/>
    </Switch>
  </main>
)

export default Main
