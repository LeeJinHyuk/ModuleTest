/**
 * Created by eerto_000 on 2016-10-31.
 */

var viewManager = (function() {
    var SIZE = {
        FULL : 0,
        SMALL : 1
    };

    var currentMode = SIZE.FULL;
    var currentLang = (storageManager.getItem("language") ? storageManager.getItem("language") : "ko");
    var existTrigger = false;
    var listener = [];

    function _init() {
        channelManager.addChannelEventListener(onChannelEvent);
        storageManager.addStorageEventListener(onStorageEvent);
    }

    function showScreen(channel) {
        var tmpScreenTag;

        if (currentMode === SIZE.FULL) {
            tmpScreenTag = $("#screen");
        } else {
            tmpScreenTag = $("#smallScreen");
        }
        if (tmpScreenTag.length === 0) {
            var screenTag = $("<div id='screen'></div>").css("background", "url(" + channel.URL + ")");
            var titleTag =
                $("<span>Channel Num : " + channel.NUM + " Channel Name : " + (currentLang === "ko" ? channel.KO_NAME : channel.ENG_NAME) + "</span>");
            screenTag.append(titleTag);
            $("body").append(screenTag);
        } else {
            tmpScreenTag.css("background", "url(" + channel.URL + ")");
            $("span", tmpScreenTag).text("Channel Num : " + channel.NUM + " Channel Name : " + (currentLang === "ko" ? channel.KO_NAME : channel.ENG_NAME));
        }
    }

    function resizeScreen(size) {
        switch(size) {
            case SIZE.FULL:
                $("#smallScreen").attr("id", "screen");
                break;
            case SIZE.SMALL:
                $("#screen").attr("id", "smallScreen");
                break;
        }
        currentMode = size;
        notifyEvent(size);
    }
    
    function showDetail() {
        var tmpPromoDetail = $("#promoDetail");

        if (tmpPromoDetail.length === 0) {
            var promoDetailTag = $("<div id='promoDetail'></div>");
            $("body").append(promoDetailTag);
            resizeScreen(SIZE.SMALL);
        }
    }
    
    function hidePromoDetail() {
        var tmpPromoDetail = $("#promoDetail");

        if (tmpPromoDetail.length !== 0) {
            tmpPromoDetail.remove();
            resizeScreen(SIZE.FULL);
        }
    }

    function onChannelEvent(channel) {
        showScreen(channel);
        hidePromoDetail();
    }

    function onStorageEvent(key, value) {
        var tmpCurrentChannel = channelManager.getCurrentChannel();
        var tmpScreenTag;

        currentLang = value;

        if (currentMode === SIZE.FULL) {
            tmpScreenTag = $("#screen");
        } else {
            tmpScreenTag = $("#smallScreen");
        }

        switch(key) {
            case "language":
                $("span", tmpScreenTag)
                    .text("Channel Num : " +
                        tmpCurrentChannel.NUM +
                        " Channel Name : " +
                        (value === "ko" ? tmpCurrentChannel.KO_NAME : tmpCurrentChannel.ENG_NAME));
                break;
        }
    }

    function notifyEvent(size) {
        for (var i=0; i<listener.length; i++) {
            listener[i](size);
        }
    }

    function _onKeyDown(keyCode) {
        switch(keyCode) {
            case "CH_UP":
            case "CH_DOWN":
                channelManager.changeChannel(keyCode);
                break;
            case "RED":
                showDetail();
                break;
            case "BACK":
                hidePromoDetail();
                break;
            case "KOR":
                storageManager.setItem("language", "ko");
                break;
            case "ENG":
                storageManager.setItem("language", "eng");
                break;
        }
    }

    function _addViewEventListener(callback) {
        listener.push(callback);
    }
    
    return {
        init : _init,
        onKeyDown : _onKeyDown,
        addViewEventListener : _addViewEventListener
    };
})();