import React, { Component } from 'react'

export default class licDetails extends Component {
  componentDidMount() {
    var recievedMessage = this.props.location.state.licInfo
    alert(recievedMessage)
  }
  render() {
    let licenseData = this.props.location.state.licInfo.map(data => {
      return data.join(' ')
    })
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
          <input value={licenseData[0]} /> <br />
          Last Name:
          <input value={licenseData[1]} /> <br />
          Address:
          <input value={licenseData[2]} /> <br />
          City:
          <input value={city} />
          <br />
          Zipcode:
          <input value={zip} /> <br />
          DOB:
          <input value={dob} /> <br />
          Sex:
          <input value={sex} /> <br />
        </form>
        <button type="submit">Confirm &amp; Submit</button>
      </div>
    )
  }
}
