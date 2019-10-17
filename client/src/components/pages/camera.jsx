import React, { Component } from 'react'
import Webcam from 'react-webcam'
import { Redirect } from 'react-router-dom'
import api from '../../api'
import axios from 'axios'
export default class camera extends Component {
  state = {
    redirect: false,
    verified: false,
    user: false,
    userInfo: {},
    int: null,
  }
  setRef = webcam => {
    this.webcam = webcam
  }

  componentDidMount() {
    let int = setInterval(() => this.getUserState(), 3000)
    this.setState({ int })
  }

  getUserState = () => {
    console.log('in here', this.state)
    api
      .getUserState()
      .then(user => {
        console.log(user)
        if (user.verified) {
          this.setState({
            userInfo: user.userInfo,
            redirect: true,
          })
          clearInterval(this.state.int)
        }
      })
      .catch(err => console.error(err))
  }
  // api
  //   .getUserState()
  //   .then(user => {
  //     this.setState({
  //       verified: user.verified,
  //     })
  //     setTimeout(() => {
  //       if (this.state.verified) {
  //         this.setState({
  //           userInfo: user.userInfo,
  //           redirect: true,
  //           verified: true,
  //         })
  //       }
  //     }, 2000)
  //   })
  //   .catch(err => console.log(err))
  //}

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
    console.log(imageSrc)
    axios
      .post('/api/image-upload', { imageSrc })
      .then(doc => {
        var licInfo = doc.data.stuff.regions[0].lines.map(obj => {
          return obj.words.map(word => {
            return word.text
          })
        })

        let fName = licInfo[0].join(' ')
        let lName = licInfo[1].join(' ')
        let addy = licInfo[2].join(' ')
        alert(fName + ' ' + lName + ' ' + addy)

        let dobAndGender = licInfo[4]
        let dob = dobAndGender[1].slice(6)
        let validate = 2019 - dob
        alert(dob.length + ' ' + dob)
        if (dob.length === 4) {
          if (validate >= 21) {
            alert('Age Verified!')
            this.setState({
              verified: true,
            })
          }
        }

        if (this.state.verified) {
          api
            .addLicenseInfo({ fName, lName, addy })
            .then(doc => {
              console.log(doc)
            })

            .catch(err => console.error(err))

          api
            .validateUser()
            .then(doc => {
              console.log(doc)
            })

            .catch(err => console.error(err))
          api
            .getUserState()
            .then(user => {
              this.setState({
                user: user.verified,
              })
              alert(user + '  user from ap')
            })
            .catch(err => console.log(err))

          setTimeout(() => {
            if (this.state.user) {
              this.setState({
                redirect: true,
              })
            }
          }, 2000)
        }
      })

      .catch(err => console.error(err))
  }

  render() {
    // this.getUserState()
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: { exact: 'environment' },
    }
    console.log(this)
    if (this.state.redirect) {
      console.log(this.state)
      return (
        <Redirect
          to={{
            pathname: '/lic-details',
            state: { licInfo: this.state.userInfo },
          }}
        />
      )
    }

    return (
      <>
        <Webcam
          audio={false}
          height={200}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={200}
          videoConstraints={videoConstraints}
          className="mx-auto text-center"
        />
        <button onClick={this.capture}>Capture photo</button>
      </>
    )
  }
}
