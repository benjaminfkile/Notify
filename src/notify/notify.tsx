import React, { Component } from 'react'
import Alarm from './alarm/alarm'
import NotificationMenu from './notification-menu/notification-menu'

interface NotifyProps {
    alarm: boolean
    notificationMenu: boolean
    data: any
}

type NotifyTypes = {
    notificationMenuOpen: boolean
    notifications: any

}


class Notify extends Component<NotifyProps, NotifyTypes> {

    constructor(props: any) {
        super(props)
        this.state = {
            notificationMenuOpen: false,
            notifications: this.props.data.data
        }
    }

    update = (newData :any) =>{
        this.setState({notifications: newData})
    }

    toggleNotificationMenu = () => {
        if (this.state.notificationMenuOpen) {
            this.setState({ notificationMenuOpen: false })
        } else {
            this.setState({ notificationMenuOpen: true })
        }
    }

    render() {
        return (
            <div className="Notify">
                {this.props.alarm && <Alarm
                    notificationCount={this.props.data.data.length}
                    toggleNotificationMenu={this.toggleNotificationMenu}
                />}
                {this.props.notificationMenu && this.state.notificationMenuOpen && <NotificationMenu
                    data={this.props.data.data}
                    toggleNotificationMenu={this.toggleNotificationMenu}
                    update={this.update}
                />}
            </div>
        )
    }
}

export default Notify