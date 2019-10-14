import React, { Component } from 'react'
import api from '../../api'

export default class licDetails extends Component {
  componentDidMount() {
    var recievedMessage = this.props.location.state.licInfo
    alert(recievedMessage)
  }

  handleClick = e => {
    console.log(e)
    e.preventDefault()

    let firstName = e.target.elements.firstName.value
    let lastName = e.target.elements.lastName.value
    let address = e.target.elements.address.value
    let city = e.target.elements.city.value
    let zip = e.target.elements.zip.value
    let dob = e.target.elements.dob.value
    let sex = e.target.elements.sex.value

    api
      .addLicenseInfo({ firstName, lastName, address, city, zip, dob, sex })
      .then(result => {
        console.log('SUCCESS!')
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
  render() {
    let licenseData = this.props.location.state.licInfo.map(data => {
      return data.join(' ')
    })
    let cityZip = licenseData[5]
    let dobAndGender = licenseData[6]
    let zip = cityZip.slice(-10, cityZip.length)
    let city = cityZip.slice(0, cityZip.length - 10)
    let dob = dobAndGender.slice(3, dobAndGender.length)
    dob = dobAndGender.slice(5, dob.length - 2)
    let sex = dobAndGender.slice(-2, dobAndGender.length)

    return (
      <div>
        <form onSubmit={this.handleClick}>
          First Name &amp; Middle name:
          <input
            id="fname"
            name="firstName"
            defaultValue={licenseData[2]}
          />{' '}
          <br />
          Last Name:
          <input
            id="lastName"
            name="lastName"
            defaultValue={licenseData[3]}
          />{' '}
          <br />
          Address:
          <input
            id="address"
            name="address"
            defaultValue={licenseData[4]}
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
          <input type="submit" value="click" />
        </form>
        <button onClick={this.handleClick} type="submit">
          Confirm &amp; Submit
        </button>
      </div>
    )
  }
}
