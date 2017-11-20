'use strict';
const co = require('co');

/**
 * 统计
 * @returns {*}
 */
exports.getTotalLoan=function *(){
    return co(function *() {
        try {
            return [['2017-11-11',10000],['2017-11-12',40000],['2017-11-13',60000],['2017-11-14',90000],['2017-11-15',60000],['2017-11-16',80000]];
        } catch (error) {
            console.log(error);
        }
    })
}