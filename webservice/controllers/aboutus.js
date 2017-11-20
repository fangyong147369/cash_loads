'use strict';

/**
 * 关于我们
 */
exports.index=function*(){
    yield this.render('aboutus',{req:this});
}
