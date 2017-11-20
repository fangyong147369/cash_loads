/*textarea 字数限制*/
function textarealength(obj,maxlength){
    var v = $(obj).val();
    var l = v.length;
    if( l > maxlength){
        v = v.substring(0,maxlength);
    }
    $(obj).parent().find(".textarea-length").text(v.length);
}

/*Huimodalalert*/
function Huimodal_alert(info,speed,call){
    $(document.body).append(
        '<div id="modal-alert" class="modal hide modal-alert">'+
        '<div class="modal-alert-info">'+info+'</div>'+
        '</div>'
    );
    $("#modal-alert").fadeIn();
    setTimeout(function(){
        Huimodal_alert_hide();
        call();
    },speed)
}
function Huimodal_alert_hide() {
    $("#modal-alert").fadeOut("normal",function(){
        $("#modal-alert").remove();
    });
}
/*弹出层*/
/*
 参数解释：
 title	标题
 url		请求的url
 id		需要操作的数据id
 w		弹出层宽度（缺省调默认值）
 h		弹出层高度（缺省调默认值）
 */
function layer_show(title,url,w,h){
    if (title == null || title == '') {
        title=false;
    };
    if (url == null || url == '') {
        url="404.html";
    };
    if (w == null || w == '') {
        w=800;
    };
    if (h == null || h == '') {
        h=($(window).height() - 50);
    };
    layer.open({
        type: 2,
        area: [w+'px', h +'px'],
        fix: false, //不固定
        maxmin: true,
        shade:0.4,
        title: title,
        content: url
    });
}
/*关闭弹出框口*/
function layer_close(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

function TableManaged(){
    $('#sample_1 .group-checkable').click(function () {

        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        $(set).each(function () {

            if (checked) {
                $(this).attr("checked", true);
            } else {
                $(this).attr("checked", false);
            }
        });
        jQuery.uniform.update(set);
    });
}
/*得到失去焦点*/
jQuery.Huifocusblur = function(obj) {
    $(obj).focus(function() {$(this).addClass("focus").removeClass("inputError");});
    $(obj).blur(function() {$(this).removeClass("focus");});
};
$.Huifocusblur(".input-text,.textarea");

/*tab选项卡*/
jQuery.Huitab =function(tabBar,tabCon,class_name,tabEvent,i){
    var $tab_menu=$(tabBar);
    // 初始化操作
    $tab_menu.removeClass(class_name);
    $(tabBar).eq(i).addClass(class_name);
    $(tabCon).hide();
    $(tabCon).eq(i).show();

    $tab_menu.on(tabEvent,function(){
        $tab_menu.removeClass(class_name);
        $(this).addClass(class_name);
        var index=$tab_menu.index(this);
        $(tabCon).hide();
        $(tabCon).eq(index).show();
    });
}