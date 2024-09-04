interface Assignment {
    name: string
    total: number
    submitted: number
    isSubmitted: boolean
    deadline: string
    show?: boolean
}


let AMListModel: Assignment[] = []

//=======================================================
// 模拟数据
AMListModel.push({
    name: 'Assignment1',
    total: 10,
    submitted: 5,
    isSubmitted: false,
    deadline: '2024-9-5'
})
AMListModel.push({
    name: 'Assignment2',
    total: 10,
    submitted: 10,
    isSubmitted: true,
    deadline: '2024-8-3'
})
AMListModel.push({
    name: 'Assignment3',
    total: 10,
    submitted: 2,
    isSubmitted: false,
    deadline: '2024-8-3'
})
//=======================================================

// AM加上是否折叠字段
for (let AM of AMListModel) {
    AM.show = !AM.isSubmitted;
}
export {AMListModel}
export type {Assignment}