import GentleWidget from '../common/widget';
import GentleComponentBubble from '../component/bubble';


// 버튼
var GentleComponentButton = Object.create( GentleWidget );
GentleComponentButton.createComponent = function(option){

    console.log(option);

    // 객체리터럴, 배열리터럴 모두 지원 
    var buttons;

    if( Array.isArray(option) ){
        buttons = option;
    }else if(typeof option === 'object'){
        buttons = [];
        buttons.push(option);
    }
    
    // 컨테이너 생성후 자식요소 삽입 
    var $buttonContainer = $('<div>');
    $buttonContainer.addClass('button-container');

    for( let i=0; i<buttons.length; i++ ){
        const $button = $('<button>');
        const option = buttons[i];
        
        if(option.text === undefined) throw new Error('버튼텍스트는 필수요소입니다');

        $button.text(option.text);
        

        if(option.onDisableAfterClick !== false){
            $button.bind('click', function(){
                $(this).closest(".button-container").find("button").attr('disabled',true);
            });
        }

        // 자동사용자 발화 
        if(option.autoUserText !== false){
            $button.bind('click', function(){
                // 버블 
                var bubble = Object.create( GentleComponentBubble );   
                bubble.createComponent({
                        "html": $(this).html(),
                        "user": "user"
                });
                bubble.insert();
            });
        }

        if(option.onClick !== undefined){
            $button.bind('click', option.onClick);
        }

        $buttonContainer.append( $button );
        
    }
    
    //console.log( $buttonContainer );
    this.getIndex();
    this.setPrefix('button');
    this.init( $buttonContainer );
}


export default GentleComponentButton;