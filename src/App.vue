<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar title="Application bar"></v-app-bar>

        <v-navigation-drawer>
            <nav>
                <RouterLink to="/std">OverView</RouterLink>
                <RouterLink to="/std/assignments">Assignments</RouterLink>
            </nav>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <RouterView/>
        </v-main>
    </v-layout>
</template>

<style scoped>
</style>
