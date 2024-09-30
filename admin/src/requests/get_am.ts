import type {Ref} from "vue";
import axios from "axios";
import {Config} from "@/loadConfig";

interface Assignment {
    name: string
    deadline: string
    show?: boolean
}


let AMListModel: Assignment[] = []

//=======================================================
// 模拟数据
AMListModel.push({
    name: 'Assignment1',
    deadline: '2024-9-5'
})
AMListModel.push({
    name: 'Assignment2',
    deadline: '2024-8-3'
})
AMListModel.push({
    name: 'Assignment3',
    deadline: '2024-8-3'
})
AMListModel.push({
    name: 'Assignment4',
    deadline: '2024-8-3'
})
AMListModel.push({
    name: 'Assignment5',
    deadline: '2024-12-3'
})
AMListModel.push({
    name: 'Assignment6',
    deadline: '2024-10-3'
})

// AM加上是否折叠字段
for (let AM of AMListModel) {
    AM.show = false;
}
//=======================================================
export const getAMList = async (AMList: Ref) => {
    const response = await axios.get(`${Config.beServerAddress}/api/v1/am/get_am?request_type=preview`)
    AMList.value = response.data as Assignment[]
}

export {AMListModel}
export type {Assignment}