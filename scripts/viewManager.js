/**
 * Created by eerto_000 on 2016-10-31.
 */

var viewManager = (function() {
    var SIZE = {
        FULL : 0,
        SMALL : 1
    };

    var currentMode = SIZE.FULL;
    var listener = [];

    function _init() {
        channelManager.addChannelEventListener(onChannelEvent);
        storageManager.addStorageEventListener(onStorageEvent);
    }

    function showScreen(channel) {
        var tmpScreenTag = $("#screen");
        if (tmpScreenTag.length === 0) {
            var screenTag = $("<div id='screen'></div>").css("background", "url(" + channel.URL + ")");
            var titleTag = $("<span>Channel Num : " + channel.NUM + " Channel Name : " + channel.KO_NAME + "</span>");
            screenTag.append(titleTag);
            $("body").append(screenTag);
        } else {
            tmpScreenTag.css("background", "url(" + channel.URL + ")");
            $("span", tmpScreenTag).text("Channel Num : " + channel.NUM + " Channel Name : " + channel.KO_NAME);
        }
    }

    function resizeScreen(size) {
        switch(size) {
            case SIZE.FULL:
                $("#screen").removeClass("smallScreen");
                break;
            case SIZE.SMALL:
                $("#screen").addClass("smallScreen");
                break;
        }
        notifyEvent(size);
    }
    
    function showPromoDetail() {
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
        var tmpScreenTag = $("#screen");

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

    function notifyEvent() {
        for (var i=0; i<listener.length; i++) {
            listener[i]();
        }
    }

    function _onKeyDown(keyCode) {
        switch(keyCode) {
            case "CH_UP":
            case "CH_DOWN":
                channelManager.changeChannel(keyCode);
                break;
            case "RED":
                showPromoDetail();
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