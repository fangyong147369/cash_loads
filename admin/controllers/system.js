'use strict';
const system=require('../../base/system.js');

/**
 * 菜单
 */
exports.menu=function*(){
    yield this.render('/system/menu',{req:this});
}

/**
 * 菜单编辑
 */
exports.editMenu=function*(){
    let menu=null;
    let id=this.request.query.id||'';
    let parentMenu=yield system.getParentMenuList();
    if(id && !isNaN(id)){
        menu=yield system.getMenuById(id);
    }
    yield this.render('/system/editMenu',{req:this,parentMenu:parentMenu,menu:menu});
}

/**
 * 菜单列表
 */
exports.getMenuList=function *(){
    let pageNo= this.request.body.pageNo||1;
    let pageSize= this.request.body.pageSize||20;
    let body=yield system.getMenuList(pageNo,pageSize);
    this.body=body;
}

/**
 * 菜单保存
 */
exports.saveMenu=function*(){
    let menu= this.request.body.menu||'';
    let result=yield system.saveMenu(menu);
    this.body={error:result.error};
}