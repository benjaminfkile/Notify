import { setMaxListeners } from 'node:process'
import { types } from 'node:util'
import React, { Component } from 'react'
import NotifyStore from '../../notification-store/notification-store'
// import { Link } from 'react-router-dom'
import './notification-menu.css'

interface NotificationMenuProps {
    notifications: any
    toggleNotificationMenu: Function
    notificationCount: number
    updateNotifications: Function
    endPoint: string
}

type NotificationMenuTypes = {
    ascending: boolean
    firstRender: boolean
}

class NotificationMenu extends Component<NotificationMenuProps, NotificationMenuTypes> {

    renderCount = 0

    constructor(props: any) {
        super(props)
        this.state = {
            ascending: true,
            firstRender: true,
        }
    }

    toggleOrder = () => {
        if (this.state.ascending) {
            this.setState({ ascending: false })
        } else {
            this.setState({ ascending: true })
        }
    }

    sortNotifications = (notifications: Array<any>, ascending: boolean) => {
        if (ascending) {
            return notifications.sort((a, b) => (new Date(b.timestamp) > new Date(a.timestamp)) ? 1 : -1)
        } else {
            return notifications.sort((a, b) => (new Date(b.timestamp) < new Date(a.timestamp)) ? 1 : -1)
        }
    }


    animateDismiss = (notification: any, index: number) => {

        let toSlide: any = document.getElementById("notification-slide-wrapper-" + index);
        toSlide.className = "Notification-Slide-Exit"

        setTimeout(function () {
            NotifyStore.dismissNotification(notification, index)
        }, 300);
    }

    render() {

        if (this.renderCount < 2) {
            this.renderCount++
        } else {
            this.renderCount = 2
        }

        return (
            <div className={"Notification-Menu-" + this.renderCount}>
                {this.props.notificationCount === 0 && <div className="No-Notifications-Header">
                    <p>No Notifications</p>
                </div>}
                {this.props.notificationCount > 0 && <div className="Notification-Content-Wrapper">
                    <div className={"Notification-Menu-Header"}>
                        <p>Notifications: {this.props.notificationCount}</p>
                        <div id="notification-menu-header-buttons">
                            <p id="not-menu-sweep" className="material-icons" onClick={() => NotifyStore.dismissAllNotifications()}>delete_sweep</p>
                            {this.state.ascending && this.props.notificationCount > 1 && <p id="not-menu-asc" className="material-icons" onClick={() => this.toggleOrder()}>flip_to_front</p>}
                            {!this.state.ascending && this.props.notificationCount > 1 && <p id="not-menu-desc" className="material-icons" onClick={() => this.toggleOrder()}>flip_to_back</p>}
                        </div>
                    </div>
                    {this.sortNotifications(this.props.notifications, this.state.ascending).map((notification: any, i: number) => <div key={Math.random()} className={"Notification-Item-" + this.renderCount}>
                        {notification.notificationstate === "read" && <div id="notification-read">
                            <div id={"notification-slide-wrapper-" + i} >
                                <p id="notification-title">{notification.title}</p>
                                <div id="notification-text" onClick={() => NotifyStore.readNotification(notification.id, i)}>
                                    {/* <Link to={notification.linkto}>{notification.text}</Link> */}
                                    <p id="notification-text-p">{notification.text}</p>
                                </div>
                                <div id="notification-item-buttons">
                                    <p id="not-menu-top" className="material-icons">drafts</p>
                                    <p id="not-menu-id">ID: {notification.id}</p>
                                    <button id="not-menu-btm" className="material-icons" onClick={() => this.animateDismiss(notification.id, i)}>close</button>
                                </div>
                            </div>
                        </div>}
                        {notification.notificationstate === "new" && <div id="notification-unread">
                            <div id={"notification-slide-wrapper-" + i} >
                                <p id="notification-title">{notification.title}</p>
                                <div id="notification-text" onClick={() => NotifyStore.readNotification(notification.id, i)}>
                                    {/* <Link to={notification.linkto}>{notification.text}</Link> */}
                                    <p id="notification-text-p">{notification.text}</p>
                                </div>
                                <div id="notification-item-buttons">
                                    {this.renderCount === 1 && <p id="not-menu-top-unread-r1" className="material-icons">markunread</p>}
                                    {this.renderCount > 1 && <p id="not-menu-top-unread-r2" className="material-icons">markunread</p>}
                                    <p id="not-menu-id">ID: {notification.id}</p>
                                    <button id="not-menu-btm" className="material-icons" onClick={() => this.animateDismiss(notification.id, i)}>close</button>
                                </div>
                            </div>
                        </div>}
                    </div>)}
                </div>}
                {this.props.notificationCount > 0 && <div id="not-menu-pad-hack"></div>}
            </div>
        )
    }
}

export default NotificationMenu