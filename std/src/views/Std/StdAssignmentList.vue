<script setup lang="ts">

import router from "@/router";
import {ref} from "vue";
import {tr} from "vuetify/locale";
import Upload from "@/component/upload.vue";
import {type AssignmentDetailed, getAMDetailed} from "@/requests/getAM";

// 检查作业是否逾期未交
const checkIsOutdated = (AMDeadline: string) => {
  const now = new Date()
  const deadline = new Date(AMDeadline)
  return now > deadline
}

const AMList = ref()

// 当isLoadingAM为T时，按钮和列表都会重新加载
const isLoadingAM = ref(false)
const getAssignments = async () => {
  await getAMDetailed(AMList)
  isLoadingAM.value = true
  setTimeout(() => {
    isLoadingAM.value = false
  }, 2000)
}
getAMDetailed(AMList)
const dialog = ref(false)
let uploadAM = {} as AssignmentDetailed
const openUpload = (AM: AssignmentDetailed) => {
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
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        <v-toolbar-title>提交</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <upload :message="JSON.stringify(uploadAM)"/>
    </v-card>
  </v-dialog>


  <v-row>
    <v-col cols="12">
      <v-card :elevation="2" height="auto" width="auto" title="作业列表" :loading="isLoadingAM" :disabled="isLoadingAM"
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
        <v-row style="margin:5px">
          <v-col cols="12">
            <v-card v-for="AM in AMList" style="margin-bottom: 2%"
                    hover
                    @click=""
            >
              <v-card-item :title="AM.name"
                           @click="AM.show = !AM.show"
                           :append-icon="AM.show ? 'mdi-chevron-up' : 'mdi-chevron-down'">
                <template v-slot:subtitle>
                  <v-icon
                      class="me-1 pb-1"
                      :color="checkIsOutdated(AM.deadline) ? 'success': 'blue-darken-1'"
                      :icon="checkIsOutdated(AM.deadline) ? 'mdi-check-circle' : 'mdi-alert-circle'"
                      size="15"
                  ></v-icon>
                  {{ checkIsOutdated(AM.deadline) ? '已完成' : '收集中' }}
                </template>
                <v-divider></v-divider>
                <v-card-text>
                  截止日期: {{ AM.deadline }}
                </v-card-text>
                <v-card-text>
                  {{ AM.description }}
                </v-card-text>
              </v-card-item>

              <v-expand-transition>
                <div v-show="AM.show" style="height: 70px;">
                  <v-divider></v-divider>
                  <v-row style="margin:5px">
                    <v-col block>
                      <v-btn block color="light-blue-darken-1" prepend-icon="mdi-upload"
                             elevation="0" text="提交" @click="openUpload(AM)"></v-btn>
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