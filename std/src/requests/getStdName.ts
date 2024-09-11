import type {Ref} from "vue";
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
    if (!stdID){
        return
    }
    loadingName.value = true
    obj.value.name = ""
    await sleep(1000)
    obj.value.name = "张三"
}