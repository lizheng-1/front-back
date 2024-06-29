<template>
    <div class="f-header">
        <span class="w-250px  flex justify-center items-center text-xl font-thin">
            <el-icon class="mr-2">
                <eleme-filled />
            </el-icon>
            header
        </span>
        <el-tooltip content="收放侧边栏" placement="bottom" effect="light">
            <el-icon class="icon1">
                <Fold />
            </el-icon>
        </el-tooltip>

        <el-tooltip content="刷新" placement="bottom" effect="light">
            <el-icon class="icon1" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center">
            <el-tooltip content="全屏" placement="bottom" effect="light">
                <el-icon class="icon1" @click="toggle">
                    <full-screen v-if="!isFullscreen" />
                    <aim v-else />
                </el-icon>
            </el-tooltip>

            <el-dropdown @command="handleCommand">
                <span class="mr-2 flex items-center text-light-50">
                    <el-avatar class='mr-2' :size="50" :src="imgurl" />
                    [{{ authStore.user.department.name }}]{{ authStore.user.realname }}
                    <el-icon :size="25" class="el-icon--right">
                        <arrow-down />
                    </el-icon>

                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>


    </div>
</template>


<script setup>
import { Refresh } from '@element-plus/icons-vue';
// import { logout } from "~/api/manager"

// import { ref } from 'vue';
const imgurl = "https://ts1.cn.mm.bing.net/th/id/R-C.dca588e1c0d9a22a1167c0a80a02f33d?rik=d0bq%2fhmSdw4aPg&riu=http%3a%2f%2fpic.imeitou.com%2fuploads%2fallimg%2f2021050608%2fztteu4dyzwo.jpg&ehk=iOceC%2bkhW6n9LAoUK%2bQ2FZyijEAwWp1yuWruRMMKaU0%3d&risl=&pid=ImgRaw&r=0"
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore()
import { useRouter } from 'vue-router'
import { toast } from '~/composables/util'

const router = useRouter()


const handleRefresh = () => location.reload()

import { useFullscreen } from '@vueuse/core'
const {
    // 是否全屏状态
    isFullscreen,
    // 切换全屏
    toggle
} = useFullscreen()


const handleCommand = (c) => {
    switch (c) {
        case "logout":
            authStore.clearUserToken();
            console.log("退出登录");

            router.push("/login")
            toast('退出登录成功')

            // handleLogout()
            break;
        case "rePassword":
            console.log("修改密码");
            break;
    }
}

// function handleLogout() {
//     showModal("是否要退出登录？").then(res => {
//         logout()
//             .finally(() => {
//                 store.dispatch("logout")
//                 // 跳转回登录页
//                 router.push("/login")
//                 // 提示退出登录成功
//                 toast("退出登录成功")
//             })
//     })
// }


</script>


<style scoped>
.f-header {
    @apply flex items-center bg-indigo-500 text-light-50 justify-between fixed top-0 left-0 right-0 h-16;
}

.icon1 {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon1:hover {
    @apply bg-indigo-600
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>