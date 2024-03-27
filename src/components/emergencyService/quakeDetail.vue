<template>
  <div class="m-page">
    <div class="leftList">
      <div @click="goback" class="goback">
        <i style="margin-right: 5px;" class="el-icon-arrow-left"></i>
        返回
      </div>
      <div class="main">
        <ul class="cbp_tmtimeline">
          <li>
            <div class="cbp_tmicon-one"></div>
            <div class="cbp_tmlabel">
              <h3>新疆阿克苏地区乌什县发生7.1级地震</h3>
            </div>
          </li>
          <li>
            <div :class="dutygroup.time1? 'cbp_tmicon-check':'cbp_tmicon'"></div>
            <div class="cbp_tmlabel">
              <p @click="dutyGroupShow(1)" :class="dutygroup.time1? 'timecoloe':''">30分钟内 
                <i style="margin-left: 10px; color: #777777;" :class="dutygroup.time1? 'el-icon-caret-top':'el-icon-caret-bottom'"></i>
              </p>
              <transition name="fade">
                <div v-if="dutygroup.time1" class="duty_group_box">
                  <div class="duty_group">
                    <p class="duty">1. 启动应急指挥系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">2. 发布预警信息和地震自动速报 </p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">3. 提供正式速报信息</p>
                    <p class="group">责任组：监测预报组、新闻宣传组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">4. 报送震情信息</p>
                    <p class="group">责任组：综合协调组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">5. 提出启动省局应急响应级别的建议</p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">6. 启动地震灾害损失快速评估系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                </div>
              </transition>
            </div>
          </li>
          <li>
            <div :class="dutygroup.time2? 'cbp_tmicon-check':'cbp_tmicon'"></div>
            <div class="cbp_tmlabel">
              <p @click="dutyGroupShow(2)" :class="dutygroup.time2? 'timecoloe':''">30分钟 - 1小时
                <i style="margin-left: 10px; color: #777777;" :class="dutygroup.time2? 'el-icon-caret-top':'el-icon-caret-bottom'"></i>
              </p>
              <transition name="fade">
                <div v-if="dutygroup.time2" class="duty_group_box">
                  <div class="duty_group">
                    <p class="duty">1. 启动应急指挥系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">2. 发布预警信息和地震自动速报 </p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">3. 提供正式速报信息</p>
                    <p class="group">责任组：监测预报组、新闻宣传组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">4. 报送震情信息</p>
                    <p class="group">责任组：综合协调组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">5. 提出启动省局应急响应级别的建议</p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">6. 启动地震灾害损失快速评估系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                </div>
              </transition>
            </div>
          </li>
          <li>
            <div :class="dutygroup.time3? 'cbp_tmicon-check':'cbp_tmicon'"></div>
            <div class="cbp_tmlabel">
              <p @click="dutyGroupShow(3)" :class="dutygroup.time3? 'timecoloe':''">1小时 - 2小时 
                <i style="margin-left: 10px; color: #777777;" :class="dutygroup.time3? 'el-icon-caret-top':'el-icon-caret-bottom'"></i>
              </p>
              <transition name="fade">
                <div v-if="dutygroup.time3" class="duty_group_box">
                  <div class="duty_group">
                    <p class="duty">1. 启动应急指挥系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">2. 发布预警信息和地震自动速报 </p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">3. 提供正式速报信息</p>
                    <p class="group">责任组：监测预报组、新闻宣传组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">4. 报送震情信息</p>
                    <p class="group">责任组：综合协调组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">5. 提出启动省局应急响应级别的建议</p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">6. 启动地震灾害损失快速评估系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                </div>
              </transition>
            </div>
          </li>
          <li>
            <div :class="dutygroup.time4? 'cbp_tmicon-check':'cbp_tmicon'"></div>
            <div class="cbp_tmlabel">
              <p @click="dutyGroupShow(4)" :class="dutygroup.time4? 'timecoloe':''">2小时 - 4小时 
                <i style="margin-left: 10px; color: #777777;" :class="dutygroup.time4? 'el-icon-caret-top':'el-icon-caret-bottom'"></i>
              </p>
              <transition name="fade">
                <div v-if="dutygroup.time4" class="duty_group_box">
                  <div class="duty_group">
                    <p class="duty">1. 启动应急指挥系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">2. 发布预警信息和地震自动速报 </p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">3. 提供正式速报信息</p>
                    <p class="group">责任组：监测预报组、新闻宣传组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">4. 报送震情信息</p>
                    <p class="group">责任组：综合协调组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">5. 提出启动省局应急响应级别的建议</p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">6. 启动地震灾害损失快速评估系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                </div>
              </transition>
            </div>
          </li>
          <li>
            <div :class="dutygroup.time5? 'cbp_tmicon-check':'cbp_tmicon'"></div>
            <div class="cbp_tmlabel">
              <p @click="dutyGroupShow(5)" :class="dutygroup.time5? 'timecoloe':''">4小时 - 8小时 
                <i style="margin-left: 10px; color: #777777;" :class="dutygroup.time5? 'el-icon-caret-top':'el-icon-caret-bottom'"></i>
              </p>
              <transition name="fade">
                <div v-if="dutygroup.time5" class="duty_group_box">
                  <div class="duty_group">
                    <p class="duty">1. 启动应急指挥系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">2. 发布预警信息和地震自动速报 </p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">3. 提供正式速报信息</p>
                    <p class="group">责任组：监测预报组、新闻宣传组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">4. 报送震情信息</p>
                    <p class="group">责任组：综合协调组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">5. 提出启动省局应急响应级别的建议</p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">6. 启动地震灾害损失快速评估系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                </div>
              </transition>
            </div>
          </li>
          <li>
            <div :class="dutygroup.time6? 'cbp_tmicon-check':'cbp_tmicon'"></div>
            <div class="cbp_tmlabel">
              <p @click="dutyGroupShow(6)" :class="dutygroup.time6? 'timecoloe':''">8小时 - 12小时 
                <i style="margin-left: 10px; color: #777777;" :class="dutygroup.time6? 'el-icon-caret-top':'el-icon-caret-bottom'"></i>
              </p>
              <transition name="fade">
                <div v-if="dutygroup.time6" class="duty_group_box">
                  <div class="duty_group">
                    <p class="duty">1. 启动应急指挥系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">2. 发布预警信息和地震自动速报 </p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">3. 提供正式速报信息</p>
                    <p class="group">责任组：监测预报组、新闻宣传组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">4. 报送震情信息</p>
                    <p class="group">责任组：综合协调组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">5. 提出启动省局应急响应级别的建议</p>
                    <p class="group">责任组：监测预报组</p>
                  </div>
                  <div class="duty_group">
                    <p class="duty">6. 启动地震灾害损失快速评估系统</p>
                    <p class="group">责任组：应急服务组</p>
                  </div>
                </div>
              </transition>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="duty_partition">
      <div class="duty_title">
        <div class="group_text">
          应急服务响应等级: <span>三级</span>
          <div @click="modifyshow()" class="amend_group">
            <img src="@/assets/img/修改响应等级.png" alt="">
            修改相应等级
          </div>
        </div>
        <div style="display: flex; align-items: center;">离震后时间: <span class="group_time">3分48秒</span></div>
      </div>
      <el-divider></el-divider>
      <div class="condition_search">
        <span>震后30分钟内行动清单</span>
        <div>
          <span>责任组筛选:</span>
          <el-select style="margin-left: 10px; height: 32px; width: 135px;" class="input_div" v-model="value" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="duty_list">
        <div v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]" :key="item" class="duty_name">
          <h2>{{ item }}.  启动应急指挥系统 </h2>
          <p>收到自动速报后立即启动应急大厅（10 分钟启动，大屏幕显示系统、视频会议系统等软硬件设备），视频联通中国地震局、自治区应急厅、自治区政府值班室、台网中心，视频联通震中所在市州地震部门和中心站。</p>
          <span>责任组：应急服务组</span>
        </div>
      </div>
      <el-dialog
      title="修改响应等级"
      :visible.sync="modifyVisible"
      width="545px"
      :append-to-body='true'
      :before-close="handleModify">
      <label class="modifygroup">应急服务响应等级:</label>
      <el-select style="width: 100%;margin-top: 20px;" v-model="group" placeholder="请选择项目类型">
        <el-option
          v-for="item in grouplist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <p style="font-size: 14px;color: #F87A35;margin-top: 15px; "><i class="el-icon-warning-outline"></i>应急服务响应等级调整后，震后行动清单将同</p>
      <el-divider></el-divider>
      <div class="modifyContent">
        <p>地震名称： 新疆阿克苏地区乌什县7.1级地震 </p>
        <p>震中经纬度： 78.63°E，41.26°N </p>
        <p>地震震级： 7.1级</p>
        <p>发震时刻：2024年1月23日2时9分</p>
        <p>震源深度：22千米</p>
      </div>
      <span slot="footer" class="dialog_footer">
        <el-button style="width: 200px;" @click="modifyVisible = false">取消调整</el-button>
        <el-button style="width: 200px;" type="primary" @click="modifyVisible = false">确认调整</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      groupShow: null,
      modifyVisible: false,
      group: '',
      grouplist: [
        {
          label: '一级',
          value: '1',
        },{
          label: '二级',
          value: '2',
        },{
          label: '三级',
          value: '3',
        },{
          label: '四级',
          value: '4',
        },
      ],
      dutygroup: {
        time1: false,
        time2: false,
        time3: false,
        time4: false,
        time5: false,
        time6: false,
      }
    };
  },

  computed: {
  },
  created() {
  },
  methods: {
    goback(){
      this.$router.go(-1)
    },
    dutyGroupShow(val){
      switch(val){
        case 1: 
        if (this.dutygroup.time1) {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: false,
            time4: false,
            time5: false,
            time6: false,
          }
        } else {
          this.dutygroup = {
            time1: true,
            time2: false,
            time3: false,
            time4: false,
            time5: false,
            time6: false,
          }
        }
        break;
        case 2:
        if (this.dutygroup.time2) {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: false,
            time4: false,
            time5: false,
            time6: false,
          }
        } else {
          this.dutygroup = {
            time1: false,
            time2: true,
            time3: false,
            time4: false,
            time5: false,
            time6: false,
          }
        }
        break;
        case 3:
        if (this.dutygroup.time3) {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: false,
            time4: false,
            time5: false,
            time6: false,
          }
        } else {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: true,
            time4: false,
            time5: false,
            time6: false,
          }
        }
        break;
        case 4:
        if (this.dutygroup.time4) {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: false,
            time4: false,
            time5: false,
            time6: false,
          }
        } else {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: false,
            time4: true,
            time5: false,
            time6: false,
          }
        }
        break;
        case 5:
        if (this.dutygroup.time5) {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: false,
            time4: false,
            time5: false,
            time6: false,
          }
        } else {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: false,
            time4: false,
            time5: true,
            time6: false,
          }
        }
        break;
        case 6:
        if (this.dutygroup.time6) {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: false,
            time4: false,
            time5: false,
            time6: false,
          }
        } else {
          this.dutygroup = {
            time1: false,
            time2: false,
            time3: false,
            time4: false,
            time5: false,
            time6: true,
          }
        }
        break;
      }
    },
    modifyshow(){
      this.modifyVisible = true
    },
    handleModify(){
      this.modifyVisible = false
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
.m-page{
  z-index: 1;
  position: absolute;
  width: 100%;
  min-width: 800px;
  min-height: calc(100% - 68px);
  padding: 20px;
  top: 68px;
  background-color: #F9F9F9;
  display: flex;
}
.leftList{
  width: 340px;
  min-height: 100%;
  padding: 20px 0 0 20px;
  background-color: white;
}
.goback{
  position: absolute;
  top: 30px;
  left: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777777;
  margin-left: 20px;
  cursor: pointer;
}
.main {
  width: 100%;
  max-width: 69em;
  padding-top: 30px;
  padding-left: 20px;
}
.cbp_tmtimeline {
  /* margin: 30px 0 0 0; */
  padding: 0;
  list-style: none;
  position: relative;
}
.cbp_tmtimeline li:not(:last-child):before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  border: 1px dashed #ccc;
  left: -18px;
}
.cbp_tmtimeline > li {
  position: relative;
}

