<template>
  <div class="draw-container">
    <div class="draw-container2">
      <div v-show="isPopOpen" class="draw-menu">
          <div class="img-btn">
              <img src="../../assets/icon/point.png" title="绘制点" class="imgicon" @click="drawShape('Point')" v-if="drawMode !== 'Point'"/>
              <img src="../../assets/icon/pointb.png" title="绘制点" class="imgicon" v-if="drawMode == 'Point'"/>
          </div>
          <div class="img-btn">
              <img src="../../assets/icon/zx.png" title="绘制线" class="imgicon" @click="drawShape('LineString')" v-if="drawMode !== 'LineString'"/>
              <img src="../../assets/icon/zxb.png" title="绘制线" class="imgicon" v-if="drawMode == 'LineString'"/>
          </div>

          <div class="img-btn">
              <img src="../../assets/icon/qx.png" title="绘制徒手线" class="imgicon" @click="drawShape('freehand LineString')" v-if="drawMode !== 'freehand LineString'"/>
              <img src="../../assets/icon/qxb.png" title="绘制徒手线" class="imgicon" v-if="drawMode == 'freehand LineString'"/>
          </div>
          <div class="img-btn">
              <img src="../../assets/icon/square.png" title="绘制矩形" class="imgicon" @click="drawShape('Box')" v-if="drawMode !== 'Box'"/>
              <img src="../../assets/icon/squareblue.png" title="绘制矩形" class="imgicon" v-if="drawMode == 'Box'"/>
          </div>
          <div class="img-btn">
              <img src="../../assets/icon/circle.png" title="绘制圆" class="imgicon" @click="drawShape('Circle')" v-if="drawMode !== 'Circle'"/>
              <img src="../../assets/icon/circleb.png" title="绘制圆" class="imgicon" v-if="drawMode == 'Circle'"/>
          </div>
          <div class="img-btn">
              <img src="../../assets/icon/qpol.png" title="绘制多边形" class="imgicon" @click="drawShape('Polygon')" v-if="drawMode !== 'Polygon'"/>
              <img src="../../assets/icon/qpolb.png" title="绘制多边形" class="imgicon" v-if="drawMode == 'Polygon'"/>
          </div>
          <div class="img-btn">
              <img src="../../assets/icon/qm.png" title="绘制徒手面" class="imgicon" @click="drawShape('freehand Polygon')" v-if="drawMode !== 'freehand Polygon'"/>
              <img src="../../assets/icon/qmb.png" title="绘制徒手面" class="imgicon" v-if="drawMode == 'freehand Polygon'"/>
          </div>
      </div>

      <draw-end-panel v-if="isShowDrawEndPanel" :type="drawMode" :length='length' :area='area' :radius='radius' :latlon='latlon'></draw-end-panel> 

      <div class="draw-button" @click="showDrawPop" title='绘制规划'>
                <img src="../../assets/img/tool_draw_icon.png" alt width="20px" height="20px"/>

        <!-- <img src="../../assets/icon/draw.png" alt=""  v-show="this.isDrawClose == false">
        <img src="../../assets/icon/drawb.png" alt=""  v-show="this.isDrawClose == true"> -->
      </div>
    </div>
  </div>
</template>

<script>
import EventConst,{OMEvent} from './js/OMapEvent'
import {LineString, Polygon, Circle, Point} from 'ol/geom';
import { fromCircle } from "ol/geom/Polygon"
import {getArea, getLength} from 'ol/sphere';
// import Select from "ol/interaction/Select";
import DrawEndPanel from './DrawEndPanel'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import {unByKey} from 'ol/Observable';
import { transform as Transform } from "ol/proj";
import { DrawTool } from "./js/DrawTool";
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';

