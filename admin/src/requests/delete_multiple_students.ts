import type {Student} from "@/requests/get_students_list";
import {Config} from "@/loadConfig";
import axios from "axios";

export const delete_multiple_students = async (STDList: Student[]) => {
    console.log("Trying to deleting ")
    return await axios.put(`${Config.beServerAddress}/api/v1/std_modify/delete_std`, STDList)
}