.cbp_tmicon-one, .cbp_tmicon-check, .cbp_tmicon{
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  position: absolute;
  left: -23px;
  top: 5px;
}
.cbp_tmtimeline > li .cbp_tmicon {
  border: 2px solid #C9DEF2;
  background-color: white;
}
.cbp_tmicon-one{
  background-color: #ABABAB;
}
.cbp_tmicon-check{
  background-color: #014FD9;
}
.cbp_tmtimeline > li .cbp_tmlabel {
  padding:  0 0 15px 0;
  color: black;
  line-height: 1.4;
  position: relative;
  border-radius: 5px;
}
.cbp_tmtimeline > li .cbp_tmlabel h3 {
  font-size: 16px !important;
  font-weight: 550 !important;
  padding: 0 0 10px 0;
}
.cbp_tmtimeline > li .cbp_tmlabel > p {
  font-size: 16px;
  font-weight: 550;
  /* padding: 0 0 10px 0; */
  color: #777777;
  cursor: pointer;
}
.cbp_tmtimeline > li .cbp_tmlabel > p:hover{
  background-color: rgba(183, 213, 246, 0.15);
}
.duty_group{
  margin-top: 10px;
}
.duty_group .duty{
  font-weight: 550;
  font-size: 14px;
  color: #181818;
}
.duty_group .group{
  padding-left: 15px;
  font-size: 13px;
  color: #777777;
}
.timecoloe{
  color: #0344D2 !important;
}
.duty_group_box{
  overflow: hidden;
}
 /* 进入和离开的过程 */
