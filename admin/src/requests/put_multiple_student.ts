import type {Student} from "@/requests/get_students_list";
import {Config} from "@/loadConfig";
import axios from "axios";

export const put_multiple_student = async (STDList: Student[]) => {
    console.log("Trying to post new std ")
    return await axios.post(`${Config.beServerAddress}/api/v1/std_modify/add_new_std`, STDList)
}