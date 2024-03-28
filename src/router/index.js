import Vue from 'vue'
import VueRouter from 'vue-router'
import NavigationPage from '../views/NavigationPage.vue'
import ProjectBrowse from '../components/HazardAssessment/ProjectBrowse.vue'
import ThematicBrowse from '../components/HazardAssessment/ThematicBrowse.vue'
import DataServe from '../components/HazardAssessment/DataServe.vue'
import HazardSysNavigation from '../components/HazardAssessment/SysNavigation.vue'
import DamageSysNavigation from '../components/DamageAssessment/SysNavigation.vue'
import AssessResults from '../components/DamageAssessment/AssessResults.vue'
import BatchCompute from '../components/DamageAssessment/BatchCompute.vue'
import RiskSurvey from '../components/RiskSurvey/RiskSurvey.vue'
import OutPut from '../components/output/OutPut.vue'
import topNav from '../components/emergencyService/topNav.vue'
import emergencyService from '../components/emergencyService/emergencyService.vue'
import history from '../components/emergencyService/history.vue'
import quakeDetail from '../components/emergencyService/quakeDetail.vue'
import thematicTop from '../components/thematicCharting/thematicTop.vue'
import activeFaultSurvey from '../components/thematicCharting/activeFaultSurvey.vue'
import mapsRecords from '../components/thematicCharting/mapsRecords.vue'
import lossAssessment from '../components/thematicCharting/lossAssessment.vue'
import riskScreening from '../components/thematicCharting/riskScreening.vue'
// import TriggerHistory from '../components/output/TriggerHistory.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    //解决vue路由重复导航错误
    //获取原型对象上的push函数

const routes = [
    // 主导航页面
    {
      path: '/',
      name: 'NavigationPage',
      component: NavigationPage
    },
    // 城市活动断层探测与地震危险性评价
    {
      path: '/projectBrowse',
      name: 'ProjectBrowse',
      component: ProjectBrowse,
    },
    {
      path: '/thematicBrowse',
      name: 'ThematicBrowse',
      component: ThematicBrowse,
    },
    {
      path: '/dataServe',
      name: 'DataServe',
      component: DataServe,
    },
    {
      path: '/sysNavigation',
      name: 'SysNavigation',
      component: HazardSysNavigation,
    },
    // 地震灾害损失评估
    // {
    //   path: '/assessResults',
    //   name: 'DamageAssessment',
    //   redirect: '/assessResults',
    //   children:[
    //     {
    //       path: '/assessResults',
    //       component: AssessResults,
    //     },
    //     {
    //       path: '/batchCompute',
    //       component: BatchCompute,
    //     },
    //     {
    //       path: '/damageAssessment/sysNavigation',
    //       component: DamageSysNavigation
    //     },
    //   ]
    // }
    {
      path: '/assessResults',
      name: 'assessResults',
      component: AssessResults
    },
    {
      path: '/batchCompute',
      name: 'batchCompute',
      component: BatchCompute
    },
    {
      path: '/damageNavigation',
      name: 'damageNavigation',
      component: DamageSysNavigation
    },
    // 地震灾害风险普查
    {
      path: '/riskSurvey',
      name: 'riskSurvey',
      component: RiskSurvey
    },
    // 地震信息与应急产出
    {
      path: '/outPut',
      name: 'outPut',
      component: OutPut
    },
    {
      path: '/emergencyService',
      component: topNav,
      redirect: '/emergencyService/form',
      children: [{
        path: 'form',
        name: '响应清单',
        component: emergencyService,
      },{
        path: 'mergencyhistory',
        name: 'mergencyhistory',
        component: history,
      },{
        path: 'quakeDetail',
        name: 'quakeDetail',
        component: quakeDetail,
      }]
    },
    {
      path: '/thematicCharting',
      component: thematicTop,
      redirect: '/thematicCharting/activeFaultSurvey',
      children: [{
        path: 'activeFaultSurvey',
        name: '城市活动断层探测成果图',
        component: activeFaultSurvey,
      },{
        path: 'mapsRecords',
        name: 'mapsRecords',
        component: mapsRecords,
      },{
        path: 'lossAssessment',
        name: '地震灾害损失预评估成果图',
        component: lossAssessment,
      },{
        path: 'riskScreening',
        name: '地震灾害风险普查成果图',
        component: riskScreening,
      }]
    },
    // // 地震信息与应急产出
    // {
    //   path: '/triggerHistory',
    //   name: 'triggerHistory',
    //   component: TriggerHistory
    // },
  ]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


export default router