import axios from "axios";
import type {Ref} from "vue";
import {Config} from "@/loadConfig";

export interface Student {
    id: string
    name: string
    isActive?: boolean
}

export const get_student_list = async (obj: Ref) => {
    axios.get(Config.beServerAddress + "/api/v1/students/get_std_list").then((res) => {
        const STDList = res.data
        obj.value = STDList.map((item: Student) => {
            item.isActive = false
            return item
        })
    })
}