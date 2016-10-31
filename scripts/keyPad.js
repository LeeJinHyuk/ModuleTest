/**
 * Created by eerto_000 on 2016-11-01.
 */

var keyPad = (function() {

    function _init() {
        showKeyPad();
        addKeyEvent();
    }

    function showKeyPad() {
        var keypadTag = $("<div id='keypad'></div>");
        var listTag = $("<ul></ul>")
            .append("<li id='channelUp'>Channel Up</li>")
            .append("<li id='channelDown'>Channel Down</li>")
            .append("<li id='redKey'>Red Key</li>")
            .append("<li id='backKey'>Back Key</li>");
        
        keypadTag.append(listTag);
        $("body").append(keypadTag);
    }

    function addKeyEvent() {
        $("#channelUp").click(function() {
            viewManager.onKeyDown("CH_UP");
        });
        $("#channelDown").click(function() {
            viewManager.onKeyDown("CH_DOWN");
        });
        $("#redKey").click(function() {
            viewManager.onKeyDown("RED");
        });
        $("#backKey").click(function() {
            viewManager.onKeyDown("BACK");
        });
    }
    
    return {
        init : _init
    };
})();