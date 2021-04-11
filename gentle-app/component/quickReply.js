import GentleWidget from '../common/widget';

// 퀵리플라이 
var GentleComponentQuickReply = Object.create( GentleWidget );
GentleComponentQuickReply.createComponent = function(option){
    this.option = option;
    this.setPrefix('button');

    this.init($( "<button>test</button>"));    
}