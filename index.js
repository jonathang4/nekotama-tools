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

    randomAB(min,max){
        return Math.floor(min+Math.random()*(max-min));
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

}


module.exports = Tools.getInstance();