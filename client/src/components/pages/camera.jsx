import React, { Component } from 'react'
import Webcam from 'react-webcam'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
export default class camera extends Component {
  state = {
    redirect: false,
    licinfo: '',
  }
  setRef = webcam => {
    this.webcam = webcam
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
    console.log(imageSrc)
    axios
      .post(
        'http://192.168.125.40:5000/api/image-upload' ||
          'http://10.0.0.3:5000/api/image-upload' ||
          'http://localhost:5000/api/image-upload',
        { imageSrc }
      )
      .then(doc => {
        var licInfo = doc.data.stuff.regions[0].lines.map(obj => {
          return obj.words.map(word => {
            return word.text
          })
        })
        this.setState(
          {
            redirect: true,
            licInfo: licInfo,
          },
          () => {
            console.log('redirecting')
          }
        )
      })

      .catch(err => console.error(err))
  }

  render() {
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
          height={window.innerHeight / 1.5}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={window.innerWidth}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
      </>
    )
  }
}
