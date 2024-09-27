import type {Ref} from "vue";
import axios from "axios";
import {Config} from "@/loadConfig";

export const getStdIdList = async (obj: Ref) => {
    // 此处需要调用服务器API获取数据
    const stdIDListDefault = await axios.get(`${Config.beServerAddress}/api/v1/std/get_std_id_list`)
    const stdIdList: string[] = []
    for (const item of stdIDListDefault.data) {
        stdIdList.push(item.StdID)
        stdIdList.sort()
        obj.value = stdIdList
    }
}