import React, { Component } from 'react'
import api from '../../api'
import { Route, Link, NavLink, Switch } from 'react-router-dom'

export default class navbar extends Component {
  handleLogoutClick(e) {
    api
      .logout()
      .then(message => {
        this.forceUpdate()
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">MERN Boilerplate</h1>
        <NavLink to="/" exact>
          Home
        </NavLink>
        {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
        {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
        {api.isLoggedIn() && <NavLink to="/camera">Camera</NavLink>}
        {api.isLoggedIn() && (
          <Link to="/" onClick={e => this.handleLogoutClick(e)}>
            Logout
          </Link>
        )}
        <NavLink to="/secret">Secret</NavLink>
      </header>
    )
  }
}
