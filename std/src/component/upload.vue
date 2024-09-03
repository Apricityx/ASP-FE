<script setup lang="ts">
interface Assignment {
  name: string
  total: number
  submitted: number
  isSubmitted: boolean
  deadline: string
  show?: boolean
}

const props = defineProps({
  message: {
    type: String,
    required: true
  }
})
const AM: Assignment = JSON.parse(props.message)
</script>

<template>
  {{ AM.name }}
</template>

<style scoped>

</style>