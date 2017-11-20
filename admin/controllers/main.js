'use strict';
const biz_suppervisors=require('../../base/suppervisors.js');
const biz_stat=require('../../base/stat.js');

/**
 * 登录
 */
exports.signIn=function*(){
    yield this.render('/main/signIn',{req:this});
}

/**
 * 注销
 */
exports.signOut=function*(){
    delete this.session.user;
    yield this.render('/main/signIn',{req:this});
}

/**
 * 首页
 */
exports.index=function*(){
    yield this.render('/main/index',{req:this});
}

/**
 * 登录
 */
exports.findSuppervisor=function*(){
    let name=this.request.body.name;
    let password=this.request.body.password;
    let body=yield biz_suppervisors.findSuppervisor(name,password);
    if(body.error || !body.model){
        this.body={error:body.error};
    }else{
        this.session.user=body.model;
        this.redirect('/index',{req:this});
    }
}

/**
 * 统计每天借贷
 */
exports.getTotalLoan=function*(){
    let data=yield biz_stat.getTotalLoan();
    this.body=data;
}