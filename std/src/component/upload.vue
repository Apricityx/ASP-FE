<script setup lang="ts">
import {Config} from "@/loadConfig";
import {type Ref, ref} from "vue";
import type {Assignment} from "@/requests/getAM"
import {getStdIdList} from "@/requests/getStdIdList";
import {getStdName} from "@/requests/getStdName";
import axios from "axios";
import {tr} from "vuetify/locale";
// 消息条
const snackbar = ref(false)
const snackbarTitle = ref('')
const snackbarSubtitle = ref('')
const newMessage = (title: string, subtitle: string, type: "warning" | "info") => {
  snackbar.value = true
  snackbarTitle.value = title
  snackbarSubtitle.value = subtitle
}
// Switcher
const switcher = ref(true)
const formDom = ref()
const props = defineProps({
  message: {
    type: String,
    required: true
  }
})
const AM: Assignment = JSON.parse(props.message)
const checkIsOutdated = () => {
  const now = new Date()
  const deadline = new Date(AM.deadline)
  return now > deadline
}

// 表单验证
const valid = ref(false)
const loadingName = ref(false)
const validRule = ref({
  nameRules: [
    (value: string) => {
// 获取学生姓名
      return !!value || 'Name is required'
    }
  ],
  idRules: [
    (value: string) => {
      if (!value) {
        searchNameDisabled.value = false
      }
      return !!value || '请填写ID'
    }
  ],
  fileRules: [
    (value: any) => {
      return !!value[0] || '请上传文件'
    }
  ]
})
const Form = ref({
  name: '',
  id: '',
  file: []
})
Form.value.id = undefined as unknown as string
// 获取学生ID
const stdID: Ref<string[]> = ref([])
getStdIdList(stdID)
// 提交文件
// 遮罩层

const submitLoading = ref(false)
const validate = async () => {
  const {valid} = await formDom.value.validate();
  return valid
};
const submitFile = async (AM: Assignment) => {
  if (!await validate()) {

    return
  }
  submitLoading.value = true
  const formData = new FormData();
  console.log(AM);
  formData.append('id', Form.value.id);
  formData.append('name', Form.value.name);
  formData.append('assignment_id', AM.name);
  if (Form.value.file && Form.value.file.length > 0) {
    Form.value.file.forEach((file) => {
      formData.append('file', file);
    });
  }

  try {
    const response = await axios.post(Config.beServerAddress + '/api/v1/files/upload_file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('上传成功', response.data);
    submitLoading.value = false
    newMessage("作业提交成功", "如需修改请再次提交", "info")
  } catch (error) {
    console.error('上传失败', error);
    newMessage("作业提交失败", "请稍后再试或联系管理员", "warning")
    submitLoading.value = false
  }
}
// 自动填充姓名
const searchNameDisabled = ref(true)
const loadStdName = async () => {
  if (switcher.value) {
    searchNameDisabled.value = true
    loadingName.value = true
    const getStdNameStatus = await getStdName(Form, Form.value.id, loadingName)
    loadingName.value = false
    searchNameDisabled.value = false
    if (!getStdNameStatus) {
      newMessage("查询失败", "ID不存在或服务器连接失败", "warning")
    }
  }
}
let idNow = ''
setInterval(() => {
  if (idNow !== Form.value.id) {
    idNow = Form.value.id
    if (idNow) {
      loadStdName()
    }
  }
}, 3000)
</script>

<template>
  <v-snackbar
      v-model="snackbar"
      location="end top"
  >
    <div class="text-subtitle-1 pb-2">{{ snackbarTitle }}</div>
    <p>{{ snackbarSubtitle }}</p>
    <template v-slot:actions>
      <v-btn
          color="indigo"
          variant="text"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <!--  服务器地址：{{ Config.beServerAddress }}-->
  <!--  {{ AM.name }}-->
  <!--  {{ checkIsOutdated() }}-->
  <v-card
      class="mx-auto mt-5"
      prepend-icon="mdi-upload"
      :subtitle="`${AM.name}`"
      width="80%"
  >
    <template v-slot:title>
      <span class="font-weight-black">上传文件</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      <v-card-item>
        <template v-slot:subtitle>
          <v-container v-show="checkIsOutdated()">
            <v-icon
                class="me-1 pb-1"
                color="error"
                icon="mdi-alert"
                size="18"
            ></v-icon>
            此作业已超过提交截止时间，有可能不会查阅你的作业
          </v-container>

          <v-card-actions>
            <v-switch label="自动填充名字"
                      color="primary"
                      v-model="switcher"
            ></v-switch>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-item>
            <v-form ref="formDom">
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      md="4"
                  >
                    <v-combobox
                        v-model="Form.id"
                        :counter="10"
                        :rules="validRule.idRules"
                        label="ID"
                        :items="stdID"
                        hide-details
                        required
                    ></v-combobox>
                  </v-col>

                  <v-col
                      cols="12"
                      md="4"
                  >
                    <v-text-field
                        v-model="Form.name"
                        :loading="loadingName"
                        :counter="10"
                        :rules="validRule.nameRules"
                        label="姓名"
                        hide-details
                        required
                        :disabled="searchNameDisabled"
                    ></v-text-field>
                  </v-col>

                  <v-col
                      cols="12"
                      md="4"
                  >
                    <v-file-input
                        label="上传文件"
                        v-model="Form.file"
                        :rules="validRule.fileRules"
                        chips
                        counter
                        multiple
                        show-size
                    />
                  </v-col>
                </v-row>
                <!--                <v-row style="margin-bottom: 10px">-->
                <!--                  <v-btn-->
                <!--                      block-->
                <!--                      color="primary"-->
                <!--                      @click="loadStdName()"-->
                <!--                      :disabled="searchNameDisabled"-->
                <!--                      text="查询名字"-->
                <!--                  />-->
                <!--                </v-row>-->
                <v-row>
                  <v-btn
                      block
                      color="primary"
                      @click="submitFile(AM)"
                      :loading="submitLoading"
                  >提交
                  </v-btn>
                </v-row>
              </v-container>
            </v-form>
          </v-card-item>
        </template>
      </v-card-item>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>