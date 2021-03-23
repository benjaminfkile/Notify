import React, { Component } from 'react'
import marker from '../marker/marker'
import { Card, Button } from 'react-bootstrap'
import './notification-menu.css'


interface NotificationMenuProps {
    data: any
    toggleNotificationMenu: Function
    update: Function
}

type NotificationMenuTypes = {

}

class NotificationMenu extends Component<NotificationMenuProps, NotificationMenuTypes> {

    render() {
        console.log(this.props.data)
        return (
            <div className="Notification-Menu">
                <div className="Notification-Menu-Header">
                    <Button variant="primary" onClick={() => this.props.toggleNotificationMenu()}/>
                    <p>Notifications: {this.props.data.length}</p>
                </div>
                {this.props.data.map((item: any, i: number) => <div key={item.id} className="Notification-Card">
                    {item.notificationState === "read" && <Card id="notification-read">
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.text}
                            </Card.Text>
                            <Button>View</Button>
                            <Button onClick={() => marker(item, i, "unread", this.props.update)}>Mark as Unread</Button>
                        </Card.Body>
                    </Card>}
                    {item.notificationState === "unread" && <Card id="notification-unread">
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.text}
                            </Card.Text>
                            <Button>View</Button>
                            <Button onClick={() => marker(item, i, "read", this.props.update)}>Mark as Read</Button>
                        </Card.Body>
                    </Card>}
                </div>)}
            </div>
        )
    }
}

export default NotificationMenu