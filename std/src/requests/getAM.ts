import axios from "axios";
import {Config} from "@/loadConfig";
import type {Ref} from "vue";

interface AssignmentDetailed {
    name: string
    deadline: string
    show?: boolean
    description: string
}

interface AssignmentPreview {
    name: string
    deadline: string
    show?: boolean
    description: string
    total: string
    submitted: string
}

export const getAMPreview = async (obj: Ref) => {
    axios.get(Config.beServerAddress + "/api/v1/am/get_am?request_type=preview").then((res) => {
        obj.value = res.data as AssignmentPreview[]
    })
}

export const getAMDetailed = async (obj: Ref) => {
    axios.get(Config.beServerAddress + "/api/v1/am/get_am?request_type=detailed").then((res) => {
        obj.value = res.data as AssignmentDetailed[]
    })
}

export type {AssignmentPreview, AssignmentDetailed}