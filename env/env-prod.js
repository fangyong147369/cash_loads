/**
 * 定义测试环境参数配置，全局变量:env
 */
(function(){
    this.com = this.com || {};
    com.env = {
        redis:{
            port:6379,
            host:"192.168.239.132"
        },
        mysql:{
            host:"",
            port:"",
            user:"",
            password:"",
            database:""
        },
        wx: {
            token: '',
            appID: '',
            AppSecret: ''
        },
          core_path: "http://192.168.239.132:8080/sys_api-1.0.0.0",
        //core_path: "http://192.168.239.132:8080/sys_api-1.0.0.0",localhost
        cookiehost:'',
        cdn_url: "",
        guid:function(){
            return new Date().getTime().toString()+Math.abs((((1+Math.random())*0x10000)|0)).toString();
        }
    };
})();
