<script setup lang="ts">

import router from "@/router";
import {ref} from "vue";
import {tr} from "vuetify/locale";
// 当isLoadingAM为T时，按钮和列表都会重新加载
const isLoadingAM = ref(false)
const getAssignments = async () => {
    isLoadingAM.value = true
    setTimeout(() => {
        isLoadingAM.value = false
    }, 2000)
}

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
const AMList = ref(AMListModel)

</script>

<template>
    <v-row>
        <v-col cols="8">
            <v-card :elevation="2" height="auto" width="auto" title="作业列表" :loading="isLoadingAM">
                <template v-slot:append>
                    <v-btn
                        prepend-icon="mdi-refresh"
                        color="primary"
                        text="刷新"
                        variant="outlined"
                        slim
                        @click="getAssignments()"
                        :disabled="isLoadingAM"
                    ></v-btn>
                </template>
                <v-row style="margin:0 2% 2% 2%">
                    <v-col cols="12">
                        <v-card v-for="AM in AMList" style="margin-bottom: 2%"
                                :color="AM.isSubmitted? 'light-green-lighten-5':'pink-lighten-5'" hover
                                @click="AM.show = !AM.show"
                        >
                            <v-card-item :title="AM.name"
                                         :append-icon="AM.show ? 'mdi-chevron-up' : 'mdi-chevron-down'">
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
        <v-col cols="4">

        </v-col>
    </v-row>
</template>

<style scoped>

</style>