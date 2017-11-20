/**
 * @author zzhu
 * 系统配置业务
 */
'use strict';
const co = require('co');
const midx=require('./midx');

/**
 * 管理员登录
 * @param name
 * @param password
 * @returns {*}
 */
exports.getMenuList=function *(pageNo,pageSize){
    pageNo=pageNo||1;
    pageSize=pageSize||20
    return co(function *() {
        try {
            let result=yield midx('/s/menu/list',{pageNo:pageNo,pageSize:pageSize});
            return {list:(result && result.data && result.data.list && result.data.list instanceof Array ? result.data.list:[]),pageNo:pageNo,pageSize:pageSize,total:(result && result.data && result.data.page && result.data.page.total && !isNaN(result.data.page.total)?result.data.page.total:0)};
        } catch (error) {
            console.log(error);
            return {list:[],pageSize:pageSize,total:0,pageNo:pageNo,error:error};
        }
    })
}

/**
 * 父菜单
 */
exports.getParentMenuList=function *(){
    return co(function *() {
        try {
            let result=yield midx('/s/menu/list',{pageNo:1,pageSize:100,parentId:0,state:1});
            return (result && result.data && result.data.list && result.data.list instanceof Array) ? result.data.list:[];
        } catch (error) {
            console.log(error);
            return {list:[],error:error};
        }
    })
}

/**
 * 菜单编辑
 * @param params object对象
 * @returns {*}
 */
exports.saveMenu=function*(params){
    try{
        params=JSON.parse(params);
    }catch(e){
        params=null;
    }
    if(!params || typeof params !='object'){
        return {error:'参数错误.'}
    }
    if (!params || !params.name || !((/^[\u4e00-\u9fa5]+([\.|\·][\u4e00-\u9fa5]+)*$/).test(params.name))) {
        return {error:'菜单名称不正确.'};
    }
    if (params.parentId!=0 && !params.href) {
        return {error:'菜单链接不能为空.'};
    }
    if (params.parentId==0 && params.href) {
        return {error:'一级菜单无需配菜单.'};
    }
    return co(function *() {
        try {
            let result=null;
            if(!params.id){
                result=yield midx('/s/menu/add',params);
                if(result && result.data && result.data.id){
                    return {error:null};
                }else{
                    return {error:result.message};
                }
            }else{
                let model= yield midx('/s/menu/getById',{id:params.id});
                if(!model || !model.data || !model.data.id){
                    return {error:'菜单信息错误.'};
                }
                if(params.parentId==model.data.id){
                    return {error:'父菜单不能选自身.'};
                }
                let modelList=[];
                if(model.data.parentId===0 && params.parentId!=0){
                    modelList=yield midx('/s/menu/list',{parentId:id});
                    if(modelList && modelList.data && modelList.data.list && modelList.data.list instanceof Array && modelList.data.list.length>0){
                        return {error:'该菜单有子菜单不能变更菜单级别.'};
                    }
                }
                result=yield midx('/s/menu/update',params);
            }
            return result;
        } catch (error) {
            console.log(error);
            return {error:error};
        }
    })
}

/**
 * 根据id获取菜单
 * @param id
 * @returns {*|Promise}
 */
exports.getMenuById=function*(id){
    return co(function *() {
        try {
            let result=yield midx('/s/menu/getById',{id:id});
            return (result && result.data && result.data.id) ?result.data:null;
        } catch (error) {
            console.log(error);
            return null;
        }
    })
}