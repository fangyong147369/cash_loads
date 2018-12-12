'use strict';
const env = process.argv[2];
require('../env/env-' + env);
const app = require('koa')();
const logger = require('koa-logger');//日志打印
const koa_static = require('koa-static');//静态文件
const router = require('koa-router')(); //路由
const onerror = require('koa-onerror');
const render = require('koa-ejs');
const path = require('path');
const fs = require('fs');
//const session = require('koa-session');//基于cookie的session
const session = require('koa-generic-session');//基于缓存的session
const redisStore = require('koa-redis');
require('../tools/util');
require('../tools/gloabVariable');
app.keys = ['some secret hurr', 'keys'];//设置签名Cookie密钥
app.use(session({
    secret: 'adMiN_AH^%^SSFWPDG32A2DKJS(*PDSA',
    key: 'account_session',
    proxy: 'true',
    cookie: {
        domain: com.env.cookiehost,
        path: '/',
        httpOnly: true,
        maxAge: 60*60*1000,//Session有效期单位毫秒
        rewrite: true,
        signed: true
    },
    store: redisStore({
        host: com.env.redis.host,
        port: com.env.redis.port,
        prefix: "/",
        ttl: 60*1000
    })
}))
    .use(router.routes())
    .use(router.allowedMethods())
require('../tools/util');
console.log(__dirname);
console.log(path.dirname(__dirname));
app.use(koa_static('public'));
/**
 * 默认是 NODE_ENV 或 "development"
 */
app.env
if ('dev' === env) {
    app.use(logger());
}
onerror(app);

global._static_url = com.env.cdn_url;
app.use(function* (next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});
app.use(function* (next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});
app.use(function* (next) {
    try {
        if (this.status == "404") {
            if (this.method === "POST") {
                this.body = {message: '此接口不存在！ ', code: -1};
            } else {
                yield this.render('404');
            }
        }
        else {
            yield next;
        }
    } catch (err) {
        ctx.throw(500,"  服务内部异常");
        // ctx.throw(400, 'name required');
        // ctx.throw(400, 'name required', { user: user });
    }
})
/**
 *由于中间件是层级式调用，所以可以把try { yield next }当成第一个中间件。
 */
app.use(function* (next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }
});
/**
 * 错误处理机制
 */
app.use(function* () {
    try {
        yield saveResults();
    } catch (err) {
        this.throw(400, '数据无效');
    }
});
fs.readdirSync('./routes').forEach(function (file) {
    if (file.indexOf(".js") > -1)
        require('./routes/' + file.replace(/^(.+)\.js$/, "$1"))(router);
})

render(app, {
    layout: '__layout',
    root: path.join(__dirname, 'views'),
    viewExt: 'ejs',
    cache: ('dev' !== env),
    debug: ('dev' === env)
});
/**
 * 对于未捕获错误，可以设置error事件的监听函数。
 */
app.on('error', function (err) {
    console.log('server error ', err);
});

app.listen(4700);
console.log('正在监听端口为：4700   '+((env.toString()==='prod')?"生产环境":"开发环境"));
