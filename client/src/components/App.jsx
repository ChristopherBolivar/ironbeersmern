import React, { Component } from 'react'
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Countries from './pages/Countries'
import AddCountry from './pages/AddCountry'
import licDetails from './pages/licDetails'
import Secret from './pages/Secret'
import Login from './pages/Login'
import Navbar from './pages/navbar'
import Signup from './pages/Signup'
import Camera from './pages/camera'
import api from '../api'
import logo from '../logo.svg'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/countries" component={Countries} />
          <Route path="/add-country" component={AddCountry} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/login"
            component={props => (
              <Login {...props} refresh={() => this.forceUpdate()} />
            )}
          />
          <Route path="/secret" component={Secret} />
          <Route path="/camera" component={Camera} />
          <Route path="/lic-details" component={licDetails} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    )
  }
}
