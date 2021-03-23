import React, { Component } from 'react';
import Notify from './notify/notify'
import dummyData from './dummyStore'

class App extends Component {

  componentDidMount(){
    console.log(dummyData)
  }

  render() {
    return (
      <div className="App">
        <Notify
        alarm={true}
        notificationMenu={true}
        data={dummyData}
        />
      </div>
    )
  }
}

export default App
