import axios from 'axios';
import qs from 'query-string';
import microCache from './cache';
import md5 from 'md5';

class BaseModule {
  constructor() {
    this.$http = axios.create();
    this.dataMethodDefaults = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        return qs.stringify(data)
      }]
    };
  }

  get(url, data = {}, config = {}) {
    let res;
    const key = md5(url);

    if (microCache.cached && microCache.cached.has(key)) {
      return Promise.resolve(microCache.cached.get(key))
    }

    res = this.$http.get(url, config);

    if (microCache.cached && data.cached) {
      microCache.cached.set(key, res);
    }

    return res;
  }

  post(url, data = undefined, config = {}) {
    return this.$http.post(url, data, {...this.dataMethodDefaults, ...config})
  }

  patch(url, data = undefined, config = {}) {
    return this.$http.patch(url, data, {...this.dataMethodDefaults, ...config})
  }

  put(url, data = undefined, config = {}) {
    return this.$http.put(url, data, {...this.dataMethodDefaults, ...config})
  }

  delete(url, config = {}) {
    return this.$http.delete(url, config)
  }
}

export default BaseModule
