<template>
    <div>
        <el-result icon="success" title="欢迎注册" sub-title="点击确定激活账号~~">
            <template #extra>
                <el-button type="primary" @click="activeUser">确认激活</el-button>
            </template>
        </el-result>
    </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { activateuser } from '~/api/manager'
import { showModal, toast } from "~/composables/util"
// 使用useRoute获取路由实例
const route = useRoute()
const router = useRouter()

const activeUser = () => {
    // 从route.params中获取uid和token
    const uid = route.params.uid;
    const token = route.params.token;
    // console.log(uid, token);
    // axios.post('',uid, token)
    activateuser(uid, token)
        .then(res => {
            // 登录成功后回到登录页面
            toast('账号激活成功，正在跳转到登录页...')
            setTimeout(() => {
                router.push('/login');
            }, 1500);
            // router.push('/login')
        })
};
</script>