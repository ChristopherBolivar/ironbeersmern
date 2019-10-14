import React, { Component } from 'react'
import api from '../../api'
export default class cart extends Component {
  state = {
    cart: {},
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
  render() {
    console.log(this.state.cart, '=-=-=-=-=-=-=-=-')
    return <div></div>
  }
}
