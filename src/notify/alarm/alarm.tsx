import React, { Component } from 'react'
import './alarm.css'


interface AlarmProps {
    toggleNotificationMenu: Function
    notificationCount: number
}

type AlarmTypes = {

}

class Alarm extends Component<AlarmProps, AlarmTypes> {

    render() {
        return (
            <div className="Alarm">
                <div className="Alarm-Wrapper" onClick={()=> this.props.toggleNotificationMenu()}>
                <span className="material-icons">notifications</span>
                <p>{this.props.notificationCount}</p>
                </div>
            </div>
        )
    }
}

export default Alarm