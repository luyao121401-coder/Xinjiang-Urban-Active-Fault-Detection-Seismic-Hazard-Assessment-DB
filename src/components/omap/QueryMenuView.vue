<template>
  <div class="draw-container">
    <div class="draw-menu">
          <menu-item-btn @click.native="drawShape('Point')" :select="this.drawMode == 'Point'" :icon='require("../../assets/img/query_point_icon.png")' text="点缓冲区"></menu-item-btn>
          <menu-item-btn @click.native="drawShape('LineString')" :select="this.drawMode == 'LineString'" :icon='require("../../assets/img/query_line_icon.png")' text="线缓冲区"></menu-item-btn>
          <menu-item-btn @click.native="drawShape('Polygon')" :select="this.drawMode == 'Polygon'" :icon='require("../../assets/img/query_polygon_icon.png")' text="面缓冲区"></menu-item-btn>
          <menu-item-btn @click.native="closeDraw()" :icon='require("../../assets/img/tool_close_icon.png")' text="关闭"></menu-item-btn>
      </div>
  </div>
</template>

<script>
import EventConst,{OMEvent} from './js/OMapEvent'
import {LineString, Polygon, Circle, Point, LinearRing} from 'ol/geom';
import { fromCircle } from "ol/geom/Polygon"
import {getArea, getLength} from 'ol/sphere';
import { Circle as CircleStyle, Fill, Stroke, Style , Icon} from 'ol/style.js';
import {unByKey} from 'ol/Observable';
import { DrawTool } from "./js/DrawTool";
import MenuItemBtn from '../Map/MenuItemBtn.vue';
const jsts = require("jsts/dist/jsts.min.js");

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

          geomChangeListener:null,
          bufferDistance: 100,
          bufferUnit: "km",
          queryfeature: null,
          feature_clone: null
        }
  },
  components:{
    //  DrawEndPanel,
     MenuItemBtn
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

     this.omEvent.on("bufferDistanceChange", this.bufferDistanceChange)
     this.omEvent.on("queryFeatureClose", this.close)
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

        let drawStyle = new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.6)'
            }),
            stroke: new Stroke({
                color: '#66b1ff',//#ffcc33
                width: 2
            }),
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: '#ffcc33'
                })
            })
        });

        this.drawTool.startDraw({
            layerName: "空间查询临时图层",
            type: type,
            isFreehand: freehand,
            style: drawStyle,
            resultCallback:(res)=>{
                this.queryfeature = res.feature;
                //添加缓冲区
                let bufferDistanceResult = this.bufferDistance;
                if (this.bufferUnit == "km") {
                  bufferDistanceResult = this.bufferDistance * 1000;
                } else {
                  bufferDistanceResult = this.bufferDistance;
                }

                this.feature_clone = this.queryfeature.clone();
                this.queryfeature.setGeometry(
                  this.buffer(this.feature_clone, bufferDistanceResult)
                );
                this.omEvent.emit("queryFeatureChange", this.queryfeature)
            }
        })
         
        this.popupSelect.values_.active = false
        this.omEvent.emit("drawShapeChange", this.drawMode)
     },

     buffer(feature, length) {
        const parser = new jsts.io.OL3Parser();
        parser.inject(Point, LineString, LinearRing, Polygon);
        let jstsgeom = parser.read(feature.getGeometry());
        let buffered = jstsgeom.buffer(length);
        return parser.write(buffered);
    },

    bufferDistanceChange(data){
      this.bufferDistance = data.distance;
      this.bufferUnit = data.unit
      let bufferDistanceResult = this.bufferDistance;
      if (this.bufferUnit == "km") {
        bufferDistanceResult = this.bufferDistance * 1000;
      } else {
        bufferDistanceResult = this.bufferDistance;
      }
      this.queryfeature.setGeometry(this.buffer(this.feature_clone, bufferDistanceResult));
    },

     changStyle(style){
        let newStyle;
        if(this.drawMode == "Point"){
            newStyle = new Style({
                zIndex: 1,
                fill: new Fill({
                  color: style.fillColor
                }),
                stroke: new Stroke({
                  color: style.strokeColor,
                  width: style.lineSize,
                  lineDash: style.lineDash
                }),
                image: new Icon({
                    src: style.image,
                    scale: 0.5,
                    color: style.imageColor
                })
            })
        } else {
          newStyle = new Style({
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
        }
        this.drawTool.setStyle(newStyle)
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
     },

     clearDraw(){
        this.drawTool.drawClear();
     },

     close(){
        this.isShowDrawEndPanel = false
        this.popupSelect.values_.active = true
        this.drawTool.stopDraw()
        if(this.geomChangeListener){
          unByKey(this.geomChangeListener)   
          this.geomChangeListener = null
        }
        this.drawMode = ''
        this.isDrawClose = ''
        this.drawTool.drawClear();
        this.$emit("close");
        this.omEvent.emit("queryFeatureChange", null)
     },

     closeDraw(){
        this.omEvent.emit("queryFeatureClose","")
     },

     clearPre(){
        this.drawTool.clearPreFeature();
     }
  },
}
</script>

<style scoped>
  .draw-container {
    position: absolute;
    z-index: 10;
  }

  .draw-menu {
    background-color: #1B2544;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    padding: 6px;
    height: 40px;
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