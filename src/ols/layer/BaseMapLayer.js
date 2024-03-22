import Grouplayer from 'ol/layer/Group'
import Collection from 'ol/Collection'
import GDSue from '../source/GD'
import TDTSue from '../source/TDT'
import TileLayer from 'ol/layer/Tile'

class BaseMapLayer extends Grouplayer {
  
  constructor(opt_options) {
    const options = opt_options || {}

    let type =
      options.type !== undefined ? options.type : 'img_tdt'

    let annoVisible =
      options.annoVisible !== undefined ? options.annoVisible : true
    
    let buttontarget = options.buttontarget
    // if (buttontarget !== undefined) {
    //   let targetHTML = document.getElementById(buttontarget)
    //   let button1 = document.createElement('button')
    //   targetHTML.appendChild(button1)
    //   button1.textContent = 'vec'
    //   button1.className = 'mapchange-btn'
    //   button1.onclick = () => {
    //     this.type = 'vec_tdt'
    //     // let allchgbtn = document.getElementsByClassName('mapchange-btn')
    //     // let btnarr=[...allchgbtn]
    //     btnarr.forEach(btn=>{
    //       btn.disabled = false
    //     })
    //     button1.disabled = true
    //   }
    //   let button2 = document.createElement('button')
    //   targetHTML.appendChild(button2)
    //   button2.textContent = 'img'
    //   button2.className = 'mapchange-btn'
    //   button2.onclick = () => {
    //     this.type = 'img_tdt'
    //     btnarr.forEach(btn=>{
    //       btn.disabled = false
    //     })
    //     button2.disabled = true
    //   }
    //   let button3 = document.createElement('button')
    //   targetHTML.appendChild(button3)
    //   button3.textContent = 'ter'
    //   button3.className = 'mapchange-btn'
    //   button3.onclick = () => {
    //     this.type = 'ter_tdt'
    //     btnarr.forEach(btn=>{
    //       btn.disabled = false
    //     })
    //     button3.disabled = true
    //   }
    //   let button4 = document.createElement('button')
    //   targetHTML.appendChild(button4)
    //   button4.textContent = 'ter'
    //   button4.className = 'mapchange-btn'
    //   button4.onclick = () => {
    //     this.type = 'vec_gd'
    //     btnarr.forEach(btn=>{
    //       btn.disabled = false
    //     })
    //     button4.disabled = true
    //   }
    //   let button5 = document.createElement('button')
    //   targetHTML.appendChild(button5)
    //   button5.textContent = 'ter'
    //   button5.className = 'mapchange-btn'
    //   button5.onclick = () => {
    //     this.type = 'img_gd'
    //     btnarr.forEach(btn=>{
    //       btn.disabled = false
    //     })
    //     button5.disabled = true
    //   }
  
    //   let allchgbtn = document.getElementsByClassName('mapchange-btn')
    //   let btnarr=[...allchgbtn]
    //   let button6 = document.createElement('button')
    //   targetHTML.appendChild(button6)
    //   // button6.onclick = () => {
    //   //   this.annoVisible = !this.annoVisible
    //   //   button6.textContent = this.annoVisible?'开':'关'
    //   // }
    // }


    let base = new TileLayer({
      source: new TDTSue({type: type.slice(0,3), tk: 'd21000f516e20e56b2a2b50596ecc1ee'})
    })
    let anno = new TileLayer({
      source: new TDTSue({type: `c${type.slice(0,3).slice(0, 1)}a`, tk: 'd21000f516e20e56b2a2b50596ecc1ee'}),
      visible:annoVisible
    })
    let baseGroup = new Collection([base, anno])

    super({
      layers: baseGroup,
      zIndex: 0,
      preload: 4
    })
    this._hasAnno = (type !== 'vec_gd')
    this._annoVisible = annoVisible
    this._type = type
  }
  get type() {
    return this._type
  }
  set type(key) {
    console.log(222);
    this._type = key
    if (key.slice(4) == 'tdt') {
      this.getLayers().getArray().forEach(lyr=>{
        if (lyr.getSource()!==null&&['vec', 'img','ter', 'other'].includes(lyr.getSource().type)) {
          lyr.setSource(
            new TDTSue({
              type: key.slice(0,3),
              tk: 'd21000f516e20e56b2a2b50596ecc1ee'
            })
          )
        }
        else if (lyr.getSource()==null||['cva', 'cia', 'cta'].includes(lyr.getSource().type)) {
          lyr.setSource(
            new TDTSue({
              type: `c${key.slice(0,3).slice(0, 1)}a`,
              tk: 'd21000f516e20e56b2a2b50596ecc1ee'
            })
          )
          this._hasAnno = true
        }
      })
    }
    else if (key.slice(4) == 'gd') {
      this.getLayers().getArray().forEach(lyr=>{
        if (lyr.getSource()!==null&&['vec', 'img','ter', 'other'].includes(lyr.getSource().type)) {
          lyr.setSource(
            new GDSue({
              type: key.slice(0,3)
            })
          )
        }
        else if (lyr.getSource()==null||['cva', 'cia', 'cta'].includes(lyr.getSource().type)) {
          let type = `c${key.slice(0,3).slice(0, 1)}a`
          let source
          if (type == 'cia') {
            source = new GDSue({ type })
            this._hasAnno = true
          } else {
            source = null
            this._hasAnno = false
          }
          lyr.setSource(source)
        }
      })
    }
  }
  get annoVisible() {
    return this._annoVisible
  }
  set annoVisible(value) {
    this._annoVisible = value
    this.getLayers().getArray().forEach(lyr=>{
      if (lyr.getSource()!==null&&['cva', 'cia', 'cta'].includes(lyr.getSource().type)) {
        lyr.setVisible(value)
      }
    })
  }
  get hasAnno() {
    return this._hasAnno
  }
  changeLyr(sue) {
    this._type = 'other'
    this.getLayers().getArray().forEach(lyr=>{
      if (lyr.getSource()!==null&&['vec', 'img','ter', 'other'].includes(lyr.getSource().type)) {
        lyr.setSource(sue)
        lyr.getSource().type = 'other'
      }
      else if (lyr.getSource()==null||['cva', 'cia', 'cta'].includes(lyr.getSource().type)) {
        lyr.setSource()
        this._hasAnno = false
      }
    })
  }
}
export default BaseMapLayer