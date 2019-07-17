import React, { Component } from "react"
import RealTimeFirebase from './firebase/realTime'
// import SigIn from './firebase/singIn'
import Storage from './firebase/storage'
// import Number from './firebase/number'

class App extends Component {
  render() {
    return (
      // <RealTimeFirebase />
      // <Number />
      <Storage />
    )
  }
}

export default App
