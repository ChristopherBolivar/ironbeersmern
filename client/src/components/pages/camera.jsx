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
      .post('http://192.168.125.40:5000/api/image-upload', { imageSrc })
      .then(doc => {
        var stuff = doc.data.stuff.regions[0].lines.map(obj => {
          return obj.words.map(word => {
            return word.text
          })
        })
        console.log('works?', stuff)
        alert(stuff)
      })

      .catch(err => console.error(err))
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: { exact: 'environment' },
    }

    return (
      <>
        <Webcam
          audio={false}
          height={window.innerHeight}
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
