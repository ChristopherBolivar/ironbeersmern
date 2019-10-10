import React, { Component } from 'react'
import api from '../../api'

export default class licDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zip: '',
      dob: '',
      sex: '',
    }
  }
  componentDidMount() {
    var recievedMessage = this.props.location.state.licInfo
    alert(recievedMessage)
  }

  handleClick = e => {
    console.log(e)
    e.preventDefault()
    this.setState({
      firstName: document.getElementById('fname').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      zip: document.getElementById('zip').value,
      dob: document.getElementById('dob').value,
      sex: document.getElementById('sex').value,
    })
    //setTimeout(function() {
    console.log(this.state)
    api
      .addLicenseInfo(this.state)
      .then(result => {
        console.log('SUCCESS!', this.props)
      })
      .catch(err => this.setState({ message: err.toString() }))
    //}, 1000)
  }
  render() {
    let licenseData = this.props.location.state.licInfo.map(data => {
      return data.join(' ')
    })
    console.log(licenseData)
    let cityZip = licenseData[3]
    let dobAndGender = licenseData[4]
    let zip = cityZip.slice(-10, cityZip.length)
    let city = cityZip.slice(0, cityZip.length - 10)
    let dob = dobAndGender.slice(4, dobAndGender.length)
    dob = dobAndGender.slice(5, dob.length - 2)
    let sex = dobAndGender.slice(-2, dobAndGender.length)

    return (
      <div>
        <form>
          First Name &amp; Middle name:
          <input
            id="fname"
            name="firstName"
            defaultValue={licenseData[0]}
          />{' '}
          <br />
          Last Name:
          <input
            id="lastName"
            name="lastName"
            defaultValue={licenseData[1]}
          />{' '}
          <br />
          Address:
          <input
            id="address"
            name="address"
            defaultValue={licenseData[2]}
          />{' '}
          <br />
          City:
          <input id="city" ref="city" name="city" defaultValue={city} /> <br />
          Zipcode:
          <input id="zip" name="zip" defaultValue={zip} /> <br />
          DOB:
          <input id="dob" name="dob" defaultValue={dob} /> <br />
          Sex:
          <input id="sex" name="sex" defaultValue={sex} />
          <br />
        </form>
        <button onClick={this.handleClick} type="submit">
          Confirm &amp; Submit
        </button>
      </div>
    )
  }
}