.fade-enter-active,
.fade-leave-active {
    transition: height 0.3s;
    /* width的变化，动画时间是3秒 */
}
/* 进入初始状态 和 离开的结束状态*/
.fade-enter,
.fade-leave-to {
  height: 0px;
}
/* 进入的结束状态 和 离开的初始状态 */
.fade-enter-to,
.fade-leave {
    height: 300px;
}
.input_div >>> .el-input__inner{
  background-color: #F9F9F9 !important;
}
.duty_partition{
  width: 1468px;
  padding: 20px;
}
.duty_title{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.duty_title > div{
  font-size: 24px;
  font-weight: 550;
}
.duty_title .group_text{
  display: flex;
  align-items: end;
}
.duty_title .group_text > span{
  font-size: 28px;
  color: #D20303;
  margin-left: 10px;
}
.amend_group{
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  color: #777777;
  margin-left: 20px;
  cursor: pointer;
}
.group_time{
  font-size: 28px;
  color: #0344D2;
  margin-left: 10px;
}
.condition_search{
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #777777;
}
.condition_search > div{
  display: flex;
  align-items: center;
}
.duty_list{
  width: 100%;
  margin-top: 20px;
}
.duty_name{
  padding: 16px;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 6px;
  background-color: #FFFFFF;
}
.duty_name > h2{
  font-weight: 550;
  font-size: 20px;
  color: #303030;
}
.duty_name > p{
  font-size: 16px;
  color: #303030;
  line-height: 24px;
  margin: 10px 0;
}
.duty_name > span{
  font-size: 16px;
color: #777777;
}
.dialog_footer{
  display: flex;
  justify-content: space-around;
}
.modifygroup{
  font-weight: 550;
  font-size: 18px;
  color: #181818;
}
.modifyContent > p{
  font-size: 18px;
  color: #303030;
  line-height: 40px;
}
</style>
<style>
.el-dialog{
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 689px;
}
.el-dialog__header {
  text-align: center;
  font-size: 24px;
  font-weight: 550;
}
</style>
