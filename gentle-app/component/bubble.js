import GentleWidget from '../common/widget';

// 버블
var GentleComponentBubble = Object.create( GentleWidget );
GentleComponentBubble.createComponent = function(option){
    
    // 객체리터럴, 배열리터럴 모두 지원 
    var bubbles;

    if( Array.isArray(option) ){
        bubbles = option;
    }else if(typeof option === 'object'){
        bubbles = [];
        bubbles.push(option);
    }
    
    // 컨테이너 생성후 자식요소 삽입 
    var $bubbleContainer = $('<div>');
    $bubbleContainer.addClass('bubble-container');

    for( let i=0; i<bubbles.length; i++ ){
        var $bubble = $('<div>');
        $bubble.addClass('bubble');

        const option = bubbles[i];
        
        if(option.html === undefined) throw new Error('버블텍스트는 필수요소입니다');
        if( !(option.user === 'bot' || option.user === 'user') ) throw new Error('버블유저가 잘못 정의되었습니다');

        $bubble.html(option.html);
        $bubble.addClass((option.user===undefined)?"bot":option.user);

        // 첫번째 버블 구분하기 ( 캐릭터노출 )
        if(i === 0){
            $bubble.addClass('first-bubble');
        }

        $bubbleContainer.append($bubble);
    }
    
    this.getIndex();
    this.setPrefix('bubble');
    this.init( $bubbleContainer );
}

export default GentleComponentBubble;
