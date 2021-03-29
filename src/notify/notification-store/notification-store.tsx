import axios from "axios";
import moment from "moment";
import generateUUID from '../notification-utilities/uuid-gen'
import getIpsum from '../notification-utilities/lorem-ipsum'

const NotifyStore: any = {

    endPoint: "",
    userId: "",
    config: "",
    notifications: [],
    getNotifications: () => {
        axios.get(`${NotifyStore.endPoint}/api/notifications/${NotifyStore.userId}`)
            .then((res: any) => {
                NotifyStore.notifications = res.data
            })
            .catch((error: any) => {
                return 'oop'
            })
    },
    readNotification: (id: string, index: number) => {
        NotifyStore.notifications[index].notificationstate = "read"
        axios.post(`${NotifyStore.endPoint}/api/notifications/read/${id}`)
            .then((res: any) => {
                NotifyStore.getNotifications()
            })
            .catch((error: any) => {
                return 'oop'
            })
    },
    dismissNotification: (id: string, index: number) => {
        NotifyStore.notifications[index].notificationstate = "dismissed"
        axios.post(`${NotifyStore.endPoint}/api/notifications/dismiss/${id}`)
            .then((res: any) => {
                NotifyStore.getNotifications()
            })
            .catch((error: any) => {
                return 'oop'
            })
    },
    dismissAllNotifications: () => {
        if (NotifyStore.notifications.length > 0) {
            for (let i = 0; i < NotifyStore.notifications.length; i++) {
                let notification: any = NotifyStore.notifications[i]
                NotifyStore.dismissNotification(notification.id, i)
            }
        }
    },
    deleteNotification: (id: string, index: number) => {
        NotifyStore.notifications[index].notificationstate = "deleted"
        axios.post(`${NotifyStore.endPoint}/api/notifications/delete/${id}`)
            .then((res: any) => {
                NotifyStore.getNotifications()
            })
            .catch((error: any) => {
                return 'oop'
            })
    },
    purge: (docId: string, action: string) => {
        console.log(docId)
        if (NotifyStore.notifications.length > 0) {
            for (let i = 0; i < NotifyStore.notifications.length; i++) {
                try {
                    let notification: any = NotifyStore.notifications[i]
                    notification = notification.linkto.split("/")
                    let id: any = docId.split("/")
                    if (notification[2] === id[2]) {
                        let foo: any = NotifyStore.notifications[i]
                        if (action === "read") {
                            NotifyStore.readNotification(foo.id)
                        }
                        if (action === "dismiss") {
                            NotifyStore.dismissNotification(foo.id)
                        }
                        if (action === "delete") {
                            NotifyStore.deleteNotification(foo.id)
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }, postDummy: () => {
        const postTitle = getIpsum.split(" ")[Math.floor(Math.random() * getIpsum.length)]
        const request = {
            category: "release",
            createdBy: "1234",
            deletedBy: "null",
            deletedDateUtc: "null",
            displayAtLogin: "false",
            expires: moment().add(2, "days").format(),
            id: generateUUID(),
            linkTo: `/releases/${Math.random()}`,
            minAppVersion: generateUUID(),
            notificationState: "new",
            parentId: generateUUID(),
            recipientId: "8000",
            sendToRoles: [],
            text: getIpsum,
            timestamp: moment().utc().format(),
            title: postTitle,
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
}

export default NotifyStore