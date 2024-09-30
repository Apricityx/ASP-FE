import axios from "axios";
import type {Ref} from "vue";
import {Config} from "@/loadConfig";

export interface Student {
    id: string
    name: string
}

export const get_student_list = async (obj: Ref) => {
    axios.get(Config.beServerAddress + "/api/v1/students/get_std_list").then((res) => {
        obj.value = res.data as Student[]
    })
}