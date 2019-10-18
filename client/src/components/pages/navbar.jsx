import React, { Component } from 'react'
import api from '../../api'
import { Link, NavLink } from 'react-router-dom'

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
      <header className="container-fluid">
        <div className="row">
          <div className="col-7">
            <h1 className="App-title">eBeers</h1>
          </div>
          <div className="col-5 menu-links">
            <NavLink className="pl-1 pr-1" to="/" exact>
              Home
            </NavLink>
            <NavLink className="pl-1 pr-1" to="/beers">
              Beer Inventory
            </NavLink>
            {!api.isLoggedIn() && (
              <NavLink className="pl-1 pr-1" to="/signup">
                Signup
              </NavLink>
            )}
            {!api.isLoggedIn() && (
              <NavLink className="pl-1 pr-1" to="/login">
                Login
              </NavLink>
            )}
            {api.isLoggedIn() && (
              <Link
                className="pl-1 pr-1"
                to="/"
                onClick={e => this.handleLogoutClick(e)}
              >
                Logout
              </Link>
            )}

            <NavLink className="pl-1 pr-1" to="/shopping-cart">
              Cart
            </NavLink>
          </div>
        </div>
      </header>
    )
  }
}
