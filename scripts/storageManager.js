/**
 * Created by eerto_000 on 2016-10-31.
 */

var storageManager = (function() {
    var listener = [];

    function _getItem(key) {
        return localStorage.getItem(key);
    }

    function _setItem(key, value) {
        localStorage.setItem(key, value);
        notifyEvent(key, value);
    }

    function _addStorageEventListener(callback) {
        listener.push(callback);
    }

    function notifyEvent(key, value) {
        for(var i=0; i<listener.length; i++) {
            listener[i](key, value);
        }
    }

    return {
        getItem : _getItem,
        setItem : _setItem,
        addStorageEventListener : _addStorageEventListener
    };
})();
