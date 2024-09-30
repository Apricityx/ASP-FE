<script setup lang="ts">

import router from "@/router";
import {ref} from "vue";
import {tr} from "vuetify/locale";
import newAM from "@/component/newAM.vue";
import {AMListModel, getAMList} from "@/requests/get_am";
import type {Assignment} from "@/requests/get_am";

const checkIsOutdated = (AMDeadline: string) => {
  const now = new Date()
  const deadline = new Date(AMDeadline)
  return now > deadline
}

const AMList = ref()
// 当isLoadingAM为T时，按钮和列表都会重新加载
const isLoadingAM = ref(false)
const getAssignments = async () => {
  isLoadingAM.value = true
  await getAMList(AMList).then(() => {
    isLoadingAM.value = false
  })
}
getAssignments()

// 控制查看作业的对话框
const checkAMOpen = ref(false)
let currentAM: Assignment
const openCheckAM = (AM: Assignment) => {
  checkAMOpen.value = true
  currentAM = AM
}

// 控制新建作业的对话框
const newAMOpen = ref(false)
const closeNewAM = () => {
  newAMOpen.value = false
}
</script>

<template>
  <v-dialog v-model="checkAMOpen" transition="dialog-bottom-transition" fullscreen>
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="checkAMOpen = false"></v-btn>
        <v-toolbar-title>提交</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
  </v-dialog>

  <v-dialog v-model="newAMOpen" transition="dialog-bottom-transition" fullscreen>
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="newAMOpen = false"></v-btn>
        <v-toolbar-title>新建作业</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <newAM :closeNewAM="closeNewAM"/>
    </v-card>
  </v-dialog>

  <v-row>
    <v-col cols="12">
      <v-card :elevation="2" transition="dialog-bottom-transition" min-height="1000px" height="auto" width="auto"
              title="作业列表" :loading="isLoadingAM" :disabled="isLoadingAM"
              style="user-select: none">
        <template v-slot:append>
          <v-btn
              prepend-icon="mdi-plus"
              color="primary"
              text="新建作业"
              variant="outlined"
              slim
              @click="newAMOpen = true"
              :disabled="isLoadingAM"
          ></v-btn>
          <v-btn
              style="margin-left: 10px"
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
            <v-card v-for="AM in AMList" style="margin-bottom: 2%" hover @click="">
              <v-card-item :title="AM.name"
                           @click="AM.show = !AM.show"
                           :append-icon="AM.show ? 'mdi-chevron-up' : 'mdi-chevron-down'">
                <template v-slot:subtitle>
                  <v-icon
                      class="me-1 pb-1"
                      color='success'
                      icon='mdi-check-circle'
                      size="15"
                  ></v-icon>
                  收集中
                </template>
                <v-card-text>
                  截止日期: {{ AM.deadline }}
                </v-card-text>
              </v-card-item>
              <v-expand-transition>
                <div v-show="AM.show">
                  <v-divider></v-divider>
                  <v-row style="margin:10px">
                    <v-btn block color="light-blue-darken-1" prepend-icon="mdi-eye-off-outline"
                           elevation="0" text="查看"/>
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