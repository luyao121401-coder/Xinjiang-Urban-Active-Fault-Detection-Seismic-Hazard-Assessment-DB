import VecSource from 'ol/source/Vector'
import { GPX } from 'ol/format'

class Track extends VecSource{
  constructor(opt_options) {
    const options = opt_options || {}
    let format = options.format || new GPX()

    let url =  options.url
    super({
      format: format,
      url: url
    })
  }
}

export default Track