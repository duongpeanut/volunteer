import axios from "axios"
const URL = 'http://localhost:3001/api/auth/'


export const LoginApi = async (user) => {
    const result = await axios.post(URL + 'login', user, {
        headers: {
            'content-type': 'application/json'
        }
    })
    return result
}

export const RegisterApi = async (user) => {
    var result = await axios.post(URL + "register", user)
    return result
}
export const ChagePasswordApi = async (password) => {
    var result = await axios.put(URL + "reset-password", password)
    return result
}