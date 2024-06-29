import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 定义常量，用于localStorage中存储用户和token的键名
const USER_KEY = "OA_USER_KEY"
const TOKEN_KEY = "OA_TOKEN_KEY"

// 定义一个 Pinia store，命名为'auth' Pinia store 是一种用于 Vue.js 应用的轻量级状态管理库，它允许你定义和管理应用的状态，并提供响应式的更新和计算属性。
export const useAuthStore = defineStore('auth', () => {
  // 使用ref创建响应式引用，存储用户信息，初始值为空对象
  let _user = ref({})
  // 使用ref创建响应式引用，存储token，初始值为空字符串
  let _token = ref("")

  // 设置用户token的函数，用于设置用户的token。它接收两个参数，分别是用户信息和token。
  // 函数会将用户信息和token分别保存到响应式引用_user和_token中，并将它们存储到浏览器的localStorage中，以便持久化保存。
  // 保存两份的原因是，存到内存中时响应速度会更快，存在硬盘上是当关机再开机等操作后还能读取token

  function setUserToken(user, token){
    // 保存到对象上（内存中）
    _user.value = user;
    _token.value = token;
    console.log("保存到对象上1: ", JSON.stringify(user))
    console.log("保存到对象上2: ", token)
    // 存储到浏览器的localStorge中（硬盘上）
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, token);
  }

  // 清除用户token的函数
  function clearUserToken(){
    // 清空_user响应式引用的值
    _user.value = {}
    // 清空_token响应式引用的值
    _token.value = ""
    // 从localStorage中移除用户信息
    localStorage.removeItem(USER_KEY)
    // 从localStorage中移除token
    localStorage.removeItem(TOKEN_KEY)
  }

  // 定义一个计算属性，用于获取用户信息
  // 计算属性会根据依赖的响应式数据的变化而自动更新
  let user = computed(() => {
    // 如果_user响应式引用的值是空对象
    if(Object.keys(_user.value).length == 0){
      // 从localStorage中获取用户信息的JSON字符串
      let user_str = localStorage.getItem(USER_KEY)
      // 如果用户信息存在
      if(user_str){
        // 将JSON字符串解析为对象，并保存到_user响应式引用中
        _user.value = JSON.parse(user_str)
      }
    }
    // 返回_user响应式引用的当前值
    return _user.value
  })
  
  // 定义一个计算属性，用于获取 token
  let token = computed(() => {
    // 如果_token响应式引用的值为空
    if(!_token.value){
      // 从localStorage中获取token
      let token_str = localStorage.getItem(TOKEN_KEY)
      // 如果token存在
      if(token_str){
        // 将token保存到_token响应式引用中
        _token.value = token_str
      }
    }
    // 返回 _token 响应式引用的当前值
    return _token.value;
  })

  // 定义一个计算属性，用于判断用户是否已登录
  let is_logined = computed(() => {
    // 如果用户信息不为空且token存在
    if(Object.keys(user.value).length>0 && token.value){
      // 返回true，表示用户已登录
      return true;
    }
    // 否则返回false，表示用户未登录
    return false;
  })
  
  // 返回一个对象，包含store中需要暴露给外部的方法和计算属性
  // 这样外部就可以通过这个对象来访问和修改store中的状态了
  return { setUserToken, user, token, is_logined, clearUserToken }
})