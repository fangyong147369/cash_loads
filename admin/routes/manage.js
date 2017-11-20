'use strict';
const manage = require('../controllers/manage');
const session = require('../filters/session-filter');
const koaBody = require('koa-body')();

module.exports = function (router) {
    router.get('/manage/suppervisor',koaBody,session.auth,manage.suppervisor);
    router.get('/manage/editSupervisor',koaBody,session.auth,manage.editSupervisor);
    router.post('/manage/saveSupervisor',koaBody,session.auth,manage.saveSupervisor);
    router.post('/manage/getSupervisorList',koaBody,session.auth,manage.getSupervisorList);

    router.get('/manage/role',koaBody,session.auth,manage.role);
    router.post('/manage/getRoleList',koaBody,session.auth,manage.getRoleList);
    router.get('/manage/editRole',koaBody,session.auth,manage.editRole);
    router.post('/manage/saveRole',koaBody,session.auth,manage.saveRole);

    router.get('/test',koaBody,session.auth,manage.test);
};