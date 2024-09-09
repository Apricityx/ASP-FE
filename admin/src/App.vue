<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {ref} from 'vue'
import router from "@/router";

const drawerOpen = ref(true)
// HELLO
const getGreeting = () => {
  const timeNow = new Date().getHours()
  if (timeNow < 12) {
    return 'Morning'
  } else if (timeNow < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}
</script>
<template>
  <!--    上传文件-->

  <v-layout class="rounded rounded-md">
    <v-navigation-drawer v-model="drawerOpen">
      <v-list-item :title="getGreeting() + ' Apricityx'" subtitle="Student"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Overview" @click="router.push('/')"></v-list-item>
      <v-list-item link title="Assignments" @click="router.push('/assignments')"></v-list-item>
    </v-navigation-drawer>

    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Application Bar</v-app-bar-title>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center mx-auto" style="min-height: 1000px;background-color: #fafafa">
      <v-spacer style="margin: 10px"><RouterView/></v-spacer>
    </v-main>
  </v-layout>
</template>

<style scoped>
</style>
