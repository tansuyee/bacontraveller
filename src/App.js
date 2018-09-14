import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import Profile from './Profile'
import CountryListing from './CountryListing'
import ItemListing from './ItemListing'
import ItemDetail from './ItemDetail';

const Sidebar = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/country-listing">Country Listing</Link>
                </li>
                <li>
                    <Link to="/item-listing">Item Listing</Link>
                </li>
                <li>
                    <Link to="/item-detail">Item Detail</Link>
                </li>
            </ul>
            <hr />
            <Route path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/country-listing" component={CountryListing} />
            <Route path="/item-listing" component={ItemListing} />
            <Route path="/item-detail" component={ItemDetail} />
        </div>
    </Router>
)

export default Sidebar;
