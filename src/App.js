import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Register from './Register'
import Home from './Home'

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
            </ul>
            <hr />
            <Route path="/" component={Home} />
            <Route path="/register" component={Register} />
        </div>
    </Router>
)

export default Sidebar;
