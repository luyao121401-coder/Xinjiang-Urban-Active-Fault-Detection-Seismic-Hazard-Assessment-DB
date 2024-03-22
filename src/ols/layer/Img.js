import ImageLayer from "ol/layer/Image"
import Static from "ol/source/ImageStatic";
import GeoJSON from 'ol/format/GeoJSON'
import Axios from "axios";
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';

class Img extends ImageLayer {
  constructor(opt_options) {
    const options = opt_options || {}
    let url = options.url || ''
    let imgfeild = options.imgfeild || 'mappath'
    proj4.defs("ESRI:102012","+proj=lcc +lat_0=0 +lon_0=105 +lat_1=30 +lat_2=62 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs");
    register(proj4);
    // proj4.defs(
    //   'EPSG:27700',
    //   '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
    //     '+x_0=400000 +y_0=-100000 +ellps=airy ' +
    //     '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
    //     '+units=m +no_defs'
    // );
    // register(proj4);
    Axios.get(url).then((res) => {
      let format = new GeoJSON()
      let features = format.readFeatures(res.data)
      console.log(features);
      this.features_ = features
      this.changedImg(0)
    })
    super()
    this.imgfeild_ = imgfeild
  }
  get features() {
    return this.features_
  }
  get imgfeild() {
    return this.imgfeild_
  }
  changedImg(key) {
    console.log(this.features[key].getGeometry().getExtent());
    this.setSource(new Static({
      url: this.features[key].get(this.imgfeild_),
      imageExtent: this.features[key].getGeometry().getExtent(),
      projection: "ESRI:102012",
    }))
  }
}

export default Img