'use strict';
const aboutus = require('../controllers/aboutus');
const koaBody = require('koa-body')();
module.exports = function (router) {
    router.get('/api/aboutus',koaBody,aboutus.index);
};
