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
    // // 地震信息与应急产出
    // {
    //   path: '/triggerHistory',
    //   name: 'triggerHistory',
    //   component: TriggerHistory
    // },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router