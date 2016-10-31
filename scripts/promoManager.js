/**
 * Created by eerto_000 on 2016-10-31.
 */

var promoManager = (function() {

    var isShow = false;

    function _init() {
        channelManager.addChannelEventListener(onChannelEvent);
    }
    
    function _actTrigger() {
        hidePromoTrigger();
        
    }
    
    function showPromoTrigger() {
        if (isShow === false) {
            var promoTriggerTag = $("<div id='promoTrigger'>바로보기</div>");
            $("body").append(promoTriggerTag);
            isShow = true;
        }
    }

    function hidePromoTrigger() {
        if (isShow === true) {
            $("#promoTrigger").remove();
            isShow = false;
        }
    }
    
    function onChannelEvent(channel) {
        if (channel.NUM === 3) {
            showPromoTrigger();
        } else {
            hidePromoTrigger();
        }
    }
    
    return {
        init : _init,
        actTrigger : _actTrigger
    };
    
})();