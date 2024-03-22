import VectorLayer from 'ol/layer/Vector'
import MemberS from '../source/Member'

class Member extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let source = new MemberS({
      getID: options.getID,
    })
    let map = options.map
    let timing
    super({
      source,
      map
    })
    this.on('propertychange', e => {
      if(e.key == 'map' && e.oldValue) {
        clearInterval(timing)
      }
      else if(e.key == 'map' && !e.oldValue) {
        timing = source.timing(5)
      }
    })
  }
}

export default Member