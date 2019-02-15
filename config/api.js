const build = {
  static_url: 'https://static-client.jrucker.cn/', // 静态资源路径
  common_url: 'https://www.jrucker.cn',
};
const build_dev = {
  static_url: 'http://static-client.jrucker.cn:8081/', // 静态资源路径
  common_url: 'http://www.jrucker.cn:7777',
};
const dev = {
  static_url: 'http://localhost:8081/', // 静态资源路径
  common_url: 'http://localhost:7777',
};

module.exports = {build, build_dev, dev};
