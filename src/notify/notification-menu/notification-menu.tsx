import React, { Component } from 'react'
import notificationRouter from '../notification-router/notification-router'
import { Card, Button } from 'react-bootstrap'
import './notification-menu.css'


interface NotificationMenuProps {
    toggleNotificationMenu: Function
    notifications: Array<any>
}

type NotificationMenuTypes = {

}

class NotificationMenu extends Component<NotificationMenuProps, NotificationMenuTypes> {

    render() {
        return (
            <div className="Notification-Menu">
                <div className="Notification-Menu-Header">
                    <Button variant="primary" onClick={() => this.props.toggleNotificationMenu()}/>
                    <p>Notifications: {this.props.notifications.length}</p>
                </div>
                {this.props.notifications.map((item: any, i: number) => <div key={item.id} className="Notification-Card">
                    {item.notificationState === "read" && <Card id="notification-read">
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.text}
                            </Card.Text>
                            <Button>View</Button>
                            <Button onClick={() => notificationRouter(item, "unread")}>Mark as Unread</Button>
                        </Card.Body>
                    </Card>}
                    {item.notificationState === "unread" && <Card id="notification-unread">
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.text}
                            </Card.Text>
                            <Button>View</Button>
                            <Button onClick={() => notificationRouter(item, "read")}>Mark as Read</Button>
                        </Card.Body>
                    </Card>}
                </div>)}
            </div>
        )
    }
}

export default NotificationMenu