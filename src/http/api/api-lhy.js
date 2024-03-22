import http from "../http";

var version = "/v1";


export function getLayerData(params) {
    return http.get(`${version}/platform/data/`, params);
}