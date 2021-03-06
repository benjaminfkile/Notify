import * as React from "react"
import Alarm from './alarm/alarm'
import NotificationMenu from './notification-menu/notification-menu'
import NotifyStore from '../notification-store/notification-store'

interface NotifyProps {
    userId: any
    alarm: boolean
    notificationMenu: boolean
    nag: boolean
    clickOutside: boolean
    updateInterval: number
    endPoint: string
    config: any
}

type NotifyTypes = {
    notifications: any
    notificationCount: number
    notificationMenuOpen: boolean

}

class Notify extends React.Component<NotifyProps, NotifyTypes> {

    wrapperRef: React.RefObject<any>
    renderCount = 0

    constructor(props: any) {
        super(props)
        this.state = {
            notifications: [],
            notificationCount: 0,
            notificationMenuOpen: false,
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        NotifyStore.endPoint = this.props.endPoint
        NotifyStore.userId = this.props.userId
        NotifyStore.config = this.props.config
        this.refreshNotifications()
        setInterval(this.refreshNotifications, this.props.updateInterval)
        setInterval(this.listenForChange, 100 )
        document.addEventListener('mousedown', this.handleClickOutside);
        // setInterval(this.addDummies, 100)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event: { target: any }) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.notificationMenuOpen && this.props.clickOutside
        ) {
            this.toggleNotificationMenu()
        }
    }

    addDummies = () =>{
        NotifyStore.postDummy()
    }

    listenForChange = () => {
        if (this.state.notifications !== NotifyStore.notifications) {
            this.countNotifications(NotifyStore.notifications)
        }
    }

    refreshNotifications = () => {
        this.renderCount ++
        NotifyStore.getNotifications()
    }

    toggleNotificationMenu = () => {
        if (this.state.notificationMenuOpen) {
            this.setState({ notificationMenuOpen: false })
        } else {
            this.setState({ notificationMenuOpen: true })
        }
    }

    countNotifications = (notifications: Array<any>) => {
        if (notifications.length > 0) {
            let count = 0
            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].notificationstate === "new" && notifications[i].notificationstate !== "deleted"  ) {
                    count++
                }
            }
            this.setState({ notifications: NotifyStore.notifications, notificationCount: count })
        }
    }

    render() {

        return (
            <div className="Notify" ref={this.wrapperRef}>
                {this.props.alarm && <Alarm
                    toggleNotificationMenu={this.toggleNotificationMenu}
                    notificationCount={this.state.notificationCount}
                />}
                {this.props.notificationMenu && this.state.notificationMenuOpen && <NotificationMenu
                    toggleNotificationMenu={this.toggleNotificationMenu}
                    notifications={this.state.notifications}
                    notificationCount={this.state.notificationCount}
                    updateNotifications={this.refreshNotifications}
                    endPoint={this.props.endPoint}

                />}
            </div>
        )
    }
}

export default Notify