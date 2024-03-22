import VectorLayer from 'ol/layer/Vector'
import CeicSue from '../source/CEIC'
import {Style, Icon} from 'ol/style';
import gifler from '../gifler'
import {quakeiconpath} from '../path'



class CeicLyr extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}

    let popupTemplate = 
      options.popupTemplate !== undefined ? options.popupTemplate : {
        title: function(f) {
          return f.get('location') + '-' + f.get('M') + '级';
        },
        attributes: {
          'M': {
            title: '震级',
          },
          'date': {
            title: '日期',
          },
          'location': {
            title: '地点',
          },
          'Lat': {
            title: '纬度',
            format: v => {
              return v + '°'
            }
          },
          'Lon': {
            title: '经度',
            format: v => {
              return v + '°'
            }
          },
          'depth': {
            title: '深度',
          }
        }
      }
    let source = 
      new CeicSue()
      
    var styleCache = {};
    var styleFunction = function (feature) {
      var M = Math.floor(feature.get('M'))
      var c = feature.get('c')
      var png
      if (!c) {
        var date = feature.get('date')
        var reg = /^(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/
        var s  = date.match(reg)
        var result = ''
        if(s){
          result = (new Date() - new Date(s[1],s[2] - 1,s[3],s[4],s[5],s[6])) / (3600 * 24 * 1000)
        }
        var color = ''
        if (result < 1) {
          color = '_red'
        }
        if (result>1 && result < 7) {
          color = '_orange'
        }
        if (result >= 7) {
          color = '_yellow'
        }
        png =  M + 'm' + color + '.png'
      }else {
        png = 'star.gif'
      }
      var style = styleCache[png]
      if (!style) {
        style = new Style({
          image: new Icon({
            src: quakeiconpath + (png=='star.gif'?'star.gif':png.slice(1)),
            scale: (2 + M)/8
          }),
        });
        styleCache[png] = style;
      }
      return style;
    }

    super({
      source,
      style: styleFunction,
    })
    this._popupTemplate = popupTemplate
    this.once('propertychange', () => {
      // this.get('map').render()
      gifler(quakeiconpath + 'star.gif').frames(
        document.createElement('canvas'),
        (ctx, frame) => {
          styleCache['star.gif'] = new Style({
            image: new Icon({
              img: ctx.canvas,
              imgSize: [frame.width, frame.height],
              opacity: 1,
            }),
          })
          ctx.clearRect(0, 0, frame.width, frame.height)
          ctx.drawImage(frame.buffer, frame.x, frame.y)
          // this.once('postrender', () => {
          //   this.get('map').render()
          // })
          // if (this.get('map'))
            this.get('map').render();
        },
        true
      )
    })
  }
  get popupTemplate() {
    return this._popupTemplate
  }
}

export default CeicLyr