/**
 * Created by eerto_000 on 2016-10-31.
 */

var viewManager = (function() {
    
    function _init() {
        channelManager.addChannelEventListener(onChannelEvent);
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
    
    function showPromoDetail() {
        
    }
    
    function hidePromoDetail() {
        
    }

    function onChannelEvent(channel) {
        showScreen(channel);
        hidePromoDetail();
    }
    
    
    
    function _onKeyDown(keyCode) {
        switch(keyCode) {
            case "CH_UP":
            case "CH_DOWN":
                channelManager.changeChannel(keyCode);
                break;
            case "RED":
                
                break;
            case "BACK":
                
                break;
        }
    }
    
    return {
        init : _init,
        onKeyDown : _onKeyDown
    };
})();