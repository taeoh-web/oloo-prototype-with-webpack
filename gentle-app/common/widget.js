/*
 * 7버전 ...
 * API 계층까지 작업 얼추 마무리 된듯하긴 한데 ... 
 */
var GentleWidget = {
    init: function(elemWrap){
        this.$elem = (elemWrap)?elemWrap:$('<div>');
        if(this.componentPrefix && this.index){            
            this.setId();                        
        }
    },    
    insert: function($where){
        $where = $where || $("#bot");
        
        if ( this.$elem ){
            this.$elem.clone(true).appendTo($where);
            this.$elem = $("#" + this.getId());
        }
    },
    getIndex: function(){
        if(this.index === undefined){
            this.index = 1;
        }else {
            this.index = this.index + 1;
        }
    },
    setPrefix: function(prefix){
        this.componentPrefix = prefix;
    },
    setId: function(){                
        this.$elem.attr('id', this.componentPrefix + '-' + this.index);
        return this.componentPrefix + '-' + this.index;
    },
    setEvent: function(selector, eventListner, callback){
        this.$elem.find(selector).bind(eventListner, callback);
    },
    append: function(selector, data){
        this.$elem.find(selector).append(data);
    },
    html: function(selector, data){
        this.$elem.find(selector).html(data);
    },
    getVal: function(selector){
        return this.$elem.find(selector).val();
    },
    getId: function(){        
        return this.componentPrefix + '-' + this.index;
    }
}


export default GentleWidget