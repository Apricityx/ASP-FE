import type {Ref} from "vue";
import axios, {AxiosError} from "axios";
import {Config} from "@/loadConfig";
import {tr} from "vuetify/locale";

// 获取名字以及是否提交过该作业

async function sleep(number: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, number)
    })
}

export const getStdName = async (obj: Ref<{
    name: string,
}>, stdID: string, loadingName: Ref<boolean>) => {
    // 此处需要调用服务器API获取数据
    interface Response {
        name: null | string
    }

    try {
        const response: Response = (await axios.get(Config.beServerAddress + "/api/v1/std/get_std_name?std_id=" + stdID)).data
        // console.log(response)
        if (response.name) {
            obj.value.name = response.name
            return true
        } else {
            return false
        }
    }
    catch (e){
        if (e === AxiosError){
            console.error(e)
            return false
        }
    }
    // if (!stdID) {
    //     return false
    // }
    // loadingName.value = true
    // obj.value.name = ""
    // await sleep(1000)
    // obj.value.name = "张三"
}