import VectorLayer from "ol/layer/vector";
import VectorSource from "ol/source/vector";
import GeoJSON from "ol/format/GeoJSON";
import Group from "ol/layer/group";
import { Style, Fill, Stroke, Circle, Text } from "ol/style";

class PSRegion extends Group {
  constructor(opt_options) {
    const options = opt_options || {};
    let l1 = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: 'l1.geojson',
      }),
      style: f => {
        return new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0)'
          }),
          stroke: new Stroke({
            color: '#000000',
            width: 2
          }),
          text: new Text({
            font: '16px Calibri,sans-serif',
            fill: new Fill({
              color: '#000'
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 3
            }),
            text: f.get('BeltNumber') ? f.get('RegionNumber') + '-' + f.get('BeltNumber') : f.get('RegionNumber')
          })
        })
      }
    });
    let l2 = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: 'l2.geojson',
      }),
      style: f => {
        return new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0)'
          }),
          stroke: new Stroke({
            color: '#000000',
            width: 1
          }),
          text: new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({
              color: '#000'
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 3
            }),
            text: f.get('SSZoneNumber')
          })
        })
      }
    });
    let l3 = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: 'l3.geojson',
      }),
      style: (f) => {
        let Mu = f.get("Mu");
        let color;
        let trsp = "0.8";
        switch (Mu) {
          case 5:
            color = `rgba(255, 255, 255, ${trsp})`;
            break;
          case 5.5:
            color = `rgba(243, 246, 208, ${trsp})`;
            break;
          case 6:
            color = `rgba(251, 231, 208, ${trsp})`;
            break;
          case 6.5:
            color = `rgba(241, 183, 126, ${trsp})`;
            break;
          case 7:
            color = `rgba(233, 174, 29, ${trsp})`;
            break;
          case 7.5:
            color = `rgba(195, 100, 26, ${trsp})`;
            break;
          case 8:
            color = `rgba(123, 94, 38, ${trsp})`;
            break;
          case 8.5:
            color = `rgba(216, 31, 28, ${trsp})`;
            break;
          case 9:
            color = `rgba(106, 35, 103, ${trsp})`;
            break;
          default:
            color = `rgba(255, 255, 255, ${trsp})`;
            break;
        }
        return new Style({
          fill: new Fill({
            color,
          }),
          stroke: new Stroke({
            color: "#6e6e6e",
          }),
        });
      },
    });
    let layers = [l1, l2, l3];
    let popupTemplate = {
      attributes: [
        {
          key: "BeltNumber",
          title: "带号"
        },
        {
          key: "RegionNumber",
          title: "区号"
        },
      ],
      // attributes:
      // {
      //   // "RegionNumber": {
      //   //   title: "区号",
      //   // },
      //   // "BeltNumber": {
      //   //   title: "带号",
      //   // },
      // }
    }
    l1.popupTemplate = popupTemplate;
    super({
      layers: layers,
    });
    this._popupTemplate = popupTemplate
  }
  get popupTemplate() {
    return this._popupTemplate
  }
}
export default PSRegion;