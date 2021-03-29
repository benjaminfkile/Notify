import React, { Component } from 'react'
import './alarm.css'


interface AlarmProps {
    notificationCount: number
    toggleNotificationMenu: Function
}

class Alarm extends Component<AlarmProps> {

    render() {
        return (
            <div className="Alarm">
                <div className="Alarm-Wrapper">
                    <span className="material-icons" onClick={() => this.props.toggleNotificationMenu()}>notifications</span>
                    <p onClick={() => this.props.toggleNotificationMenu()}>{this.props.notificationCount}</p>
                </div>
            </div>
        )
    }
}

export default Alarm