var gentleUtil = Object.create(null);

// 슬라이드팝업 세팅 
gentleUtil.slidePopupInit = function () {
    this.$bot = $("#bot");
    this.$bot.append($('<div id = "slide-popup">\
    <header>\
        <h3 id="slide-popup-title">타이틀</h3>\
        <span id="slide-popup-close">닫기</span>\
    </header>\
    <div id="slide-popup-content"></div>\
    </div>'));
    //this.$slidePopup = $("#slide-popup");
    //this.$slidePopup.find("#slide-popup-close").bind('click', this.slidePopupClose);
}



// 슬라이드 팝업 오픈
gentleUtil.slidePopupOpen = function (html) {
    var $slidePopup = $("#bot").find("#slide-popup");

    //if(html !== undefined){
    $slidePopup.find("#slide-popup-content").html(html);
    //}
    //$slidePopup.css('top',0);

    var botHeight = $("#bot").outerHeight();
    var popupHeight = $slidePopup.outerHeight();

    $slidePopup.css('top', (botHeight - popupHeight) + 'px');

    //console.log($slidePopup.outerHeight());
}

gentleUtil.slidePopupClose = function () {
    this.$slidePopup.css('top', '100%');
}

export default gentleUtil;