import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Profile from '../Profile';
import CountryListing from './CountryListing';
import ItemListing from './ItemListing';
import ItemDetail from './ItemDetail';
import CreateRequest from '../CreateRequest';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/profile' component={Profile}/>
      <Route path="/country-listing" component={CountryListing} />
      <Route path="/item-listing/:country" component={ItemListing} />

      <Route path="/item-detail/:id" component={ItemDetail} />
      <Route path='/create-request' component={CreateRequest} />
    </Switch>
  </main>
)

export default Main;
