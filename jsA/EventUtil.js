// pagex浏览器兼容
var doc = document.documentElement,
    body = document.body;
event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);

var EventUtil = {

    addHandler: function (element, type, handler, isCapture) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, isCapture);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    getButton: function (event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },

    getCharCode: function (event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },

    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },

    getEvent: function (event) {
        return event
            ? event
            : window.event;
    },

    getRelatedTarget: function (event) {
        if (event.relatedTarget) {
            // ie外浏览器onmousemove,onmouseover触发
            return event.relatedTarget;
        } else if (event.toElement) {

            // ie浏览器onmousemove事件触发
            return event.toElement;
        } else if (event.fromElement) {

            // ie浏览器onmouseover事件触发
            return event.fromElement;
        } else {
            return null;
        }

    },

    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5
                ? -event.wheelDelta
                : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },

    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    setClipboardText: function (event, value) {
        if (event.clipboardData) {
            event
                .clipboardData
                .setData("text/plain", value);
        } else if (window.clipboardData) {
            window
                .clipboardData
                .setData("text", value);
        }
    },

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

};