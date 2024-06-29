<template>
    <el-container>
        <!-- <h1>首页 </h1> -->
        <el-aside>
            <f-menu></f-menu>
        </el-aside>


        <el-container>
            <el-header>
                <f-header />
            </el-header>

            <el-main>
                <f-tag-list />
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>


<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';

// import { useStore } from "vuex"


// console.log("authStore: ", authStore.user)


</script>