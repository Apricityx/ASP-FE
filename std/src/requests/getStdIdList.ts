import type {Ref} from "vue";

export const getStdIdList = async (obj: Ref) => {
    // 此处需要调用服务器API获取数据
    const stdIdList: string[] = [
        '2019210000',
        '2019210001',
        '2019210002',
        '2019210003',
        '2019210004'
    ]
    stdIdList.sort()
    obj.value = stdIdList
}