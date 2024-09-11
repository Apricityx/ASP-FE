// 本API向服务器获取月提交人数和总提交人数

import {all} from "axios";
import type {Ref} from "vue";
interface Counter {
    submitted: number
    unSubmitted: number
    assignment_progress: number
}

async function sleep(number: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, number)
    })
}

const switchMonthCounter = async (obj: Ref) => {
    await sleep(1000)
    // 此处需要调用服务器API获取数据
    const monthCounter: Counter = {
        submitted: 10,
        unSubmitted: 20,
        assignment_progress: 0
    }
    monthCounter.assignment_progress = Math.floor(monthCounter.submitted / (monthCounter.submitted + monthCounter.unSubmitted) * 100)
    obj.value = monthCounter
}

const switchAllCounter = async (obj:Ref) => {
    await sleep(1000)
    // 此处需要调用服务器API获取数据
    const allCounter: Counter = {
        submitted: 100,
        unSubmitted: 3120,
        assignment_progress: 0
    }
    allCounter.assignment_progress = Math.floor(allCounter.submitted / (allCounter.submitted + allCounter.unSubmitted) * 100)
    obj.value = allCounter
}

export type {Counter as SubmitCounter}
export {switchAllCounter, switchMonthCounter}
