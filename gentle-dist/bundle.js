/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./gentle-app/component/bubble.js":
/*!****************************************!*\
  !*** ./gentle-app/component/bubble.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/widget */ "./gentle-app/common/widget.js");


// 버블
var GentleComponentBubble = Object.create( _common_widget__WEBPACK_IMPORTED_MODULE_0__.default );
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GentleComponentBubble);


/***/ }),

/***/ "./gentle-app/component/button.js":
/*!****************************************!*\
  !*** ./gentle-app/component/button.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/widget */ "./gentle-app/common/widget.js");
/* harmony import */ var _component_bubble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/bubble */ "./gentle-app/component/bubble.js");




// 버튼
var GentleComponentButton = Object.create( _common_widget__WEBPACK_IMPORTED_MODULE_0__.default );
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
                var bubble = Object.create( _component_bubble__WEBPACK_IMPORTED_MODULE_1__.default );   
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GentleComponentButton);

/***/ }),

/***/ "./gentle-app/service/inviteMember.js":
/*!********************************************!*\
  !*** ./gentle-app/service/inviteMember.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/widget */ "./gentle-app/common/widget.js");
/* harmony import */ var _common_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/util */ "./gentle-app/common/util.js");
/* harmony import */ var _common_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/api */ "./gentle-app/common/api.js");
/* harmony import */ var _component_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../component/button */ "./gentle-app/component/button.js");
/* harmony import */ var _component_bubble__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../component/bubble */ "./gentle-app/component/bubble.js");
/*
 * Title: 회원초대 서비스
 * Author: KimTaeOh (taeoh.kim@gentlepie.com )
 * Date: 2021-04-03
 */










var GentleServiceInviteMember = Object.create( _common_widget__WEBPACK_IMPORTED_MODULE_0__.default )


// 회원초대방식 선택
GentleServiceInviteMember.selectInviteType = function(){
    

    // 버블 
    var bubble = Object.create( _component_bubble__WEBPACK_IMPORTED_MODULE_4__.default );   
    bubble.createComponent({
            "html": "회원초대를 도와드릴게요<br />회원초대를 하려면 후원인을 지정해야 해요.<br />어떤 분을 후원인으로 하시겠어요?",
            "user": "bot"
    });
   
    //console.log(bubble.$elem.html());

    // 버튼
    var button = Object.create( _component_button__WEBPACK_IMPORTED_MODULE_3__.default );
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
   var bubble = Object.create( _component_bubble__WEBPACK_IMPORTED_MODULE_4__.default );   
   bubble.createComponent({
           "html": "후원인으로 설정할 회원을 선택하세요",
           "user": "bot"
   });
   
   // 버튼
   var button = Object.create( _component_button__WEBPACK_IMPORTED_MODULE_3__.default );
   button.createComponent([
       {
           "text": "후원인 검색",
           "onDisableAfterClick": false,
           "autoUserText": false,
           "onClick": function(){
               // 슬라이드 팝업 컨텐츠 생성 
               var html = '후원인 검색하기';
               _common_util__WEBPACK_IMPORTED_MODULE_1__.default.slidePopupOpen(html);

           }
       }
   ]);


   bubble.insert();
   button.insert();

}

// 초대장 생성 
GentleServiceInviteMember.createSimpleMemberRegister = function(){

    if( this.sponserName === undefined ) throw new Error('후원인 이름이 전달되지 않았습니다');
    if( this.sponserId === undefined ) throw new Error('후원인 ID가 전달되지 않았습니다');


    // 페이지 인터렉션 함수가 추가될 예정 
    // GentleHeler.nextPage() 

    // 버블 
    var bubble = Object.create( _component_bubble__WEBPACK_IMPORTED_MODULE_4__.default );   
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

    // 초대장 생성안됬으면 안내 
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GentleServiceInviteMember);

/***/ }),

/***/ "./gentle-app/common/api.js":
/*!**********************************!*\
  !*** ./gentle-app/common/api.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * Title: GentleApi Obejct 
 * Author: KimTaeOh (taeoh.kim@gentlepie.com )
 * Date: 2021-04-03
 */
