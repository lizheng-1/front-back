import axios from "~/axios"

export function login(email, password) {
    return axios.post("/auth/login", {
        email,
        password
    });
}

export function getinfo() {
    return axios.post("/auth/getinfo")
}

export function logout() {
    return axios.post("/auth/logout")
}


// export function logout() {
//     return axios.post("/admin/logout")
// }


export function createuser(username, email, password) {
    // return axios.post("/user/users/")
    return axios.post("/user/users/", {
        username,
        email,
        password
    });
}
export function activateuser(uid, token) {
    return axios.post("/user/users/activation/", {
        uid, token
    });
}
