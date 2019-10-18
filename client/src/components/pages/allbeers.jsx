import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import api from '../../api'

export default class allbeers extends Component {
  state = {
    quantity: [],
    beers: [],
    cart: [],
    reload: true,
  }

  checkLog = (beer, quantity) => {
    let amount
    this.state.quantity.forEach(e => {
      if (e[1] === beer.name) {
        amount = e[0]
      }
    })
    console.log(quantity, this.state)
    if (api.isLoggedIn()) {
      this.props.addToCart(beer.name, amount)
    } else {
      this.setState({
        redirect: true,
      })
    }
  }

  handleInput = event => {
    let quant = [...this.state.quantity]
    quant.push([Number(event.target.value), event.target.name])
    this.setState({
      quantity: quant,
    })
  }

  showbeers = () => {
    return this.props.beers.map((beer, i) => {
      return (
        <div key={i} className="beer-div col-sm-4 col-xs-6 padding-top">
          <div>
            <h5 className=" mb-0">{this.props.beers[i].name}</h5>

            <small className="mt-0 mb-2">
              {this.props.beers[i].tagline}&nbsp; ABV:{this.props.beers[i].abv}
            </small>
          </div>

          <div className="row pt-1">
            <div className="col-2 p-1">
              <img
                alt={this.props.beers[i].name}
                width="50px"
                src={this.props.beers[i].image_url}
              />
            </div>
            <div className="col-10">
              <div>
                <p className="beer-d">{this.props.beers[i].description}</p>
              </div>
              <div>
                <b>Price: $ {this.props.beers[i].price}.00</b> /{' '}
                <small>per 6 pack</small>
              </div>
              <div className="row">
                <div className="col-4">
                  <input
                    placeholder="Quantity"
                    className="quant-input"
                    type="number"
                    defaultValue={this.props.theCart[this.props.beers[i].name]} //let obj = { heinekin: 3}  obj['heinekin'] = 3
                    name={this.props.beers[i].name}
                    onChange={this.handleInput}
                  />
                </div>
                <div className="col-8">
                  <div
                    name={this.props.beers[i].name}
                    onClick={e => this.checkLog(beer, this.props.quantity)}
                    className="btn btn-primary"
                  >
                    Add to cart
                  </div>
                </div>
              </div>
              <Link to="/details" className="link">
                <small>View More Details</small>
              </Link>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
    return (
      <div className="container">
        <div className="row">{this.showbeers()}</div>
      </div>
    )
  }
}
