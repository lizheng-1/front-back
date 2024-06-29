<template>
    <!-- <div>
        后台首页
        Admin
        
    </div>
    {{ $store.state.user.username }} -->
    <!-- <Admin /> -->
    <!-- <el-button @click="handleLogout">退出登录</el-button> -->


</template>

<script setup>
import { logout } from "~/api/manager"
import { showModal, toast } from "~/composables/util"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
// import { removeToken } from "~/composables/auth"
import Admin from '~/layouts/admin.vue'

const router = useRouter()
const store = useStore()

// function handleLogout() {
//     showModal("是否退出登录？")
//         .then(res => {
//             logout()
//                 .finally(() => {
//                     // store.dispatch("logout")
//                     removeToken()
//                     // 跳转回登录页
//                     router.push("/login")
//                     // 提示退出登录成功
//                     toast("退出登录成功")
//                 })
//         })
// }
</script>

