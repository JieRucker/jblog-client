/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/1/23 下午11:18
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/1/23 下午11:18
 */

import LRU from 'lru-cache';

let api;

if (process.__API__) {
  api = process.__API__
} else {
  api = process.__API__ = {
    cached: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    cachedItem: {}
  }
}

api.cached.set('key2', '343434');

export default api
