'use strict';

/**
 * 登录
 */
exports.signIn=function*(){
    let name=this.request.body.mobile;
    let password=this.request.body.password;
    this.body={error:null,errcode:0,sessionId:'xxxxxx'};
}
