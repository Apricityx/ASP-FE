<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-file-input
                    label="Select a file"
                    v-model="selectedFile"
                    prepend-icon="mdi-paperclip"
                    @change="handleFileUpload"
                ></v-file-input>
            </v-col>
            <v-col cols="12">
                <v-btn
                    color="primary"
                    @click="submitFile"
                    :disabled="!selectedFile"
                >
                    Upload
                </v-btn>
            </v-col>
            <v-col cols="12">
                <v-alert
                    v-if="uploadStatus"
                    type="info"
                    dismissible
                >
                    {{ uploadStatus }}
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';

// 使用 ref 来定义响应式变量
const selectedFile = ref(null);
const uploadStatus = ref('');

// 处理文件选择的函数
const handleFileUpload = (event) => {
    selectedFile.value = event.target.files[0]; // 获取选择的文件
    uploadStatus.value = ''; // 重置上传状态
};

// 提交文件的函数
const submitFile = async () => {
    // 检查是否选择了文件
    if (!selectedFile.value) {
        uploadStatus.value = 'Please select a file first.';
        return;
    }

    // 创建一个 FormData 对象来发送文件
    const formData = new FormData();
    formData.append('file', selectedFile.value);

    try {
        // 发送 POST 请求到后端
        const response = await axios.post('http://localhost:3000/api/v1/files/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // 更新上传状态为响应消息
        uploadStatus.value = response.data.message;
    } catch (error) {
        // 处理上传错误
        uploadStatus.value = 'Upload failed. Please try again.';
    }
};
</script>

