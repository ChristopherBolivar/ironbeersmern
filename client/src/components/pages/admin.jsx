import React, { Component } from 'react'
import api from '../../api'

export default class admin extends Component {
  render() {
    return <div>admin</div>
  }
  componentDidMount() {
    api
      .getAdmin()
      .then(data => this.setState({ secret: data.secret }))
      .catch(err => this.setState({ message: err.toString() }))
  }
}
