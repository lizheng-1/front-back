<template>
    <el-row class="min-h-screen bg-indigo-500">
        <el-col :lg="14" :md="12">
            <el-image style="width: 100%; height: 100%" :src="url" />
        </el-col>

        <el-col :lg="10" :md="12" class="bg-light-100 ep-bg-purple flex items-center justify-center flex-col">
            <div class="flg my-12 space-x-4">
                <span class="h-[1px] w-16 bg-gray-200"></span>
                <span class="font-bold text-gray-800 text-3xl ">欢迎注册</span>
                <span class="h-[1px] w-16 bg-gray-200"></span>
            </div>

            <el-form ref="formRef" :rules="rules" :model="form" status-icon class="w-[300px] grid-content">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱">
                        <template #prefix>
                            <el-icon>
                                <Message />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password2">
                    <el-input v-model="form.password2" type="password" show-password placeholder="请再次输入密码">
                        <template #prefix>
                            <el-icon>
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <div class="flg">
                    <el-button type="primary" @click="registerUser" class="w-[250px] rounded-1xl" :loading="loading">
                        立即注册
                    </el-button>
                    <el-button type="primary" @click="$router.push('/login')" class="w-[250px] rounded-1xl"
                        :loading="loading">
                        返回登陆
                    </el-button>
                </div>
            </el-form>
        </el-col>
    </el-row>
</template>


<script setup>
import { ref, reactive } from 'vue'
import { createuser } from '~/api/manager'
import { toast } from '~/composables/util'


const form = reactive({
    username: '',
    email: '',
    password: '',
    password2: ''
})

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (form.password !== '') {
            if (!formRef.value) return
            formRef.value.validateField('checkPass', type = "error")
        }
        callback()
    }
}

const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== form.password) {
        callback(new Error("两次密码不一致"))
    } else {
        callback()
    }
}


const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度在8到16个字符', trigger: 'blur' },
    { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,16}$/, message: '密码必须包含大小写字母、数字和特殊符号的三种' }
    ],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur', },
    { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'], },
    ],
    password2: [{ validator: validatePass2, trigger: 'blur' }]
}


const url = 'https://www.4kbizhi.com/d/file/2024/05/17/small0906512s8uE1715908011.jpg'


const loading = ref(false)
const formRef = ref(null)

const registerUser = () => {
    // console.log(formRef.value);
    formRef.value.validate(valid => {
        if (!valid) {
            return false
        }
        loading.value = true

        // console.log(form.username, form.email, form.password);
        createuser(form.username, form.email, form.password)
            .then(res => {
                // console.log(res)
                // 提示成功
                toast("已发送注册邮件，请确认")
            })
            .catch(err => {
                // console.log(err)
                if (err.response.status === 400) {
                    // console.log(err.message)

                    if (err.response.data.username) { toast(err.response.data.username[0]) }
                    else if (err.response.data.email) { toast(err.response.data.email[0]) }
                }
            })
            .finally(() => {
                loading.value = false
            })
    })
}

</script>
