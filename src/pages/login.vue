<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="flg">
      <div>
        <div class="font-bold text-light-50 text-5xl tracking-widest mb-4">欢迎光临</div>
        <div class="text-light-50 ">你好！！！！</div>
      </div>
    </el-col>

    <el-col :lg="8" :md="12" class="flg bg-neutral-50  flex-col ">
      <h2 class="font-bold text-gray-800 text-3xl">欢迎回来</h2>

      <div class="flg my-5 space-x-4">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登陆</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>

      <el-form ref="formRef" :rules="rules" :model="form" class="w-[300px]">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" clearable placeholder="请输入用户名">

            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
            <template #prefix>
              <el-icon>
                <lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <div class="flg space-x-6">
          <el-button type="primary" @click="onSubmit" class="w-[120px] rounded-1xl" :loading="loading">
            登陆
          </el-button>
          <el-button type="primary" @click="$router.push('/register')" class="w-[120px] rounded-1xl">
            注册
          </el-button>
        </div>

      </el-form>

    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { login, getinfo } from '~/api/manager'
// import { setToken } from '~/composables/auth'
import { toast } from '~/composables/util'
import { useStore } from 'vuex'
import { useAuthStore } from "~/store/auth"

import { useRouter } from 'vue-router'


const router = useRouter()

const authStore = useAuthStore()
const store = useStore()
const loading = ref(false)
// do not use same name with ref
const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' },
  ]
}

const formRef = ref(null)
// 登陆功能
const onSubmit = () => {
  formRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    loading.value = true

    // store.dispatch("login", form).then(res => {
    //   toast("登录成功")
    //   router.push("/")
    // }).finally(() => {
    //   loading.value = false
    // })

    login(form.username, form.password)
      .then(res => {
        // 存储token和用户相关信息
        authStore.setUserToken(res.user, res.token);

        // console.log("res: ", res)
        // setToken(res.token)
        // 保存用户相关信息
        // store.commit("SET_USERINFO", res.user)

        // 跳转到后台首页
        router.push("/")
        // 提示成功
        toast("登录成功")
      })
      .catch(err => {
        console.log("err: ", err);
        toast("账号或密码错误", "error")
      })
      .finally(() => {
        loading.value = false
      })

  })
}

// 监听回车事件
function onKeyUp(e) {
  if (e.key == "Enter") onSubmit()
}
// 添加键盘监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp)
})
// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp)
})

</script>


<style>
.login-container {
  @apply min-h-screen bg-indigo-500;
}

.flg {
  @apply flex items-center justify-center;
}
</style>