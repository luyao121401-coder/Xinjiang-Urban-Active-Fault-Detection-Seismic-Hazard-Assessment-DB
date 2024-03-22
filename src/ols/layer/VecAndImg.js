import VectorLayer from "ol/layer/vector"
import Group from "ol/layer/group"
import VectorSource from "ol/source/vector"
import ImageLayer from "ol/layer/Image"
import Static from "ol/source/ImageStatic";
import GeoJSON from 'ol/format/GeoJSON'
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';

class VecAndImg extends Group {
  constructor(opt_options) {
    

    proj4.defs("ESRI:102012","+proj=lcc +lat_0=0 +lon_0=105 +lat_1=30 +lat_2=62 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs");
    register(proj4);
    const options = opt_options || {}
    let imgfeild = options.imgfeild || 'img'
    let popupTemplate = {
      buttons: [
        {
          name: "查看图件",
          icon: (feature) => {
            if (imgl.getSource()) {
              if (imgl.getSource().getUrl() == feature.get(imgfeild)) {
                return 'src/js/ols/icon/pic2.png'
              } else {
                return 'src/js/ols/icon/pic1.png'
              }
            } else {
              return 'src/js/ols/icon/pic1.png'
            }
          },
          condition: (e) => {
            return true;
          },
          click: (feature, that) => {
            if (imgl.getSource()) {
              if (imgl.getSource().getUrl() == feature.get(imgfeild)) {
                imgl.setSource(null)
              } else {
                imgl.setSource(new Static({
                  url: feature.get(imgfeild),
                  imageExtent: feature.getGeometry().getExtent(),
                  projection: "EPSG:102012",
                }))
                console.log( feature.getGeometry().getExtent());
              }
            } else {
              imgl.setSource(
                new Static({
                  url: feature.get(imgfeild),
                  imageExtent: feature.getGeometry().getExtent(),
                  projection: "EPSG:102012",
                })
              );
            }
            setTimeout(() => {
              that
                .getMap()
                .getView()
                .fit(feature.getGeometry().getExtent(), {
                  duration: 1000,
                  padding: [200, 200, 200, 200],
                });
              that.hide();
            }, 200);
          },
        }
      ],
    }
    let vecl = new VectorLayer({
      source: new VectorSource({
        url: options.url,
        format: new GeoJSON(),
      })
    })
    vecl.getSource().on("featuresloadend", e => {
      console.log(e);
    })
    vecl.popupTemplate = popupTemplate
    let imgl = new ImageLayer({});

    let layers = [vecl, imgl]
    super({
      layers
    })
    this.setOpacity(0.2)
    this._popupTemplate = popupTemplate
  }
  get popupTemplate() {
    return this._popupTemplate
  }
}

export default VecAndImg