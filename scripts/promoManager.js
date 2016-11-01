/**
 * Created by eerto_000 on 2016-10-31.
 */

var promoManager = (function() {

    var isShow = false;

    function _init() {
        channelManager.addChannelEventListener(onChannelEvent);
        viewManager.addViewEventListener(onViewEvent);
    }
    
    function _actTrigger() {
        hidePromoTrigger();
    }
    
    function showPromoTrigger() {
        if (isShow === false && channelManager.getCurrentChannel().NUM === 3) {
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

    function onViewEvent(size) {
        switch(size) {
            case 0:
                // FULL
                showPromoTrigger();
                break;
            case 1:
                // SMALL
                hidePromoTrigger();
                break;
        }
    }
    
    return {
        init : _init,
        actTrigger : _actTrigger
    };
    
})();