import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Alarm from './alarm/alarm'
import NotificationMenu from './notification-menu/notification-menu'

interface NotifyProps {
    alarm: boolean
    notificationMenu: boolean
}

type NotifyTypes = {
    notificationMenuOpen: boolean

}


class Notify extends Component<NotifyProps, NotifyTypes> {

    testInterval: number = 2000

    constructor(props: any) {
        super(props)
        this.state = {
            notificationMenuOpen: false,
        }
    }

    componentDidMount() {
        setInterval(this.dummyGet, this.testInterval)
        // for(let i = 0; i < 20; i++){
        //     this.dummyPost()
        // }
    }

    dummyGet = () => {

        axios.get('http://localhost:8000/api/')
            .then(res => {
                console.log(res)
            })
            .catch(err => {

            })
    }

    dummyPost = () => {

        const request = {
            category: "release",
            createdBy: "1234",
            deletedBy: "null",
            deletedDateUtc: "null",
            displayAtLogin: "false",
            expires: moment().add(2, "days").format(),
            id: Math.random(),
            linkTo: `/releases/${Math.random()}`,
            minAppVersion: Math.random(),
            notificationState: "new",
            parentId: Math.random(),
            recipientId: "1234",
            sendToRoles: [],
            text: Math.random(),
            timestamp: moment.now(),
            title: "foo",
            type: "release"
        }

        fetch('http://localhost:8000/api/post-dummies', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        })
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
                        toggleNotificationMenu={this.toggleNotificationMenu}
                        notificationCount={0}
                    />}
                    {this.props.notificationMenu && this.state.notificationMenuOpen && <NotificationMenu
                        toggleNotificationMenu={this.toggleNotificationMenu}
                        notifications={[{}]}
                    />}
                </div>
        )
    }
}

export default Notify