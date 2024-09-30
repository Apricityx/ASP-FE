<script setup lang="ts">
import {type Ref, ref} from "vue";
import NewStd from "@/component/newStd.vue";
import type {Student} from "@/requests/get_students_list";

const props = defineProps<{
  closeNewStd: () => void
}>()

const STDList: Ref<Student[]> = ref([]) as Ref<Student[]>
const dialogOpen = ref(false)
const AddSingleStudentFormDom = ref()
const AddSingleStudentForm = ref({
  name: '',
  id: ''
})
const addSingleStudent = async () => {
  const validResult = await AddSingleStudentFormDom.value.validate()
  console.log(validResult)
  if (validResult.valid) {
    dialogOpen.value = false
    STDList.value.push({
      name: AddSingleStudentForm.value.name,
      id: AddSingleStudentForm.value.id
    })
    AddSingleStudentFormDom.value.reset()
  }
}
// 表单验证规则
const validRule = ref({
  nameRules: [
    (value: string) => {
      return !!value || 'Name is required'
    }
  ],
  idRules: [
    (value: string) => {
      return !!value || 'ID is required'
    }
  ]
})
</script>

<template>
  <v-row style="margin-top: 20px">

    <v-col cols="1"></v-col>
    <v-col cols="10">
      <v-card elevation="5" min-height="1000px">
        <template v-slot:title>
          <span class="font-weight-black">新增学生</span>
        </template>
        <template v-slot:append>
          <v-col>
            <v-btn
                color="primary"
                text="Add Student"
                variant="tonal"
                @click="dialogOpen = true"
            />
          </v-col>
          <v-col>
            <v-btn
                color="green"
                text="Submit"
                variant="tonal"
            />
          </v-col>
        </template>
        <v-list select-strategy="classic">
          <v-list-subheader>New Students Buffer</v-list-subheader>
          <v-list-item v-for="STD in STDList" :value="STD.id">
            <template v-slot:prepend="{ isActive }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
              </v-list-item-action>
            </template>
            <v-list-item-title>{{ STD.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ STD.id }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="1"></v-col>
  </v-row>

  <!--对话框-->
  <div class="pa-4 text-center">
    <v-dialog
        v-model="dialogOpen"
        max-width="600"
    >
      <v-card
          prepend-icon="mdi-account"
          title="User Profile"
      >
        <v-card-text>
          <v-form ref="AddSingleStudentFormDom">
            <v-row dense>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                    label="Student Number*"
                    :rules="validRule.idRules"
                    required
                    v-model="AddSingleStudentForm.id"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                    label="Student Name*"
                    :rules="validRule.nameRules"
                    required
                    v-model="AddSingleStudentForm.name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Cancel"
              variant="plain"
              @click="dialogOpen = false"
          ></v-btn>

          <v-btn
              color="primary"
              text="Add"
              variant="tonal"
              @click="addSingleStudent"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>