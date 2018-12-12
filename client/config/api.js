const build = {
    static_url: 'http://blog.jrucker.cn/', // 静态资源路径
    common_url: 'http://blog.jrucker.cn',
};
const build_dev = {
    static_url: 'http://blog.jrucker.cn:8080/', // 静态资源路径
    common_url: 'http://blog.jrucker.cn:8080',
};
const dev = {
    static_url: 'http://localhost:8082/', // 静态资源路径
    common_url: 'http://localhost:8082',
};

module.exports = {build, build_dev, dev};
