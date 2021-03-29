import React, { Component } from 'react';
import Notify from './notify/notify-components/notify'
import './App.css'
import NotifyStore from './notify/notification-store/notification-store';
import { types } from 'node:util';

interface NotificationMenuProps {

}

type NotificationMenuTypes = {
  notArr: any
}

class App extends Component<NotificationMenuProps, NotificationMenuTypes>{

  constructor(props: any) {
    super(props)
    this.state = {
      notArr: []
    }
  }


  componentDidMount() {
    setInterval(this.getPurgeTest, 500)
  }

  getPurgeTest = () => {
    let foo = []
    let notifications: any = NotifyStore.notifications
    if (NotifyStore.notifications.length > 0) {
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].notificationstate === "new" && notifications[i].notificationstate !== "deleted") {
          foo.push(
            <div className="PurgeWrapper">
              <br></br>
              <button id="dismiss-release-btn" onClick={(e: any) => NotifyStore.purge(notifications[i].linkto, "read")}>
                read: + {notifications[i].title}
              </button>
              <button id="dismiss-release-btn" onClick={(e: any) => NotifyStore.purge(notifications[i].linkto, "dismiss")}>
                dismiss: + {notifications[i].title}
              </button>
              <button id="dismiss-release-btn" onClick={(e: any) => NotifyStore.purge(notifications[i].linkto, "delete")}>
                delete: + {notifications[i].title}
              </button>
              <br></br>
            </div>
          )
        }

      }
    }
    this.setState({ notArr: foo })
  }


  render() {




    return (
      <div className="App">
        <Notify
          userId={'8000'}
          alarm={true}
          notificationMenu={true}
          nag={true}
          clickOutside={true}
          updateInterval={10000}
          endPoint={'http://localhost:8000'}
          config={''}//put axios config here
        />
        {this.state.notArr}
      </div>
    )
  }
}

export default App
