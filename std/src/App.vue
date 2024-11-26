<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {ref} from 'vue'
import router from "@/router";
import {Config} from "./loadConfig";

const drawerOpen = ref(true)
const Std = ref()
// 新增一个字段
Std.value = {
  // name: 'Student1'
  name: ''
}
Std.value.number = 123
// HELLO
const getGreeting = () => {
  const timeNow = new Date().getHours()
  if (timeNow < 12) {
    return '早上好'
  } else if (timeNow < 18) {
    return '中午好'
  } else {
    return '晚上好'
  }
}
// 确定页面
const page = ref('stdIndex')
</script>
<template>
  <!--    上传文件-->

  <v-layout class="rounded rounded-md">
    <v-navigation-drawer v-model="drawerOpen">
      <v-list>
        <v-list-item :title="getGreeting() + ' ' + Std.name" subtitle="SE34s" style="margin: 10px"/>
        <v-divider></v-divider>
<!--        <v-list-item link-->
<!--                     title="概览"-->
<!--                     key="1"-->
<!--                     value="1"-->
<!--                     active-color="primary"-->
<!--                     @click="()=>{-->
<!--        router.push('/std')-->
<!--        page = 'stdIndex'-->
<!--      }">-->
<!--          <template v-slot:prepend>-->
<!--            <v-icon>mdi-view-dashboard</v-icon>-->
<!--          </template>-->
<!--        </v-list-item>-->
        <v-list-item link title="作业"
                     key="2"
                     active-color="primary"
                     value="2"
                     @click="()=>{
        router.push('/SE34/assignments')
        page = 'stdAssignmentsList'
      }" >
          <template v-slot:prepend>
            <v-icon>mdi-book-open-variant</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>{{Config.title}}</v-app-bar-title>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center mx-auto" style="background-color: #fafafa">
      <v-spacer style="margin: 10px">
        <RouterView/>
      </v-spacer>
    </v-main>
  </v-layout>
</template>

<style scoped>
</style>
