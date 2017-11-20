'use strict';
const biz_manage=require('../../base/manage.js');

/**
 * 管理员列表
 */
exports.suppervisor=function*(){
    yield this.render('/manage/suppervisor',{req:this});
}

/**
 * 管理员编辑
 */
exports.editSupervisor=function*(){
    let model=null;
    let id=this.request.query.id||'';
    let roleList=yield biz_manage.getEffectiveRoleList();
    if(id && !isNaN(id)){
        model=yield biz_manage.getSupervisorById(id);
    }
    yield this.render('/manage/editSupervisor',{req:this,model:model,roleList:roleList});
}

/**
 * 管理员保存
 */
exports.saveSupervisor=function*(){
    let supervisor= this.request.body.supervisor||'';
    let result=yield biz_manage.saveSupervisor(supervisor);
    this.body={error:result.error};
}

/**
 * 获取管理员列表
 */
exports.getSupervisorList=function*(){
    let pageNo= this.request.body.pageNo||1;
    let pageSize= this.request.body.pageSize||20;
    let body=yield biz_manage.getSupervisorList(pageNo,pageSize);
    this.body=body;
}

/**
 * 角色编辑
 */
exports.editRole=function*(){
    let role=null;
    let id=this.request.query.id||'';
    if(id && !isNaN(id)){
        role=yield biz_manage.getRoleById(id);
    }
    yield this.render('/manage/editRole',{req:this,role:role});
}

/**
 * 角色列表
 */
exports.role=function*(){
    yield this.render('/manage/role',{req:this});
}

/**
 * 角色列表
 */
exports.getRoleList=function *(){
    let pageNo= this.request.body.pageNo||1;
    let pageSize= this.request.body.pageSize||20;
    let body=yield biz_manage.getRoleList(pageNo,pageSize);
    this.body=body;
}

/**
 * 角色保存
 */
exports.saveRole=function*(){
    let model= this.request.body.model||'';
    let result=yield biz_manage.saveRole(model);
    this.body={error:result.error};
}

exports.test=function*(){
    yield this.render('/manage/test',{req:this});
}