import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = "admin-token"
const cookie = useCookies()


// 获取token
export function getToken() {
    console.log("TokenKey111: ",TokenKey, cookie)
    console.log("TokenKey222: ",cookie.get(TokenKey))
    return cookie.get(TokenKey)
}

// 设置token
export function setToken(token,user) {
    console.log(TokenKey," -2112-- \n ", token)
    return cookie.set(TokenKey, token)
}

// 清除token
export function removeToken() {
    return cookie.remove(TokenKey)
}