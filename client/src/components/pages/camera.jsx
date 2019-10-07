import React, { Component } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'
export default class camera extends Component {
  setRef = webcam => {
    this.webcam = webcam
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
    console.log(imageSrc)

    axios
      .post('http://localhost:5000/api/image-upload', { imageSrc })
      .then(doc => console.log('works?', doc))
      .catch(err => console.error(err))
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    }

    return (
      <>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
      </>
    )
  }
}
