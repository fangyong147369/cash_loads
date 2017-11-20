'use strict';
const user = require('../controllers/user');
const koaBody = require('koa-body')();
const oauth=require('../filters/oauth.js')
module.exports = function (router) {
    router.post('/api/signIn',koaBody,oauth.verifySignature,user.signIn);
};
