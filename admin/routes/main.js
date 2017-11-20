'use strict';
const main = require('../controllers/main');
const session = require('../filters/session-filter');
const koaBody = require('koa-body')();

module.exports = function (router) {
    router.get('/',koaBody,session.auth,main.index);
    router.get('/signIn',koaBody,main.signIn);
    router.post('/signIn',koaBody,main.findSuppervisor);
    router.get('/signOut',koaBody,main.signOut);
    router.get('/index',koaBody,session.auth,main.index);
    router.post('/main/getTotalLoan',koaBody,main.getTotalLoan);
};