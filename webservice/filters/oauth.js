'use strict';
require('../lib/merchant.js');
const crypto = require('crypto');
const oauth = require('mashape-oauth');

/**
 * 验签
 * @param req
 * @param res
 * @param next
 */
exports.verifySignature = function*(next) {
    let route=this.request.body.route||'';
    let service=this.request.body.service||'';
    let ticks=this.request.body.ticks||'';
    let sign=this.request.body.sign||'';
    let nowTicks = new Date().getTime()||'';
    let version=this.request.body.version||'';

    console.log("route="+route);
    console.log("service="+service);
    console.log("ticks="+ticks);
    console.log("sign="+sign);
    console.log("version="+version);

    if (mers[route] && mers[route].rsa) {
        let verifier = crypto.createVerify(oauth.OAuth.signatures.rsa).update( service + version + mers[route].token + ticks );
        let valid = verifier.verify(mers[route].pubKey, sign, 'base64');
        console.log("验签："+valid);
        if (!valid)
            this.body={error:'验签不通过',errcode:-1};
        else if (new Date().getTime() - parseInt(ticks) > 120000) {
            this.body={error:'您手机时间有误，请调整（建议同步网络时间）！',errcode:-2};
        }
        else {
            yield* next;
        }
    } else {
        this.body={error:'验签不通过',errcode:-1};
    }
};