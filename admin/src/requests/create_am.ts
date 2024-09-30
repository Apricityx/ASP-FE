import axios from "axios";
import {Config} from "@/loadConfig";

interface CreateAMData {
    name: string
    deadline: string
    description: string
}

interface Result {
    message: "AM created" | "AM already exists" | "AM create failed"
}

export const createAM = async (AM: CreateAMData) => {
    // 此处需要调用服务器API获取数据
    console.log(`${Config.beServerAddress}:${Config.devWebServerPort}/api/v1/am/create_am`)
    const result = await axios.post(`${Config.beServerAddress}/api/v1/am/create_am`, {
        name: AM.name,
        deadline: AM.deadline,
        description: AM.description
    })
    if (result.status !== 200) {
        console.log('createAM failed', result)
    }
    const resultData = result.data as Result
    if (resultData.message === "AM created") {
        console.log('createAM success')
        alert('作业成功创建')
        return true
    } else if (resultData.message === "AM already exists") {
        console.log('createAM failed: AM already exists')
        alert('作业已存在，请修改作业名称')
        return false
    } else if (resultData.message === "AM create failed") {
        console.log('createAM failed: AM create failed')
        alert('作业创建失败，请检查后端输出')
        return false
    }
    return false

}