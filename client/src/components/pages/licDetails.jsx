import React, { Component } from 'react'
import api from '../../api'

export default class licDetails extends Component {
  componentDidMount() {
    // var recievedMessage = this.props.location.state.licInfo
    // //document.write(typeof recievedMessage, recievedMessage)
    // alert(recievedMessage)
    // for (let i = 0; i < recievedMessage.length; i++) {
    //   if (recievedMessage[i].includes('DOB')) {
    //     let dob = recievedMessage[i][1]
    //     alert(dob)
    //   }
    // }
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
    // let arr = []
    // let licenseData = this.props.location.state.licInfo.map(data => {
    //   let dataDiv = data.filter(a => {
    //     return a.includes('DOB')
    //   })
    //   return <div>{dataDiv}</div>
    // })
    // let cityZip = licenseData[5]
    // let dobAndGender = licenseData[6]
    // let zip = cityZip.slice(-10, cityZip.length)
    // let city = cityZip.slice(0, cityZip.length - 10)
    // let dob = dobAndGender.slice(3, dobAndGender.length)
    // dob = dobAndGender.slice(5, dob.length - 2)
    // let sex = dobAndGender.slice(-2, dobAndGender.length)

    return <div id="data">halo</div>
  }
}
