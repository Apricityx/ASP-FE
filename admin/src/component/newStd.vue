<script setup lang="ts">
import {type Ref, ref} from "vue";
import type {Student} from "@/requests/get_students_list";
import ExcelJS from 'exceljs';
import {Config} from "@/loadConfig";
import {put_multiple_student} from "@/requests/put_multiple_student";

const props = defineProps<{
  closeNewStd: () => void
}>()

// 单个学生
const STDList: Ref<Student[]> = ref([]) as Ref<Student[]>
const addSingleDialogOpen = ref(false)
const AddSingleStudentFormDom = ref()
const AddSingleStudentForm = ref({
  name: '',
  id: '',
  isActive: true
})
const addSingleStudent = async () => {
  const validResult = await AddSingleStudentFormDom.value.validate()
  if (validResult.valid) {
    addSingleDialogOpen.value = false
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
// 多个学生
const addMultipleDialogOpen = ref(false)
const newStudentFormFile = ref()
// 检查文件后缀
const checkFileSuffix = (file: File) => {
  if (!file) {
    return true
  }
  const suffix = file.name.split('.').pop()
  return !(suffix === 'xlsx' || suffix === 'csv')
}
// 读取Excel文件，转换为JSON
const excelFileToJSON = async (file: File): Promise<any> => {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result as ArrayBuffer;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(data);
      const worksheet = workbook.getWorksheet('Sheet1');
      if (worksheet) {
        const json = worksheet.getSheetValues();
        // 删除JSON中的第一个元素
        json.shift();
        json.shift();
        resolve(json);
      } else {
        reject(new Error('Sheet1 not found'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}


// 将文件中的学生信息加载到STDList中
const loadStudentsData = async (file: File) => {
  const studentData = await excelFileToJSON(file);
  for (const student of studentData) {
    STDList.value.push({
      name: student[2],
      id: student[1],
      isActive: true
    });
  }
  addMultipleDialogOpen.value = false;
  newStudentFormFile.value = null;
}

// 删除选中的学生
const deleteSelected = () => {
  for (let i = STDList.value.length - 1; i >= 0; i--) {
    if (STDList.value[i].isActive) {
      STDList.value.splice(i, 1);
    }
  }
}

const checkIsSelected = () => {
  return STDList.value.filter((item) => item.isActive).length === 0
}
const submit = async () => {
  const finalSubmitList: Student[] = []
  for (let i = STDList.value.length - 1; i >= 0; i--) {
    if (STDList.value[i].isActive) {
      finalSubmitList.push({
        name: STDList.value[i].name,
        id: STDList.value[i].id as string
      })
    }
  }
  const result = await put_multiple_student(finalSubmitList)
  if (result.status === 200) {
    for (let i = STDList.value.length - 1; i >= 0; i--) {
      if (STDList.value[i].isActive) {
        STDList.value.splice(i, 1);
      }
    }
  }
}
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
                color="red"
                text="Delete"
                variant="tonal"
                @click="deleteSelected()"
                :disabled="checkIsSelected()"
            />
          </v-col>
          <v-col>
            <v-btn
                color="primary"
                text="Add Student From File"
                variant="tonal"
                @click="addMultipleDialogOpen = true"
            />
          </v-col>
          <v-col>
            <v-btn
                color="primary"
                text="Add Student"
                variant="tonal"
                @click="addSingleDialogOpen = true"
            />
          </v-col>
          <v-col>
            <v-btn
                color="green"
                text="Submit"
                variant="tonal"
                :disabled="checkIsSelected()"
                @click="submit()"
            />
          </v-col>
        </template>
        <v-list select-strategy="classic">
          <v-list-subheader>New Students Buffer</v-list-subheader>
          <v-list-item v-for="STD in STDList" :value="STD.id" :active="STD.isActive"
                       @click="STD.isActive = !STD.isActive">
            <!--            todo-->
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
    </v-col>
    <v-col cols="1"></v-col>
  </v-row>

  <!--对话框-->
  <div class="pa-4 text-center">
    <v-dialog
        v-model="addSingleDialogOpen"
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
              @click="addSingleDialogOpen = false"
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
    <v-dialog
        v-model="addMultipleDialogOpen"
        max-width="600"
    >
      <v-card
          prepend-icon="mdi-account"
          title="User Profile"
      >
        <template v-slot:actions>
          <v-btn
              block
              variant="flat"
              text="You can get an example file by clicking here"
              :href="`${Config.beServerAddress}/download/Students.xlsx`"
          />
        </template>
        <v-card-text>
          <!--            todo-->

          <v-row dense>
            <v-file-input
                label="Excel File*"
                required
                v-model="newStudentFormFile"
            ></v-file-input>
          </v-row>
          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Cancel"
              variant="plain"
              @click="addMultipleDialogOpen = false"
          ></v-btn>

          <v-btn
              color="primary"
              text="Add"
              variant="tonal"
              @click="loadStudentsData(newStudentFormFile)"
              :disabled="checkFileSuffix(newStudentFormFile)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>