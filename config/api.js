const build = {
  static_url: 'http://blog.jrucker.cn/', // 静态资源路径
  common_url: 'http://localhost:7777',
};
const build_dev = {
  static_url: 'http://blog.jrucker.cn:8081/', // 静态资源路径
  common_url: 'http://api.jrucker.cn:8081',
};
const dev = {
  static_url: 'http://localhost:8081/', // 静态资源路径
  common_url: 'http://localhost:7777',
};

module.exports = {build, build_dev, dev};
