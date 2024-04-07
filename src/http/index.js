// 导入axios
import axios from 'axios'


//1. 创建新的axios实例，
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_URL,
    baseURL: 'http://192.168.100.64:8400',
    timeout: 1000 * 1000
})
export default service