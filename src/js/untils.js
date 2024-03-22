 import {
     Loading
 } from 'element-ui';
 import {
     debounce
 } from "./funDebounce";
 export function formatDate(datetime) {
     // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
     var year = new Date(datetime).getFullYear(),
         month = ("0" + (new Date(datetime).getMonth() + 1)).slice(-2),
         date = ("0" + new Date(datetime).getDate()).slice(-2),
         hour = ("0" + new Date(datetime).getHours()).slice(-2),
         minute = ("0" + new Date(datetime).getMinutes()).slice(-2),
         second = ("0" + new Date(datetime).getSeconds()).slice(-2);
     // 拼接
     var result = year + "-" + month + "-" + date + " " + hour + ":" + minute;
     // 返回
     return result;
 }

 export function turndate(datetime) {
     // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
     var year = new Date(datetime).getFullYear(),
         month = ("0" + (new Date(datetime).getMonth() + 1)).slice(-2),
         date = ("0" + new Date(datetime).getDate()).slice(-2),
         hour = ("0" + new Date(datetime).getHours()).slice(-2),
         minute = ("0" + new Date(datetime).getMinutes()).slice(-2),
         second = ("0" + new Date(datetime).getSeconds()).slice(-2),
         days = new Date(datetime).getDay();

     switch (days) {
         case 1:
             days = '周一';
             break;
         case 2:
             days = '周二';
             break;
         case 3:
             days = '周三';
             break;
         case 4:
             days = '周四';
             break;
         case 5:
             days = '周五';
             break;
         case 6:
             days = '周六';
             break;
         case 0:
             days = '周日';
             break;
     }
     // 拼接
     var result = {
         year: year + "年" + month + "月" + date + "日",
         week: days,
         time: hour + ":" + minute + ":" + second
     };
     // 返回year + "年" + month + "月" + date + "日" + ' ' + days + ' ' + hour + ":" + minute + ":" + second
     return result;
 }


 let loading;

 // 当前正在请求的数量
 let needLoadingRequestCount = 0;

 // 显示loading
 export function showLoading(target) {
     // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
     // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
     if (needLoadingRequestCount === 0 && !loading) {
         loading = Loading.service({
             lock: true,
             text: "加载中...",
             background: "rgba(0, 0, 0, 0.6)",
             target: target || "#app",
             customClass:"loadingback"
         });
     }
     needLoadingRequestCount++;
 }
 // 隐藏loading
 export function hideLoading() {
     needLoadingRequestCount--;
     needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); // 做个保护
     if (needLoadingRequestCount === 0) {
         // 关闭loading
         toHideLoading();
     }
 }

 // 防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
 let toHideLoading = debounce(() => {
     if (loading) {
         loading.close();
         loading = null;
     }
 }, 1000);