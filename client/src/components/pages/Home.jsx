import React, { Component } from 'react'
import api from '../../api'

import { Link } from 'react-router-dom'

export default class Home extends Component {
  componentDidMount() {
    api
      .getBeers()
      .then(beers => {
        this.setState({
          beers: beers.splice(0, 5),
        })
      })
      .catch(err => console.log(err))
  }
  state = {
    beers: [],
  }

  showbeers = () => {
    return this.state.beers.map((beer, i) => {
      return (
        <div key={i} className="col-sm-4 col-xs-6 p-3">
          <div>
            <h5 className="mb-0">{this.state.beers[i].name}</h5>

            <small className="mt-0 mb-2">
              {this.state.beers[i].tagline}&nbsp; ABV:{this.state.beers[i].abv}
            </small>
          </div>

          <div className="row pt-1">
            <div className="col-2 p-1">
              <img
                alt={this.state.beers[i].name}
                width="50px"
                src={this.state.beers[i].image_url}
              />
            </div>
            <div className="col-10">
              <div>
                <p className="beer-d">{this.state.beers[i].description}</p>
              </div>
              <div>
                <b>Price: $ {this.state.beers[i].price}.00</b> /{' '}
                <small>per 6 pack</small>
              </div>
              <div className="row">
                <div className="col-4">
                  <input
                    placeholder="Quantity"
                    className="quant-input"
                    type="number"
                  />
                </div>
                <div className="col-8">
                  <Link className="btn btn-primary">Add to cart</Link>
                </div>
              </div>
              <Link className="link">
                <small>View More Details</small>
              </Link>
            </div>
          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <div className="Home">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Fluid jumbotron</h1>
            <p className="lead">
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </div>
        </div>
        <div>
          <h4>Popular beer Options</h4>
          <hr />
          <div className="container">
            <div className="row">{this.showbeers()}</div>
          </div>
        </div>
      </div>
    )
  }
}
