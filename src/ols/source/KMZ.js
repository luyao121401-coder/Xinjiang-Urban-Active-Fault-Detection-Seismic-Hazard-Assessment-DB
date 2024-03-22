import VectorSource from "ol/src/source/Vector";

class KMZSuc extends VectorSource{
  constructor(opt_options) {
    const options = opt_options || {};
    super({
      format: options.format,
      url: options.url,
      loader: (
        extent,
        resolution,
        projection) => {
        const xhr = new XMLHttpRequest();
        xhr.open(
          'GET',
          options.url,
          true
        );
        xhr.responseType = 'arraybuffer';
        xhr.onload = e => {
          let format = options.format;
          if (!xhr.status || (xhr.status >= 200 && xhr.status < 300)) {
            let source = (xhr.response);
            if (source) {
              format.readFeatures(source, {
                extent: extent,
                featureProjection: projection,
              }).then(fs => {
                this.addFeatures(fs);
              })
            } else {
              console.log('No response');
            }
          } else {
            console.log('Request failed');
          }
        };
        xhr.send();
      }
    });
  }
}

export default KMZSuc;