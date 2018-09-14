import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Register from '../Register';
import Profile from '../Profile';
import CountryListing from '../CountryListing';
import ItemListing from '../ItemListing';
import ItemDetail from '../ItemDetail';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/register' component={Register}/>
      <Route path='/profile' component={Profile}/>
      <Route path="/country-listing" component={CountryListing} />
      <Route path="/item-listing" component={ItemListing} />
      <Route path="/item-detail" component={ItemDetail} />
    </Switch>
  </main>
)

export default Main
