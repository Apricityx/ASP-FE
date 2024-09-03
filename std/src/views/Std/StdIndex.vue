<script setup lang="ts">
import {ref} from 'vue'
import router from "@/router";
import axios, {all} from 'axios'
import {tr} from "vuetify/locale";


interface StdInfo {
    name: string
    number: number
}

interface Assignment {
    name: string
    total: number
    submitted: number
    isSubmitted: boolean
    deadline: string
    show?: boolean
}

let AMListModel: Assignment[] = []

// 模拟数据
const stdInfo: StdInfo = {
    name: 'Student1',
    number: 123
}
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
// AM加上是否折叠字段
for (let AM of AMListModel) {
    AM.show = false
}
// 计算总进度条
// 获取当前月份
let date = new Date()

interface Counter {
    submitted: number
    unSubmitted: number
    assignment_progress: number
}

const monthCounter: Counter = {
    submitted: 0,
    unSubmitted: 0,
    assignment_progress: 0
}
const allCounter: Counter = {
    submitted: 0,
    unSubmitted: 0,
    assignment_progress: 0
}


for (let AM of AMListModel) {
    if (AM.isSubmitted) {
        allCounter.submitted++
        if (date.getMonth() === new Date(AM.deadline).getMonth() && date.getFullYear() === new Date(AM.deadline).getFullYear()) {
            monthCounter.submitted++
        }
    } else {
        allCounter.unSubmitted++
        if (date.getMonth() === new Date(AM.deadline).getMonth() && date.getFullYear() === new Date(AM.deadline).getFullYear()) {
            monthCounter.unSubmitted++
        }
    }
}
allCounter.assignment_progress = allCounter.submitted / (allCounter.submitted + allCounter.unSubmitted) * 100
monthCounter.assignment_progress = monthCounter.submitted / (monthCounter.submitted + monthCounter.unSubmitted) * 100
// 保留1位小数
allCounter.assignment_progress = Math.round(allCounter.assignment_progress * 10) / 10
monthCounter.assignment_progress = Math.round(monthCounter.assignment_progress * 10) / 10
console.log(monthCounter)
console.log(allCounter)
// 定义OverView显示模式
const isShowAsMonth = ref(false)
// 转换Counter为ref
const getCount = () => {
    if (isShowAsMonth.value) {
        return monthCounter
    } else {
        return allCounter
    }
}
// 将AMList转换为ref供可响应变量使用
const AMList = ref(AMListModel)


</script>

<template>
    <v-row>
        <v-col cols="5">
            <!--                主仪表盘 作业完成情况-->

            <v-card class="mx-auto" width="auto" border flat>
                <v-list-item class="px-6" height="88">
                    <template v-slot:prepend>
                        <v-avatar color="surface-light" size="32">🎯</v-avatar>
                    </template>
                    <template v-slot:title>{{ isShowAsMonth ? '本月作业完成情况' : '所有作业完成情况' }}</template>
                </v-list-item>

                <v-divider></v-divider>

                <v-card-text class="text-medium-emphasis pa-6">
                    <div class="text-h4 font-weight-black mb-4">{{ getCount().assignment_progress }}%</div>

                    <v-progress-linear
                        bg-color="surface-variant"
                        class="mb-6"
                        color="primary"
                        height="10"
                        :model-value="getCount().assignment_progress"
                        rounded="pill"

                    ></v-progress-linear>

                    <div>
                        {{ `${getCount().submitted}/${getCount().submitted + getCount().unSubmitted}` }}
                    </div>
                </v-card-text>
                <template v-slot:actions>
                    <v-btn :text="(isShowAsMonth)? '显示全部':'按月显示'"
                           variant="outlined"
                           color="primary"
                           @click="isShowAsMonth = !isShowAsMonth"></v-btn>
                </template>
            </v-card>
        </v-col>
        <v-col cols="7">
            <v-card :elevation="2" height="auto" width="auto" title="作业概览">
                <template v-slot:append>
                    <v-btn
                        prepend-icon="mdi-open-in-new"
                        color="primary"
                        text="前往提交"
                        variant="outlined"
                        slim
                        @click="router.push('/std/assignments')"
                    ></v-btn>
                </template>
                <v-row style="margin:0 2% 2% 2%">
                    <v-col cols="12">
                        <v-card v-for="AM in AMList" style="margin-bottom: 2%"
                                :color="AM.isSubmitted? 'light-green-lighten-5':'pink-lighten-5'" hover
                                @click="AM.show = !AM.show"
                        >
                            <v-card-item :title="AM.name" :append-icon="AM.show ? 'mdi-chevron-up' : 'mdi-chevron-down'">
                                <template v-slot:subtitle>
                                    <v-icon
                                        class="me-1 pb-1"
                                        :color="AM.isSubmitted ? 'success': 'warning'"
                                        :icon="AM.isSubmitted ? 'mdi-check-circle' : 'mdi-alert-circle'"
                                        size="15"
                                    ></v-icon>
                                    {{ AM.isSubmitted ? '已提交' : '未提交' }}
                                </template>
                            </v-card-item>

                            <v-expand-transition>
                                <div v-show="AM.show">
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        ({{ AM.submitted }}/{{ AM.total }}) 已提交
                                        <v-progress-linear
                                            color="light-blue"
                                            height="5"
                                            :model-value="AM.submitted / AM.total * 100"
                                            striped
                                        ></v-progress-linear>
                                    </v-card-text>
                                </div>
                            </v-expand-transition>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>

</template>

<style scoped>

</style>