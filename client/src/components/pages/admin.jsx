import React, { Component } from 'react'
import axios from 'axios'
import api from '../../api'

export default class admin extends Component {
  state = {
    admin: false,
  }
  componentDidMount() {
    var recievedMessage = this.props
    console.log(this.props)
  }
  handleForm = e => {
    e.preventDefault()
    let eventName = e.target[0].value
    let zipcode = e.target[1].value
    let miles = e.target[2].value
    api
      .addEvent({ eventName, zipcode, miles })
      .then(doc => {
        console.log('SUCCESS!')
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    console.log(this.state.admin)
    if (this.state.admin) {
      return (
        <div>
          Declare Natural Disaster:
          <div className="container">
            <form onSubmit={this.handleForm}>
              <div>
                <label className="mt-2">Disaster info (name/event)</label>
                <br />
                <input name="disaster" type="text" />
              </div>
              <div>
                <label className="mt-2">
                  Area directly affected (zip code)
                </label>
                <br />
                <input name="disasterZip" type="text" />
              </div>
              <div>
                <label className="mt-2">Radius of affected area</label>
                <br />
                <input name="disasterArea" type="number" /> Miles
              </div>
              <input type="submit" />
            </form>
          </div>
        </div>
      )
    } else {
      return <div>sry not admin</div>
    }
  }
  componentDidMount() {
    api
      .getAdmin()
      .then(data => this.setState({ admin: data.admin }))
      .catch(err => this.setState({ message: err.toString() }))
  }
}
