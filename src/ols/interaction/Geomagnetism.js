
import ol_interaction_Interaction from 'ol/interaction/Interaction'
import {transform} from 'ol/proj'
import geomagnetism from 'geomagnetism'
import Overlay from 'ol/Overlay';
import Popup from '../overlay/popup1';


class Geomagnetism extends ol_interaction_Interaction {
  constructor(opt_options) {
    const options = opt_options || {};
    var dragging = false;
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
    this.set('geomagnetism', null);
    this.set('coordinate', null);
  }
}


// Geomagnetism.prototype.setMap = function(map) {
//   ol_interaction_Interaction.prototype.setMap.call(this, map);
//   this.getMap().getTargetElement().style.cursor = 'crosshair';
// };


// Geomagnetism.prototype.setActive = function(b) {
//   ol_interaction_Interaction.prototype.setActive.call (this, b);
// };

Geomagnetism.prototype.setMap = function(map) {
  // map.addOverlay(this.popup)
  map.addOverlay(this.overlay)
  ol_interaction_Interaction.prototype.setMap.call(this, map);
  if (this.getActive() && map !== null) {
    map.getTargetElement().style.cursor = 'crosshair';
  }
};


Geomagnetism.prototype.setActive = function(b) {
  if (b && this.getMap() !== null) {
    this.getMap().getTargetElement().style.cursor = 'crosshair';
    this.overlay.setPosition(undefined)
    this.getMap().addOverlay(this.overlay)
  } 
  else if (this.getMap() !== null && !b) {
    this.getMap().getTargetElement().style.cursor = 'default';
    this.getMap().removeOverlay(this.overlay)
  }
  ol_interaction_Interaction.prototype.setActive.call (this, b);
};

Geomagnetism.prototype.handleClick_ = function(e) {
  var map = this.getMap();
  if (map) {
    var style = map.getTargetElement().style;
    let coordinate = transform(e.coordinate, map.getView().getProjection(), 'EPSG:4326');
    style.cursor = 'wait';
    this.dispatchEvent({ 
      type: 'loading', 
      coordinate: coordinate,
      decl: null,
      incl: null,
      f: null,
    });
    const info = geomagnetism.model().point([...coordinate].reverse());
    this.set('geomagnetism', info);
    this.dispatchEvent({
      type: 'loaded',
      coordinate: coordinate,
      info
    });
    style.cursor = 'crosshair';
    let data = {
      title: '磁偏角查询',
      content: `经度：${coordinate[0]}°<br>纬度：${coordinate[1]}°<br>减速度：${info.decl}<br>倾角：${info.incl}°<br>地磁强度：${info.f}nT<br> <br>`,
    }
    // this.popup.show(e.coordinate, data);
    this.overlay.setPosition(e.coordinate);
  }
};

export default Geomagnetism
