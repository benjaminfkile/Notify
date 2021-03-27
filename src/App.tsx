import React, { Component } from 'react';
import Notify from './notify/notify'
import dummyData from './dummyStore'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Notify
        alarm={true}
        notificationMenu={true}
        />
      </div>
    )
  }
}

export default App
