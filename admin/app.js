'use strict';
const env = process.argv[2];
require('../env/env-' + env);
const app = require('koa')();
const logger = require('koa-logger');//日志打印
const koa_static=require('koa-static');//静态文件
const router = require('koa-router')(); //路由
const onerror = require('koa-onerror');
const render = require('koa-ejs');
const path = require('path');
const fs = require('fs');

//const session = require('koa-session');//基于cookie的session
const session = require('koa-generic-session');//基于缓存的session
const redisStore = require('koa-redis');
app.keys = ['some secret hurr','keys'];//设置签名Cookie密钥
app
    .use(session({
        secret: 'adMiN_AH^%^SSFWPDG32A2DKJS(*PDSA',
        key: 'account_session',
        proxy: 'true',
        cookie: {
            domain: com.env.cookiehost,
            path: '/',
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000 ,
            rewrite: true,
            signed: true
        },
        store: redisStore({
            host:com.env.redis.host,
            port:com.env.redis.port,
            prefix: "account_",
            ttl: 60 * 30
        })
    }))
    .use(router.routes())
    .use(router.allowedMethods())

require('../tools/util');

console.log(__dirname);
console.log(path.dirname(__dirname));
app.use(koa_static('public'));

if ('dev' === env) {
    app.use(logger());
}
onerror(app);

global._static_url =com.env.cdn_url;
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *(next){
    if(this.status=="404"){
        if(this.method==="POST"){
            this.body={error:'Not Found ',errcode:-1};
        }else{
            yield this.render('404');
        }
    }else{
        yield next;
    }
})

fs.readdirSync('./routes').forEach(function(file){
    if(file.indexOf(".js")>-1)
        require('./routes/'+file.replace(/^(.+)\.js$/,"$1"))(router);
})

render(app, {
    layout: '__layout',
    root: path.join(__dirname, 'views'),
    viewExt: 'ejs',
    cache: ('dev' !== env),
    debug: ('dev' === env)
});

app.on('error', function(err){
    console.log('server error', err);
    throw new Error(err);
});

app.listen(4000);