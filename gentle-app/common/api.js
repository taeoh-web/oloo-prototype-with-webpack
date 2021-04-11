/*
 * Title: GentleApi Obejct 
 * Author: KimTaeOh (taeoh.kim@gentlepie.com )
 * Date: 2021-04-03
 */

var GentleApi = Object.create( {} );
var GentleApi = {
    get method() {
        return this.requestMethod;
    },
    set method(value){
        this.requestMethod = value;
    },
    get url() {
        return this.requestUrl;
    },
    set url(value){
        this.requestUrl = value;
    },
    get dataType(){
        return this.responseDataType;
    },
    set dataType(value){
        this.responseDataType = value;
    },
    get requestBody(){
        return this.requestData;
    },
    set requestBody(value){
        this.requestData = value;
    },
    get contentType(){
        return this.requestContentType;
    },
    set contentType(value){
        this.requestContentType = value;
    },
    send: function(){
        var that = this;
        //console.log(this.requestBody);
        $.ajax({
            type: (this.method === undefined)?'GET':this.method,
            url: this.url,
            contentType: (this.contentType === undefined)?'application/json':this.contentType,
            dataType:(this.dataType === undefined)?'html':this.dataType,
            data: JSON.stringify((this.requestBody === undefined)?{}:this.requestBody)
        })
        .done(function (data, textStatus, xhr) {
            that.successCallback(data);
        })
        .fail(function(data, textStatus, errorThrown){
            if( that.failedCallback == undefined){
                that.defaultFailedCallback(data);                
            }else{
                that.failedCallback(data);
            } 
        });
    },
    onSuccess: function(callback){
        this.successCallback = callback;
    },
    onFailed: function(callback){
        this.failedCallback = callback;
    },
    defaultFailedCallback: function(data){
        console.log('Server Error!!');
        console.log(data);
    }
}


export default GentleApi;