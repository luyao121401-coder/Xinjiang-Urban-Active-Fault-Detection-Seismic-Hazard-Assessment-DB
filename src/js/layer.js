import {
    Feature
} from "ol";
import {
    Polygon
} from "ol/geom";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import {
    createKmlLayer,
    createShapeLayer,
  } from "@/components/omap/js/FileLayerFactory";

export function shpupload(e, map, arr) {
    createShapeLayer(e, "name", null, layer => {
        // this.$refs.mapview.addLayer(layer);
            map.addLayer(layer)
            let obj = {
                layer: layer,
                name: e.name.slice(0, -4),
                status: false
            }
            layer.setVisible(false)
            arr.push(obj)
      });
}


// tab 格式导入
export function tabupload(e, map, arr) {
    const formdata = new FormData();
    formdata.append("mapinfo", e);
    mapInfo(formdata).then((res) => {
        if (res.data.status == 200) {
            let array = res.data.data;
            let features = [];
            array.map((item) => {
                let feature = new Feature({
                    geometry: new Polygon(JSON.parse(item.geometry).coordinates),
                });
                features.push(feature);
            });
            let layer = new VectorLayer({
                source: new VectorSource({})
            })
            layer.getSource().addFeatures(features);
            map.addLayer(layer)
            let obj = {
                layer: layer,
                name: e.name.slice(0, -4),
                status: false
            }
            layer.setVisible(false)
            arr.push(obj)

        }
    });
}


// kml,kmz
export function kmupload(type, file, proj, map, arr) {
    createKmlLayer(file, "name", layer => {
           map.addLayer(layer);
            let obj = {
                layer: layer,
                name: file.name.slice(0, -4),
                status: false
            }
            layer.setVisible(false);
            arr.push(obj)
    });
}