var GentleApi = Object.create({});
var GentleApi = {
  get method() {
    return this.requestMethod;
  },

  set method(value) {
    this.requestMethod = value;
  },

  get url() {
    return this.requestUrl;
  },

  set url(value) {
    this.requestUrl = value;
  },

  get dataType() {
    return this.responseDataType;
  },

  set dataType(value) {
    this.responseDataType = value;
  },

  get requestBody() {
    return this.requestData;
  },

  set requestBody(value) {
    this.requestData = value;
  },

  get contentType() {
    return this.requestContentType;
  },

  set contentType(value) {
    this.requestContentType = value;
  },

  send: function send() {
    var that = this; //console.log(this.requestBody);

    $.ajax({
      type: this.method === undefined ? 'GET' : this.method,
      url: this.url,
      contentType: this.contentType === undefined ? 'application/json' : this.contentType,
      dataType: this.dataType === undefined ? 'html' : this.dataType,
      data: JSON.stringify(this.requestBody === undefined ? {} : this.requestBody)
    }).done(function (data, textStatus, xhr) {
      that.successCallback(data);
    }).fail(function (data, textStatus, errorThrown) {
      if (that.failedCallback == undefined) {
        that.defaultFailedCallback(data);
      } else {
        that.failedCallback(data);
      }
    });
  },
  onSuccess: function onSuccess(callback) {
    this.successCallback = callback;
  },
  onFailed: function onFailed(callback) {
    this.failedCallback = callback;
  },
  defaultFailedCallback: function defaultFailedCallback(data) {
    console.log('Server Error!!');
    console.log(data);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GentleApi);

/***/ }),

/***/ "./gentle-app/common/util.js":
/*!***********************************!*\
  !*** ./gentle-app/common/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var gentleUtil = Object.create(null); // 슬라이드팝업 세팅 

gentleUtil.slidePopupInit = function () {
  this.$bot = $("#bot");
  this.$bot.append($('<div id = "slide-popup">\
    <header>\
        <h3 id="slide-popup-title">타이틀</h3>\
        <span id="slide-popup-close">닫기</span>\
    </header>\
    <div id="slide-popup-content"></div>\
    </div>')); //this.$slidePopup = $("#slide-popup");
  //this.$slidePopup.find("#slide-popup-close").bind('click', this.slidePopupClose);
}; // 슬라이드 팝업 오픈


gentleUtil.slidePopupOpen = function (html) {
  var $slidePopup = $("#bot").find("#slide-popup"); //if(html !== undefined){

  $slidePopup.find("#slide-popup-content").html(html); //}
  //$slidePopup.css('top',0);

  var botHeight = $("#bot").outerHeight();
  var popupHeight = $slidePopup.outerHeight();
  $slidePopup.css('top', botHeight - popupHeight + 'px'); //console.log($slidePopup.outerHeight());
};

gentleUtil.slidePopupClose = function () {
  this.$slidePopup.css('top', '100%');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gentleUtil);

/***/ }),

/***/ "./gentle-app/common/widget.js":
/*!*************************************!*\
  !*** ./gentle-app/common/widget.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * 7버전 ...
 * API 계층까지 작업 얼추 마무리 된듯하긴 한데 ... 
 */
var GentleWidget = {
  init: function init(elemWrap) {
    this.$elem = elemWrap ? elemWrap : $('<div>');

    if (this.componentPrefix && this.index) {
      this.setId();
    }
  },
  insert: function insert($where) {
    $where = $where || $("#bot");

    if (this.$elem) {
      this.$elem.clone(true).appendTo($where);
      this.$elem = $("#" + this.getId());
    }
  },
  getIndex: function getIndex() {
    if (this.index === undefined) {
      this.index = 1;
    } else {
      this.index = this.index + 1;
    }
  },
  setPrefix: function setPrefix(prefix) {
    this.componentPrefix = prefix;
  },
  setId: function setId() {
    this.$elem.attr('id', this.componentPrefix + '-' + this.index);
    return this.componentPrefix + '-' + this.index;
  },
  setEvent: function setEvent(selector, eventListner, callback) {
    this.$elem.find(selector).bind(eventListner, callback);
  },
  append: function append(selector, data) {
    this.$elem.find(selector).append(data);
  },
  html: function html(selector, data) {
    this.$elem.find(selector).html(data);
  },
  getVal: function getVal(selector) {
    return this.$elem.find(selector).val();
  },
  getId: function getId() {
    return this.componentPrefix + '-' + this.index;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GentleWidget);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./gentle-app/src/main.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/util */ "./gentle-app/common/util.js");
/* harmony import */ var _service_inviteMember__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/inviteMember */ "./gentle-app/service/inviteMember.js");


//export default GentleServiceInviteMember;

$(document).ready(function(){
    _common_util__WEBPACK_IMPORTED_MODULE_0__.default.slidePopupInit();
    _service_inviteMember__WEBPACK_IMPORTED_MODULE_1__.default.selectInviteType();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map