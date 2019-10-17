const moment = require('moment');
moment.locale('zh-cn');

class Tools {
	constructor() {
        this.instance = null;
    }
    static getInstance() {
        if(!this.instance) {
            this.instance = new Tools();
        }
        return this.instance;
    }
    //判断参数是否为空 0也算作空
    isEmpty(value){
      return !value||value==="null"||value==="undefined"||value===""||value===0;
    }
    //获取地址栏中的某个参数
    getUrlAttribute (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    //获取地址参数对象
    getUrlAttributeObj(url){
        var obj = {};
        var url = url||window.location.search;
        if(url && url.length && url.indexOf("?")>=0){
            var str = url.substring(url.indexOf("?")+1);
            var temp = str.split("&");
            for(var i=0; i<temp.length; i++){
                var map = temp[i].split("=");
                obj[map[0]] = map[1];
            }
        }
        return obj;
    }
    //获取时间戳
    getTimeStamp(){
        return Math.floor(Date.now()/1000);
    }
    //随机数
    randomAB(min,max){
        return Math.floor(min+Math.random()*(max-min));
    }
    //地址参数拼接
    pathJoin(param,unSort){
        let paramArray = [], str = "";
        for (let key in param) {
            paramArray.push(key);
        }
        if(!unSort)
            paramArray.sort();
        for (let i = 0; i < paramArray.length; i++) {
            str += "&" + paramArray[i] + "=" + param[paramArray[i]];
        }
        str = str.substring(1);
        return str;
    }
    //获取今日某小时的整点时间戳
    getTodayDawn(hours) {
        let date, time;
        date = new Date();
        date.setHours(hours||0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        time = Math.floor(date.getTime()/1000);
        return time;
    }
    dateCN_Full(){
        return moment().format("YYYY年MMMDo,HH:mm:ss,dddd");
    }
    dateCN_1(){
        return moment().format("YYYY年MMMDo,HH:mm:ss");
    }
    dateCN_2(){
        return moment().format("HH:mm:ss");
    }
    //发送ajax请求  注意:需要jquery支持
    querySend(url,scope,args,callback,options){
        var self = this;
        if(!options) options = {};
        if(!scope) scope = self;
        if(!args) args = {};
        if(!options["Content-Type"]){
            options["Content-Type"] = "application/json";
        }
        if(options["Content-Type"] == "application/json" && (options.type =="POST" || options.type=="post")){
            args = JSON.stringify(args);
        }
        $.ajax({
            dataType: options.dataType||"json",
            type: options.type||"GET",
            timeout: options.timeout||30000,
            async: true,
            url: url,
            data: args,
            beforeSend: function (request) {
                if(options["Content-Type"]){
                    request.setRequestHeader("Content-Type", options["Content-Type"]);
                }      
                if(options.sendToken){
                    request.setRequestHeader(options.sendToken.key, options.sendToken.value);
                }
                if(options.beforeSend instanceof Function)options.beforeSend.apply(scope,arguments);
            },
            success: function () {
                if(callback instanceof Function)callback.apply(scope,arguments);
            },
            complete: function () {
                if(options.complete instanceof Function)options.complete.apply(scope,arguments);
            },
            error: function () {
                // if(options.error instanceof Function)options.error.apply(scope,arguments);
                if(callback instanceof Function)callback.apply(scope,[ {code:900} ]);
            }
        });
    }
}


module.exports = Tools.getInstance();