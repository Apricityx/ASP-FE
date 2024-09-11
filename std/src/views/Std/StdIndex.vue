<script setup lang="ts">
import {ref} from 'vue'
import router from "@/router";
import {tr} from "vuetify/locale";
import {AMListModel, type Assignment} from "@/requests/getAM";
import {switchMonthCounter, switchAllCounter, type SubmitCounter} from "@/requests/getAMCounter";
import {all} from "axios";
import {red} from "vuetify/util/colors";

// 计算总进度条

// 定义OverView显示模式
const isShowAsMonth = ref(false)
// 转换Counter为ref

const getCount = ref({} as SubmitCounter)
// 获取Counter
let monthCounter: SubmitCounter = {
  assignment_progress: -1,
  submitted: -1,
  unSubmitted: -1
}
let allCounter: SubmitCounter = {
  assignment_progress: -1,
  submitted: -1,
  unSubmitted: -1
}
const counterLoading = ref(true)
switchAllCounter(getCount).then(() => {
  counterLoading.value = false
  allCounter = getCount.value
})

const changeCountType = () => {
  counterLoading.value = true
  if (!isShowAsMonth.value) {
    if (monthCounter.assignment_progress === -1) {
      switchMonthCounter(getCount).then(() => {
        counterLoading.value = false
        monthCounter = getCount.value
      })
    } else {
      getCount.value = monthCounter
      counterLoading.value = false
    }
  } else {
    if (allCounter.assignment_progress === -1) {
      switchAllCounter(getCount).then(() => {
        counterLoading.value = false
        allCounter = getCount.value
      })
    } else {
      getCount.value = allCounter
      counterLoading.value = false
    }
  }
  isShowAsMonth.value = !isShowAsMonth.value
}

// 将AMList转换为ref供可响应变量使用
const AMList = ref(AMListModel)
</script>

<template>
  <v-row>
    <v-col>
      <!--                主仪表盘 作业完成情况-->
      <v-card class="mx-auto" width="auto" style="margin-bottom: 20px" elevation="1">
        <v-list-item class="px-6" height="88">
          <template v-slot:prepend>
            <v-avatar color="surface-light" size="32">🎯</v-avatar>
          </template>
          <template v-slot:title>{{ isShowAsMonth ? '本月作业完成情况' : '所有作业完成情况' }}</template>
        </v-list-item>

        <v-divider></v-divider>

        <v-card-text class="text-medium-emphasis pa-6">
          <div class="text-h4 font-weight-black mb-4">{{ counterLoading ? '- -' : getCount.assignment_progress + '%' }}</div>

          <v-progress-linear
              bg-color="surface-variant"
              class="mb-6"
              color="primary"
              height="10"
              :model-value="getCount.assignment_progress"
              rounded="pill"
              :indeterminate="counterLoading"
          ></v-progress-linear>

          <div>
            {{ counterLoading ? '- -' : `${getCount.submitted}/${getCount.submitted + getCount.unSubmitted}` }}
          </div>
        </v-card-text>
        <template v-slot:actions>
          <v-btn :text="(isShowAsMonth)? '显示全部':'按月显示'"
                 variant="outlined"
                 :loading="counterLoading"
                 color="primary"
                 @click="changeCountType()"></v-btn>
        </template>
      </v-card>
      <v-card elevation="1" height="auto" width="auto" title="作业概览" style="user-select: none">
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
                    hover
                    variant="elevated"
                    @click="AM.show = !AM.show"
                    elevation="2"
            >
              <v-card-item :title="AM.name" :append-icon="AM.show ? 'mdi-chevron-up' : 'mdi-chevron-down'">
                <template v-slot:subtitle>
                  <v-icon
                      class="me-1 pb-1"
                      :color="AM.total === AM.submitted ? 'green-lighten-1': 'light-blue-lighten-4'"
                      :icon="AM.total === AM.submitted ? 'mdi-check-circle' : 'mdi-alert-circle'"
                      size="15"
                  ></v-icon>
                  {{ AM.total === AM.submitted ? '已完成' : '收集中' }}
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