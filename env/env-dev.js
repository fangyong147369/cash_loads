/**
 * 定义测试环境参数配置，全局变量:env
 */
(function(){
    this.com = this.com || {};
    com.env = {
        redis:{
            port:6379,
            host:"127.0.0.1"
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
        core_path: "http://localhost:8080",
        cookiehost:'',
        cdn_url: "",
        guid:function(){
            return new Date().getTime().toString()+Math.abs((((1+Math.random())*0x10000)|0)).toString();
        }
    };
})();