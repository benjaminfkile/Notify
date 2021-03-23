import dummyData from '../../dummyStore'

let data: any = dummyData.data

const marker = (notification: any, index: number, action: string, update: Function) =>{
    data[index].notificationState = action
    update(data)
    console.log(data)
}

export default marker