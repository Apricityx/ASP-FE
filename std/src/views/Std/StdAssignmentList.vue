<script setup lang="ts">

import router from "@/router";
import {ref} from "vue";
import {tr} from "vuetify/locale";
import upload from "@/component/upload.vue";

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

//=======================================================
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
//=======================================================

// AM加上是否折叠字段
for (let AM of AMListModel) {
  AM.show = !AM.isSubmitted;
}
const AMList = ref(AMListModel)

// 当isLoadingAM为T时，按钮和列表都会重新加载
const isLoadingAM = ref(false)
const getAssignments = async () => {
  isLoadingAM.value = true
  setTimeout(() => {
    isLoadingAM.value = false
  }, 2000)

}

const dialog = ref(false)
let uploadAM = {} as Assignment
const openUpload = (AM: Assignment) => {
  uploadAM = AM
  dialog.value = true
}
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        <v-toolbar-title>提交</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <upload :message="JSON.stringify(uploadAM)" />
    </v-card>
  </v-dialog>
  <v-row>
    <v-col cols="12">
      <v-card :elevation="2" height="auto" width="auto" title="作业列表" :loading="isLoadingAM"
              style="user-select: none">
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
                    :color="AM.isSubmitted? 'light-green-lighten-5':'orange-lighten-5'"
            >
              <v-card-item :title="AM.name"
                           @click="AM.show = !AM.show"
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
                <v-card-text>
                  截止日期: {{ AM.deadline }}
                </v-card-text>
              </v-card-item>

              <v-expand-transition>
                <div v-show="AM.show" style="height: 70px;">
                  <v-divider></v-divider>
                  <v-row style="margin: 5px" v-show="AM.isSubmitted">
                    <v-col cols="3">
                      <v-btn block color="light-blue-darken-1" prepend-icon="mdi-upload-off"
                             elevation="0" text="已提交" disabled></v-btn>
                    </v-col>
                    <v-col cols="3">
                      <v-btn
                          block color="light-blue-darken-1" prepend-icon="mdi-pencil"
                          elevation="0" text="修改"
                          @click="openUpload(AM)"
                      ></v-btn>
                    </v-col>
                    <v-col cols="3">
                      <v-btn block color="light-blue-darken-1" prepend-icon="mdi-eye-outline"
                             elevation="0" text="查看"></v-btn>
                    </v-col>
                  </v-row>
                  <v-row style="margin: 5px" v-show="!AM.isSubmitted">
                    <v-col cols="3">
                      <v-btn
                          block color="light-blue-darken-1" prepend-icon="mdi-upload"
                          elevation="0" text="提交"
                          @click="openUpload(AM)"
                      ></v-btn>
                    </v-col>
                    <v-col cols="3">
                      <v-btn block color="light-blue-darken-1" prepend-icon="mdi-pencil"
                             elevation="0" text="修改" disabled></v-btn>
                    </v-col>
                    <v-col cols="3">
                      <v-btn block color="light-blue-darken-1" prepend-icon="mdi-eye-off-outline"
                             elevation="0" text="查看" disabled></v-btn>
                    </v-col>
                  </v-row>
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