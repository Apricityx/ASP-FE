<script setup lang="ts">
import {Config} from "@/loadConfig";
import {ref} from "vue";
import {stdInfo} from "@/requests/getStdInfo";
import type {Assignment} from "@/requests/getAM"
import type {StdInfo} from "@/requests/getStdInfo"
import {tr} from "vuetify/locale";

// 表单验证
const valid = ref(false)
const validRule = ref({
  nameRules: [
    (value: string) => {
      if (value.length > 0) {
        return true
      } else {
        return '作业名不能为空'
      }
    }
  ],
  monthRules: [
    (value: number) => {
      if (Form.value.AMDeadlineYear > timeNow.getFullYear()) {
        return true
      } else if (value > timeNow.getMonth()) {
        return true
      }
      return "不可设置为过去的时间"
    }
  ],
  dayRules: [
    (value: number) => {
      if (Form.value.AMDeadlineMonth === timeNow.getMonth() + 1) {
        if (value >= timeNow.getDate()) {
          return true
        } else {
          return "不可设置为过去的时间"
        }
      } else {
        return true
      }
    }
  ],
  hourRules: [
    (value: number) => {
      if (Form.value.AMDeadlineDay === timeNow.getDate()) {
        if (value > timeNow.getHours()) {
          return true
        } else {
          return "不可设置为过去的时间"
        }
      } else {
        return true
      }
    }
  ],
  DescriptionRules: [
    (value: string) => {
      return !!value || 'Description is required'
    }
  ]
})

const Form = ref({
  AMName: '',
  AMDeadlineYear: 2024,
  AMDeadlineMonth: 1,
  AMDeadlineDay: 1,
  AMDescription: '',
  AMDeadlineHour: 1,
})
// 提交表单
const submitAM = () => {

}

const timeNow = new Date()
Form.value.AMDeadlineYear = timeNow.getFullYear()
Form.value.AMDeadlineMonth = timeNow.getMonth() + 1
Form.value.AMDeadlineDay = timeNow.getDate()
Form.value.AMDeadlineHour = timeNow.getHours() === 23 ? 23 : timeNow.getHours() + 1
const generateDay = () => {
  const month = Form.value.AMDeadlineMonth
  if (month === 2) {
    if (Form.value.AMDeadlineYear % 4 === 0) {
      return 29
    } else {
      return 28
    }
  } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    return 31
  } else {
    return 30
  }
}
</script>

<template>
  服务器地址：{{ Config.beServerAddress }}
  <v-card
      class="mx-auto"
      prepend-icon="mdi-plus-box"
      width="80%"
  >
    <template v-slot:title>
      <span class="font-weight-black">新建作业</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      <v-card-item>
        <template v-slot:subtitle>
          <v-container v-show="true">
            <v-icon
                class="me-1 pb-1"
                color="error"
                icon="mdi-alert"
                size="18"
            ></v-icon>
            此作业已超过提交截止时间，有可能不会查阅你的作业
          </v-container>
          <v-divider></v-divider>

          <v-card-item>
            <v-container>
              <v-form>
                <v-row>
                  <v-col
                      cols="12"
                      md="4"
                  >
                    <v-text-field
                        v-model="Form.AMName"
                        :counter="10"
                        :rules="validRule.nameRules"
                        label="作业名"
                        hide-details
                        required
                    ></v-text-field>
                  </v-col>

                  <v-col
                      cols="12"
                      md="4"
                  >
                    <v-select
                        v-model="Form.AMDeadlineYear"
                        label="年"
                        :items="Array.from({length: 10}, (v, k) => timeNow.getFullYear() + k)"
                    />
                    <v-select
                        v-model="Form.AMDeadlineMonth"
                        label="月"
                        :items="Array.from({length: 12}, (v, k) => 1 + k)"
                        :rules="validRule.monthRules"
                    />
                    <v-select
                        v-model="Form.AMDeadlineDay"
                        label="日"
                        :items="Array.from({length: generateDay()}, (v, k) => 1 + k)"
                        :rules="validRule.dayRules"
                    />
                    <v-select
                        v-model="Form.AMDeadlineHour"
                        label="时"
                        :items="Array.from({length:24}, (v, k) => k)"
                        :rules="validRule.hourRules"
                    />

                  </v-col>

                  <v-col
                      cols="12"
                      md="4"
                  >
                    <v-textarea
                        label="作业详情"
                        v-model="Form.AMDescription"
                        auto-grow
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-btn
                    @click="submitAM"
                    block
                    text="提交"
                />
              </v-form>
            </v-container>
          </v-card-item>
        </template>
      </v-card-item>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>