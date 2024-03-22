
import ol_interaction_Interaction from 'ol/interaction/Interaction'
import {transform} from 'ol/proj'
import Popup from '../overlay/popup1';
import Overlay from 'ol/Overlay';



class Elevation extends ol_interaction_Interaction {
  constructor(opt_options) {
    const options = opt_options || {};
    let own = options.own || false
    super({
      handleEvent:function(e) {
        if (!this.getActive()) return true;
        switch(e.type) {
          case 'click': {
            this.handleClick_(e); 
            break;
          }
        }
        if (options.handleEvent) return options.handleEvent(e);
        return true; 
      }
    });
    this.set('own', own);
    this.set('elevation', null);
    this.set('coordinate', null);
    
    // this.popup = new Popup({
    //   className: 'ol-popup',
    //   canFix: true,
    //   closeBox: true,
    //   minibar: true,
    // })
    let mark = document.createElement('img');
    mark.src = 'pointicon/eg.png';
    mark.style.width = '36px';
    mark.style.height = '36px';
    this.overlay = new Overlay({
      element: mark,
      positioning: 'bottom-center',
      offset: [0, 5],
    })
  }
}


Elevation.prototype.setMap = function(map) {
  // map.addOverlay(this.popup)
  map.addOverlay(this.overlay)
  ol_interaction_Interaction.prototype.setMap.call(this, map);
  if (this.getActive() && map !== null) {
    map.getTargetElement().style.cursor = 'crosshair';
  }
};


Elevation.prototype.setActive = function(b) {
  if (b && this.getMap() !== null) {
    this.getMap().getTargetElement().style.cursor = 'crosshair';
    // this.popup.show(undefined);
    // this.getMap().addOverlay(this.popup)
    this.overlay.setPosition(undefined)
    this.getMap().addOverlay(this.overlay)
  } 
  else if (this.getMap() !== null && !b) {
    this.getMap().getTargetElement().style.cursor = 'default';
    // this.getMap().removeOverlay(this.popup)
    this.getMap().removeOverlay(this.overlay)
  }
  ol_interaction_Interaction.prototype.setActive.call (this, b);
};


Elevation.prototype.handleClick_ = function(e) {
  var map = this.getMap();
  if (map) {
    var style = map.getTargetElement().style;
    let coordinate = transform(e.coordinate, map.getView().getProjection(), 'EPSG:4326');
    style.cursor = 'wait';
    this.dispatchEvent({ 
      type: 'loading', 
      coordinate: coordinate,
      elevation: null
    });
    let owntype = this.get('own')
    let getElev = new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      let url
      if(owntype)
        url = `http://dem.geoquater.com/geoserver/dem/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image/jpeg&TRANSPARENT=true&QUERY_LAYERS=dem:dem_cn&STYLES&LAYERS=dem:dem_cn&exceptions=application/vnd.ogc.se_inimage&INFO_FORMAT=application/json&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG:4326&WIDTH=101&HEIGHT=101&BBOX=${coordinate[0]-1},${coordinate[1]-1},${coordinate[0]+1},${coordinate[1]+1}`
      else url = 'https://api.open-elevation.com/api/v1/lookup?locations='+coordinate[1]+','+coordinate[0];
      // else url = 'https://api.opentopodata.org/v1/srtm30m?locations='+coordinate[1]+','+coordinate[0];
      xhr.open('GET', url , true);
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          let data = {}
          if (owntype) {
            let res = JSON.parse(this.response);
            let elev = -1000
            res.features.forEach(function(f) {
              elev = f.properties.GRAY_INDEX>elev?f.properties.GRAY_INDEX:elev
            })
            if (elev <= -1000) elev = null
            data.results = [{
              elevation: elev,
              latitude: coordinate[1],
              longitude: coordinate[0]
            }]
          }
          else data = JSON.parse(this.response);
          resolve(data);
        } else {
          // We reached our target server, but it returned an error
          reject(this.statusText);
        }
        
      };
      xhr.onerror = function() {
        reject('Network error');
      };
      xhr.send();
    });
    getElev.then((data) => {
      style.cursor = 'crosshair'
      this.set('elevation', data.results[0].elevation)
      this.set('coordinate', [data.results[0].longitude, data.results[0].latitude])
      this.dispatchEvent({ 
        type: 'loaded', 
        coordinate: coordinate,
        elevation: data.results[0].elevation,
        info: 'success'
      });
      let data1 = {
        title: '高程查询',
        content: `精度：${this.get('own')?'12.5米': '120米'}<br>经度：${coordinate[0]}°<br>纬度：${coordinate[1]}°<br>高程：${data.results[0].elevation}米<br> <br>`,
      }
      this.overlay.setPosition(e.coordinate);

      // this.popup.show(e.coordinate, data1);
    }).catch((err) => {
      style.cursor = 'crosshair'
      this.dispatchEvent({ 
        type: 'loaded', 
        coordinate: coordinate,
        elevation: null,
        info: err
      });
    });
  }
};

export default Elevation
