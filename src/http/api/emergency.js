import http from "../http";


export function addWorkdetail(params) {
    return http.post(`/earthquake/ek-hours/insert`, params);
}
export function getWorklist(params) {
    return http.get(`/earthquake/ek-hours/page`, params);
}
export function updateWorkGrade(params) {
    return http.post(`/earthquake/ek-hours/update`, params);
}