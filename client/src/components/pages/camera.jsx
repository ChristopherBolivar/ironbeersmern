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
    licinfo: '',
  }
  setRef = webcam => {
    this.webcam = webcam
  }
  componentDidMount() {
    api
      .getUserState()
      .then(user => {
        this.setState({
          user: user,
        })
        setTimeout(() => {
          if (this.state.user) {
            this.setState({
              redirect: true,
            })
          }
        }, 3000)
      })
      .catch(err => console.log(err))
  }
  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
    console.log(imageSrc)
    axios
      .post('api/image-upload', { imageSrc })
      .then(doc => {
        var licInfo = doc.data.stuff.regions[0].lines.map(obj => {
          return obj.words.map(word => {
            return word.text
          })
        })
        this.setState({
          licInfo: licInfo,
        })

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
          alert('user is validated')
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
                user: user,
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
          }, 3000)
        }

        //alert(dob)
        // for (let i = 0; i < licInfo.length; i++) {
        //   if (licInfo[i].includes('DOB')) {
        //     let dob = licInfo[i][1]
        //     alert(dob)
        //   }
        // }
      })

      .catch(err => console.error(err))
  }

  render() {
    console.log(this.state.user, 'here as')
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: { exact: 'environment' },
    }
    if (this.state.redirect) {
      console.log('this is the updated state', this.state.licinfo)
      return (
        <Redirect
          to={{
            pathname: '/lic-details',
            state: { licInfo: this.state.licInfo },
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
