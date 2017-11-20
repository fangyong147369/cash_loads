/**
 * author zzhu
 * 列表js
 * Created by pwx on 2016/8/8.
 */
ZC_api = {

    /** 登录  **/
    signIn: function () {
        let $form = $('form');
        let res = $form.checkForm();
        if (res) {
            $form.submit();
        }
        return false;
    },

    /** 菜单列表**/
    loadMenu:function(pn,size){
        let ele = $('#menu_list');
        let pager = $('#page');
        var data = {
            pageNo: pn,
            pageSize: size
        };
        $.post("/system/getMenuList", data, function (res) {
            let tmpl = $('#menu_tmpl').html();
            let arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        state:function(x){
                            if(x==1){
                                return '已启用';
                            }else{
                                return '未启用';
                            }
                        },
                        parentId:function(x){
                           return x;
                        },
                        remark:function(x){
                            return '--';
                        },
                        type:function(x){
                            return '--';
                        },
                        handle: function (x) {
                            return '<a href="/system/editMenu?id=' + o.id + '">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                App.init();
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadMenu(pn, s);
                    }
                });
            }else {
                $(ele).html('');
            }
        });
    },

    /** 管理员列表 **/
    loadSupervisorsList: function (pn, size) {
        let ele = $('#supervisors_list');
        let pager = $('#page');
        let data = {
            pageNo: pn,
            pageSize: size
        };
        $.post("/manage/getSupervisorList", data, function (res) {
            let tmpl = $('#supervisors_tmpl').html();
            let arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        addTime: function (x) {
                            return x?new Date(x).Format('yyyy-MM-dd hh:mm'):'';
                        },
                        role: function (x) {
                            return x|| '';
                        },
                        mobile: function (x) {
                            return x|| '';
                        },
                        lastLogin: function (x) {
                            return o.loginTime ? new Date(o.loginTime).Format('yyyy-MM-dd hh:mm') : '';
                        },
                        lock: function (x) {
                            return x ? '未启用' : '已启用';
                        },
                        handle: function (x) {
                            return '<a href="/manage/editSupervisor?id=' + o.id + '">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                App.init();
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadSupervisorsList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    },

    /** 角色列表 **/
    loadRoleList:function(pn,size){
        let ele = $('#role_list');
        let pager = $('#page');
        let data = {
            pageNo: pn,
            pageSize: size
        };
        $.post("/manage/getRoleList", data, function (res) {
            let tmpl = $('#role_tmpl').html();
            let arr = [];
            if (res.list && res.list.length > 0) {
                $.each(res.list, function (i, o) {
                    arr.push(DataProxy.setTmplDta(o, tmpl, {
                        name: function (x) {
                            return x|| '';
                        },
                        mobile: function (x) {
                            return x|| '';
                        },
                        remark: function (x) {
                            return x||'';
                        },
                        state: function (x) {
                            return x ? '未启用' : '已启用';
                        },
                        handle: function (x) {
                            return '<a href="javascript:void(0);" onclick="edit('+o.id+')">编辑</a>';
                        }
                    }));
                });
                $(ele).html('').append(arr.join(''));
                App.init();
                $(pager).pager({
                    pageIndex: pn, total: res.total, size: size, pagerItemClick: function (pn, s) {
                        ZC_api.loadRoleList(pn, s);
                    }
                });
            } else {
                $(ele).html('');
            }
        });
    }

}

