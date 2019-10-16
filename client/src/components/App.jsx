import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import licDetails from './pages/licDetails'
import Secret from './pages/Secret'
import Login from './pages/Login'
import Navbar from './pages/navbar'
import Signup from './pages/Signup'
import Camera from './pages/camera'
import Admin from './pages/admin'
import Cart from './pages/cart'
import ShowBeers from './pages/allbeers'
import api from '../api'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      beers: [],
      cart: [],
      user: false,
      theCart: {},
    }
  }

  componentDidMount() {
    api
      .getBeers()
      .then(beers => {
        this.setState({
          beers: beers,
        })
      })
      .catch(err => console.log(err))
  }

  addToTheCart = (beer, amount) => {
    let theCart = { ...this.state.theCart }
    // let theCart = { ...this.state.theCart }
    theCart[beer] = amount
    this.setState({ theCart })

    api
      .addCart(theCart)
      .then(result => {
        console.log('SUCCESS!')
        //this.setState({ theCart })
      })
      .catch(err => this.setState({ message: err.toString() }))
    console.log(this.state.cart)
  }
  getUserStatus = () => {
    api
      .getUserState()
      .then(user => {
        this.setState({
          user: user,
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        <Navbar theCart={this.state.theCart} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin} />
          <Route
            path="/beers"
            component={props => (
              <ShowBeers
                {...props}
                beers={this.state.beers}
                addToCart={this.addToTheCart}
                theCart={this.state.theCart}
              />
            )}
          />
          />
          <Route
            path="/login"
            component={props => (
              <Login {...props} refresh={() => this.forceUpdate()} />
            )}
          />
          <Route
            path="/shopping-cart"
            component={props => (
              <Cart
                {...props}
                theCart={this.state.theCart}
                userStatus={this.state.user}
                // state={this.state}
                // state={this.state}
              />
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
