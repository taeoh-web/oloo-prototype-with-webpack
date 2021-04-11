/*
 * Title: 회원초대 서비스
 * Author: KimTaeOh (taeoh.kim@gentlepie.com )
 * Date: 2021-04-03
 */

import GentleWidget from '../common/widget';
import GentleUtil from '../common/util';
import GentleApi from '../common/api';
import GentleComponentButton from '../component/button';
import GentleComponentBubble from '../component/bubble';

var GentleServiceInviteMember = Object.create( GentleWidget )


// 회원초대방식 선택 
GentleServiceInviteMember.selectInviteType = function(){
    

    // 버블 
    var bubble = Object.create( GentleComponentBubble );   
    bubble.createComponent({
            "html": "회원초대를 도와드릴게요<br />회원초대를 하려면 후원인을 지정해야 해요.<br />어떤 분을 후원인으로 하시겠어요?",
            "user": "bot"
    });
   

    // 버튼
    var button = Object.create( GentleComponentButton );
    button.createComponent([
        {
            "text": "나를 후원인으로 설정",
            "onClick": function(){
                GentleServiceInviteMember.sponserIsMe();
            }
        },
        {
            "text" : "다른 회원을 후원인으로 설정",
            "onClick":function(){
                GentleServiceInviteMember.sponserIsOther();
            }
        }
    ]);

    bubble.insert();
    button.insert();

}

// 나를 후원인으로 설정 
GentleServiceInviteMember.sponserIsMe = function(){
    
    
    // 서버통신은 생략하지만 실제로는 아래와 같은 일을 수행한다 
    // 세션에서 회원이름을 가져온다 
    // 세션에서 회원아이디를 가져온다 
    this.sponserName = '김태오';
    this.sponserId = '1111';

    this.createSimpleMemberRegister();
}

// 다른사람을 후원인으로 설정 
GentleServiceInviteMember.sponserIsOther = function(){

   // 버블 
   var bubble = Object.create( GentleComponentBubble );   
   bubble.createComponent({
           "html": "후원인으로 설정할 회원을 선택하세요",
           "user": "bot"
   });
   bubble.insert();


   // 버튼
   var button = Object.create( GentleComponentButton );
   button.createComponent([
       {
           "text": "후원인 검색",
           "onDisableAfterClick": false,
           "autoUserText": false,
           "onClick": function(){
               // 슬라이드 팝업 컨텐츠 생성 
               var html = '후원인 검색하기';
               GentleUtil.slidePopupOpen(html);

           }
       }
   ]);
   button.insert();

}

// 초대장 생성 
GentleServiceInviteMember.createSimpleMemberRegister = function(){

    if( this.sponserName === undefined ) throw new Error('후원인 이름이 전달되지 않았습니다');
    if( this.sponserId === undefined ) throw new Error('후원인 ID가 전달되지 않았습니다');

    // 버블 
    var bubble = Object.create( GentleComponentBubble );   
    bubble.createComponent([
        {
            "html": this.sponserName + "님을 후원인으로 설정해서<br />회원초대장을 만들었어요",
            "user": "bot"
        },
        {
            "html": "[초대장 링크 복사] 버튼을 눌러, 초대하실 분에게 보내세요 ",
            "user": "bot"
        }
    ]);

    // 서버호출하는 구간이지만 여기서는 생략한다 실제로는 아래와 같은 일을 수행한다
    // API 호출하여 초대장 생성

    // 정상적으로 생성됬으면 컴포넌트 출력 
    bubble.insert();
}


export default GentleServiceInviteMember;