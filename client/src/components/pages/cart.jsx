import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import api from '../../api'
export default class cart extends Component {
  state = {
    cart: {},
    quantity: [],
  }
  componentDidMount() {
    api
      .getUser()
      .then(info => {
        this.setState({
          cart: info,
        })
      })
      .catch(err => console.log(err))
  }
  removeItem = body => {
    let cart = []
    let updatedCart = {}
    for (var key in this.state.cart) {
      cart.push([key, this.state.cart[key]])
    }
    cart.splice(body, 1)
    console.log(cart)
    cart.forEach((item, i) => {
      updatedCart[item[0]] = item[1]
    })
    console.log(updatedCart)
    this.setState({
      cart: updatedCart,
    })
    api
      .addCart(updatedCart)
      .then(result => {
        console.log('SUCCESS!')
        //this.setState({ theCart })
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
  updateQuantity = e => {
    let cartCopy = { ...this.state.cart }
    console.log(e.target.name, cartCopy)
    for (var key in cartCopy) {
      if (key === e.target.name) {
        cartCopy[key] = e.target.value
      }
      this.setState({
        cart: cartCopy,
      })
      api
        .addCart(cartCopy)
        .then(result => {
          console.log('SUCCESS!')
        })
        .catch(err => this.setState({ message: err.toString() }))
    }
    console.log(cartCopy)
  }
  showTotal = () => {
    let quantity = []
    for (var key in this.state.cart) {
      quantity.push(this.state.cart[key] * 6)
    }
    if (quantity.length >= 1) {
      let total = quantity.reduce((accu, value) => {
        return accu + value
      })

      return (
        <div>
          <p>Amount: {total}</p>
          <p>Tax: 7%</p>
          <p>Total: {total * 0.07 + total}</p>
          <button className="btn btn-success">Proceed to checkout</button>
        </div>
      )
    }
  }
  showCart = () => {
    let cart = []
    for (var key in this.state.cart) {
      cart.push([key, this.state.cart[key]])
    }

    if (cart.length >= 1) {
      return cart.map(item => {
        return (
          <div key={item[0]} className="container">
            <div className="row">
              <div className="col-6">
                <p>{item[0]}</p>
              </div>
              <div className="col-1">
                <p>
                  <input
                    className="quant-input"
                    defaultValue={item[1]}
                    name={item[0]}
                    type="number"
                    onChange={this.updateQuantity}
                  />
                </p>
              </div>
              <div className="col-2">
                <p>{item[1] * 6}</p>
              </div>
              <div className="col-2">
                <div
                  onClick={() => this.removeItem(cart.indexOf(item))}
                  className="btn btn-danger"
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
        )
      })
    } else {
      return <p className="text-center">no item in cart</p>
    }
  }
  render() {
    return (
      <div>
        <div>{this.showCart()}</div>
        <div className="row">
          <div className="col-6">&nbsp;</div>
          <div className="col-6">{this.showTotal()}</div>
        </div>
      </div>
    )
  }
}
