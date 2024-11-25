<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import {get_student_list, type Student} from "@/requests/get_students_list";
import newStd from "@/component/newStd.vue";
import {tr} from "vuetify/locale";
import {delete_multiple_students} from "@/requests/delete_multiple_students";

const newStdOpen = ref(false)
const isLoadingStd = ref(true)
const STDList: Ref<Student[]> = ref([])
const getStudents = async () => {
  isLoadingStd.value = true
  await get_student_list(STDList)
  isLoadingStd.value = false
}

onMounted(() => {
  getStudents()
})

// 关闭新建学生对话框的函数
const closeNewStd = () => {
  newStdOpen.value = false
}

// 删除选中的学生
const deleteSelected = async () => {
  const result = await delete_multiple_students(STDList.value.filter((STD) => STD.isActive))
  if (result.status === 200) {
    STDList.value = STDList.value.filter((STD) => !STD.isActive)
  } else {
    alert("Warning: Failed to delete students")
  }
}

const checkIsSelected = (STDList: any) => {
  return STDList.filter((item: any) => item.isActive).length === 0
}

</script>

<template>
  <v-dialog v-model="newStdOpen" transition="dialog-bottom-transition" fullscreen>
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="newStdOpen = false"></v-btn>
        <v-toolbar-title>新增学生</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <newStd :closeNewStd="closeNewStd"/>
    </v-card>
  </v-dialog>
  <v-card title="Students" :loading="isLoadingStd" :disabled="isLoadingStd">
    <template v-slot:append>
      <v-btn
          prepend-icon="mdi-delete"
          color="red"
          text="删除学生"
          variant="outlined"
          @click="deleteSelected()"
          slim
          :disabled="checkIsSelected(STDList)"
      />
      <v-btn
          style="margin-left: 10px"
          prepend-icon="mdi-plus"
          color="primary"
          text="新建学生"
          variant="outlined"
          slim
          @click="newStdOpen = true"
          :disabled="isLoadingStd"
      />
      <v-btn
          style="margin-left: 10px"
          prepend-icon="mdi-refresh"
          color="primary"
          text="刷新"
          variant="outlined"
          slim
          @click="getStudents()"
          :disabled="isLoadingStd"
      />
    </template>
    <v-list select-strategy="classic">
      <v-list-subheader>Group 1</v-list-subheader>
      <v-list-item v-for="STD in STDList" :value="STD.id" :active="STD.isActive"
                   @click="STD.isActive = !STD.isActive">
        <template v-slot:prepend="{isActive}">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="STD.isActive"></v-checkbox-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title>{{ STD.name }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ STD.id }}
        </v-list-item-subtitle>
      </v-list-item>

    </v-list>
  </v-card>
</template>

<style scoped>

</style>