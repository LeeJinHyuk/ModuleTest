/**
 * Created by eerto_000 on 2016-10-31.
 */

var channelManager = (function() {
    var CHANNEL = [
        {NUM : 0, KO_NAME : "스타크래프트", ENG_NAME : "Starcraft", URL : "images/star.JPG"},
        {NUM : 1, KO_NAME : "헤일로", ENG_NAME : "HALO", URL : "images/halo.JPG"},
        {NUM : 2, KO_NAME : "리그오브레전드", ENG_NAME : "League Of Legends", URL : "images/lol.JPG"},
        {NUM : 3, KO_NAME : "워크래프트", ENG_NAME : "Warcraft", URL : "images/war.JPG"},
        {NUM : 4, KO_NAME : "피파2016", ENG_NAME : "FIFA2016", URL : "images/fifa.JPG"}
    ];
    
    var currentChannel = CHANNEL[0];
    var currentChannelIndex = 0;
    
    var listener = [];
    
    function _init() {
        playChannel();
    }

    function _changeChannel(keyCode) {
        switch(keyCode) {
            case "CH_UP":
                currentChannelIndex++;
                currentChannelIndex = (currentChannelIndex === CHANNEL.length ? 0 : currentChannelIndex);
                break;
            case "CH_DOWN":
                currentChannelIndex--;
                currentChannelIndex = (currentChannelIndex === -1 ? CHANNEL.length - 1 : currentChannelIndex);
                break;
        }
        playChannel();
    }
    
    function _addChannelEventListener(callback) {
        listener.push(callback);
    }
    
    function notifyEvent() {
        for(var i=0; i<listener.length; i++) {
            listener[i](currentChannel);
        }
    }
    
    function playChannel() {
        console.log("playChannel");
        currentChannel = CHANNEL[currentChannelIndex];
        notifyEvent(currentChannel);
    }


    return {
        init : _init,
        changeChannel : _changeChannel,
        addChannelEventListener : _addChannelEventListener
    };
})();