export default {
  data(){
       return{
          omEvent: {},
          isPopOpen: false,
          isShowDrawEndPanel: false,
          //画图结束
          isDrawClose:false,
          drawMode:'',
          ZDraw: null,
          popupSelect: null,
          drawEndResult: null,
          //长度 面积 圆半径
          length:'',
          area:'',
          radius:'',
          latlon:'',
          drawTool: null,

          geomChangeListener:null
        }
  },
  components:{
     DrawEndPanel
  },
  mounted(){
     this.omEvent = new OMEvent(this)

     this.omEvent.on(EventConst.SWITCH_CHANGE_TOOL,(res)=>{
         if(res != 'draw'&&this.isDrawClose) {
                this.isPopOpen = false
                this.isShowDrawEndPanel = false
                this.popupSelect.values_.active = true
                this.drawTool.stopDraw()
                if(this.geomChangeListener){
                  unByKey(this.geomChangeListener)   
                  this.geomChangeListener = null
                }
                this.drawMode = ''
                this.isDrawClose = ''
          }
     })

     setTimeout(() => {
         this.drawTool = new DrawTool(this.omEvent.getMap())
         this.popupSelect = this.omEvent.getMapSelect()
     }, 100);
  },  
  methods: {
     showDrawPop(){
       this.isDrawClose = !this.isDrawClose
       if(!this.isDrawClose){
          this.isPopOpen = false
          this.isShowDrawEndPanel = false
          this.popupSelect.values_.active = true
          this.drawTool.stopDraw()
          if(this.geomChangeListener){
            unByKey(this.geomChangeListener)   
            this.geomChangeListener = null
         }
       } else {
          this.omEvent.emit(EventConst.SWITCH_CHANGE_TOOL, 'draw')
          this.isPopOpen = true
          this.popupSelect.values_.active = false
       }
       
       if(!this.isPopOpen){
          this.drawMode = ''
       }
     },
     clear(){
       this.drawMode = ''
     },
     drawShape(item){
        this.radius = ''
        this.area = ''
        this.length = ''
        this.latlon = ''
        this.drawMode = item
        let type = item
        let freehand = false
        if(item.indexOf('freehand') == 0){
             let arr = item.split(' ')
             type = arr[1]
             freehand = true
        } 
        this.drawTool.startDraw({
            type: type,
            isFreehand: freehand,
            resultCallback:(res)=>{
                this.drawTool.pauseDraw()
                let geom = res.feature.getGeometry();
                //点处理投影
                if(geom instanceof Point){
                  let sourceProj = this.omEvent.getMap().getView().getProjection();
                   let point = null
                   if(sourceProj.getCode() == "EPSG:4326"){
                      point = res.coordinate
                   } else {
                      point = new Transform(res.coordinate, sourceProj.getCode(), "EPSG:4326")
                   }
                   this.latlon = point[0].toFixed(5)+","+point[1].toFixed(5)
                }

                this.measure(geom)

                let that = this
                this.geomChangeListener = res.feature.getGeometry().on('change', function (evt) {
                    var geom = evt.target;
                    that.measure(geom)
                });
              
                this.drawEndResult = res
                this.isShowDrawEndPanel = true
                this.isPopOpen = false
            }
        })
     },

     closeDrawEndPanel(){
         if(this.geomChangeListener){
            unByKey(this.geomChangeListener)   
            this.geomChangeListener = null
         }
            
         this.isShowDrawEndPanel = false
         this.isPopOpen = true
         this.drawMode = ''
         this.drawEndResult = null
         this.drawTool.stopDraw()
     },

     drawEndPanelClickOk(option){
        if(this.geomChangeListener){
            unByKey(this.geomChangeListener)   
            this.geomChangeListener = null
        }
        this.isShowDrawEndPanel = false
        this.isPopOpen = true
        this.drawMode = ''
        if(this.drawEndResult.feature){
            this.drawEndResult.feature.setProperties({
                    '描述': option.msg,
                  }) 
            var source = new VectorSource();
            source.addFeature(this.drawEndResult.feature)
            var layer = new VectorLayer({
                source: source,
            });
            this.omEvent.addLayer(layer)
        }
        this.drawTool.stopDraw()
        this.drawEndResult = null
     },

     changStyle(style){
        if(this.drawEndResult.feature){
            let newStyle = new Style({
              zIndex: 1,
              fill: new Fill({
                color: style.fillColor
              }),
              stroke: new Stroke({
                color: style.strokeColor,
                width: style.lineSize,
                lineDash: style.lineDash
              }),
              image: new CircleStyle({
                radius: style.lineSize,
                fill: new Fill({
                  color: style.fillColor
                }),
                stroke: new Stroke({
                  color: style.strokeColor
                })
              })
          })
          this.drawEndResult.feature.setStyle(newStyle)
        }
     },

     measure(geom){
        if(geom instanceof Polygon){
            this.area = this.measureArea(geom);
            this.length = this.measureLength(new LineString(geom.getLinearRing(0).getCoordinates()))
        } else if(geom instanceof LineString){
            this.length = this.measureLength(geom)
        } else if(geom instanceof Circle){
          // let circlePolygonFeature = res.feature.clone()
          let circlePolygon = fromCircle(geom.clone())
          this.area = this.measureArea(circlePolygon);
          let radiusNum = geom.getRadius();
          if (radiusNum > 100) {
              this.radius = Math.round((radiusNum / 1000) * 100) / 100 + ' ' + 'km';
          } else {
              this.radius = Math.round(radiusNum * 100) / 100 + ' ' + 'm';
          }
        } 
     },

     measureLength(line){
        let sourceProj = this.omEvent.getMap().getView().getProjection();
        let length = getLength(line, {projection: sourceProj});
        let output;
        if (length > 100) {
          output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
          output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
     },

     measureArea(polygon){
        let sourceProj = this.omEvent.getMap().getView().getProjection();
        let area = getArea(polygon, {projection: sourceProj})
        let output;
        if (area > 10000) {
          output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km²';
        } else {
          output = Math.round(area * 100) / 100 + ' ' + 'm²';
        }
        return output;
     }
  },
}
</script>

<style scoped>
  .draw-container {
    position: absolute;
    z-index: 10;
    right: 26px;
    top: 70px;
  }
  .draw-container2{
    display: flex;
  }
  .draw-menu {
    margin-right: 10px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    margin-top: -2px;
    height: 44px;
  }
  .draw-button {
    width: 36px;
    height: 36px;
    color: #2c2c2c;
    background-color: #1B2544;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
  }
  .draw-button:hover {
    width: 36px;
    height: 36px;
    color: #2c2c2c;
    background-color: #1B2544;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(76, 150, 247);
  }

  .img-btn {
      padding: 10px;
  }
</style>