<script setup lang="ts">
import {Config} from "@/loadConfig";
import {ref} from "vue";
import {stdInfo} from "@/requests/getStdInfo";
import type {Assignment} from "@/requests/getAM"
import type { StdInfo } from "@/requests/getStdInfo"

const props = defineProps({
  message: {
    type: String,
    required: true
  }
})
const AM: Assignment = JSON.parse(props.message)
const checkIsOutdated = () => {
  const now = new Date()
  const deadline = new Date(AM.deadline)
  return now > deadline
}

// 表单验证
const valid = ref(true)
const validRule = ref({
  nameRules: [
    (value: string) => {
      return !!value || 'Name is required'
    }
  ]
})
const Form = ref({
  name: '',
  lastname: '',
  email: ''
})
Form.value.name = stdInfo.name
</script>

<template>
  服务器地址：{{ Config.beServerAddress }}
  {{ AM.name }}
  {{ checkIsOutdated() }}
  <v-card
      class="mx-auto"
      prepend-icon="mdi-upload"
      :subtitle="`${AM.name}`"
      width="80%"
  >
    <template v-slot:title>
      <span class="font-weight-black">上传文件</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      <v-card-item>
        <template v-slot:subtitle>
          <v-container v-show="checkIsOutdated()">
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
              <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                  <v-text-field
                      v-model="Form.name"
                      :counter="10"
                      :rules="validRule.nameRules"
                      label="姓名"
                      hide-details
                      required
                      disabled
                  ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                  <v-text-field
                      v-model="lastname"
                      :counter="10"
                      :rules="nameRules"
                      label="Last name"
                      hide-details
                      required
                  ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                  <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      hide-details
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-item>
        </template>
      </v-card-item>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>