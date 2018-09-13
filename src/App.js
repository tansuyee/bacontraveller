import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import Profile from './Profile'

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
            </ul>
            <hr />
            <Route path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
        </div>
    </Router>
)

export default Sidebar;
