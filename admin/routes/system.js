'use strict';
const system = require('../controllers/system');
const session = require('../filters/session-filter');
const koaBody = require('koa-body')();

module.exports = function (router) {
    router.get('/system/menu',koaBody,session.auth,system.menu);
    router.post('/system/getMenuList',koaBody,session.auth,system.getMenuList);
    router.get('/system/editMenu',koaBody,session.auth,system.editMenu);
    router.post('/system/saveMenu',koaBody,session.auth,system.saveMenu);
};