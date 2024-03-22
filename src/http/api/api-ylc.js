import http from "../http";

var version = "/v1";

// 登录
export function Login(params) {
    return http.post(`${version}/user/login/`, params);
}