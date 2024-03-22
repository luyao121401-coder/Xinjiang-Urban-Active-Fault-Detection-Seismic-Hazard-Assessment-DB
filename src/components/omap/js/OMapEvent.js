import BaseLayerSource from './BaseLayerSource'
import SeaLand from "@/ols/layer/SeaLand";


//底图切换事件
var SWITCH_BASE_LAYER = 'switchBaseLayer'
//路网开关事件
var LU_WU_VISIBLE = 'luwuvisible' 
//工具切换
var SWITCH_CHANGE_TOOL = 'swtichChangeTool'

export default {
    SWITCH_BASE_LAYER,
    LU_WU_VISIBLE, 
    SWITCH_CHANGE_TOOL
};

export function OMEvent(page){
    const componentName = 'omap';
    this.page = page;
    console.log(this);
    let parent = this.page || this.page.$root;
    let name = this.page.$options.name;
    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
            name = parent.$options.name;
        }
    }
        this.uid = parent._uid;
}

OMEvent.prototype = {
    emit:function(type,data){
        this.page.$ommap.$emit(type,data,this.uid);
    },
    on:function(type,fun){
        let that = this;
        this.page.$ommap.$on(type,function(data,uid){
            if (that.uid === uid){
                fun(data);
            }
        });
    },
    setMap:function (map){
        if (!this.page.$ommap['uid'+this.uid]){
            this.page.$ommap['uid'+this.uid] = {};
        }
        this.page.$ommap['uid'+this.uid].map = map;
        this.page.$ommap['uid'+this.uid].layers = {}
    },
    
    getMap:function (){
        return this.page.$ommap['uid'+this.uid].map;
    },

    setMapSelect(select){
        if (!this.page.$ommap['uid'+this.uid]){
            this.page.$ommap['uid'+this.uid] = {};
        }
        this.page.$ommap['uid'+this.uid].select = select;
    },

    getMapSelect(){
        return this.page.$ommap['uid'+this.uid].select;
    },

    switchBaseLayer:function(type, name){

        if(type == OMEvent.prototype.currentBaseMapType) return
        let sources = BaseLayerSource[type]
        console.log(sources);
        if(sources){
            let data = {sources:sources,name:name}
            this.emit(SWITCH_BASE_LAYER, data)
            OMEvent.prototype.currentBaseMapType = type;
        } 
    },
    
    /**
     * 添加图层
     * @param {}} layer 
     */
    addLayer(layer){
        layer.setZIndex(this.page.$ommap['uid'+this.uid].map.getLayers().array_.length)
        this.page.$ommap['uid'+this.uid].map.addLayer(layer);
    },
    
    /**
     * 删除图层
     * @param {*} layer 
     */
    removeLayer(layer){
        this.page.$ommap['uid'+this.uid].map.removeLayer(layer);
        //重置zindex
        let length = this.page.$ommap['uid'+this.uid].map.getLayers().array_.length
        for(let i=0;i<length;i++){
            this.page.$ommap['uid'+this.uid].map.getLayers().array_[i].setZIndex(i)
        }
    },

    getMapLayers(){
        return this.page.$ommap['uid'+this.uid].map.getLayers().array_
    },

    addSeaLandLayer(name, api) {
        window.console.log(name)
        let layer = new SeaLand({
            layerType: name,
            api: api
        });
        layer.name = name
        this.page.$ommap['uid'+this.uid].map.addLayer(layer);
        this.page.$ommap['uid'+this.uid].layers[name] = layer
    },

    removeSeaLandLayer(name){
        let layer = this.page.$ommap['uid'+this.uid].layers[name] 
        if(layer){
            this.page.$ommap['uid'+this.uid].map.removeLayer(layer)
        }
    },

    locationLayer(name){
        let layer = name;
        if(typeof name == "string"){
            layer = this.page.$ommap['uid'+this.uid].layers[name] 
        }
        if(layer){
            this.page.$ommap['uid'+this.uid].map.getView().fit(layer.getSource().getExtent(), { maxZoom: 15, duration: 500, padding: [100, 100, 100, 100] });
            // this.page.$ommap['uid'+this.uid].map
            //     .getView()
            //     .animate({ resolution: this.page.$ommap['uid'+this.uid].map.getView().getResolution() * 1.1 },{
            //         duration: 500,
            //       });
        }
    },


};