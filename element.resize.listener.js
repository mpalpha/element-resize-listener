(function(window, document) {
    'use strict';
    var attachEvent = document.attachEvent;
    // element resize listener [add|remove]ResizeListener(resizeElement, resizeCallback);
    // based on https://github.com/sdecima/javascript-detect-element-resize
    if (!attachEvent) {
        var createStyles = function() {
                if (!!createStyles) {
                    var n = document.head || document.getElementsByTagName("head")[0],
                        r = document.createElement("style"),
                        css = '.r-t {\
                        visibility: hidden;\
                    }\
                    .r-t, .r-t > div, .c-t:before {\
                        content: " ";\
                        display: block;\
                        position: absolute;\
                        top: 0;\
                        left: 0;\
                        height: 100%;\
                        width: 100%;\
                        overflow: hidden\
                    }\
                    .r-t > div {\
                        background: #eee;\
                        overflow: auto\
                    }\
                    .c-t:before {\
                        width: 200%;\
                        height: 200%\
                    }';
                    r.type = "text/css";
                    if (r.styleSheet) {
                        r.styleSheet.cssText = css
                    } else {
                        r.appendChild(document.createTextNode(css))
                    }
                    n.appendChild(r)
                    return r.sheet || false;
                } else {
                    return false;
                }
            },
            requestFrame = function() {
                return function(t) {
                    return window.requestAnimationFrame(t)
                }
            }(),
            cancelFrame = function() {
                return function(t) {
                    return window.cancelAnimationFrame(t)
                }
            }(),
            resetTriggers = function(e) {
                var t = e.__rt__,
                    n = t.firstElementChild,
                    r = t.lastElementChild,
                    i = n.firstElementChild;
                r.scrollLeft = r.scrollWidth;
                r.scrollTop = r.scrollHeight;
                i.style.width = n.offsetWidth + 1 + "px";
                i.style.height = n.offsetHeight + 1 + "px";
                n.scrollLeft = n.scrollWidth;
                n.scrollTop = n.scrollHeight
            },
            checkTriggers = function(e) {
                return e.offsetWidth != e.__rl__.width || e.offsetHeight != e.__rl__.height
            },
            scrollListener = function(e) {
                var t = this;
                resetTriggers(this);
                if (this.__rRAF__) cancelFrame(this.__rRAF__);
                this.__rRAF__ = requestFrame(function() {
                    if (checkTriggers(t)) {
                        t.__rl__.width = t.offsetWidth;
                        t.__rl__.height = t.offsetHeight;
                        t.__rl__.forEach(function(n) {
                            n.call(t, e)
                        })
                    }
                })
            },
            rafPolyFill = function() {
                var _af = 'AnimationFrame',
                    _req = 'Request',
                    _raf = 'request' + _af,
                    _can = 'Cancel',
                    _caf = 'cancel' + _af,
                    expire = 0,
                    vendors = ['moz', 'ms', 'o', 'webkit'],
                    pre;

                while (!window[_raf] && (pre = vendors.pop())) {
                    window[_raf] = window[pre + _req + _af];
                    window[_caf] = window[pre + _can + _af] || window[pre + _can + _req + _af];
                }

                if (!window[_raf]) {
                    window[_raf] = function(callback) {
                        var current = +new Date,
                            adjusted = 16 - (current - expire),
                            delay = adjusted > 0 ? adjusted : 0;
                        expire = current + delay;

                        return setTimeout(function() {
                            callback(expire);
                        }, delay);
                    };
                    window[_caf] = clearTimeout;
                }
            }
    }
    window.addResizeListener = function(t, n) {
        if (attachEvent) t.attachEvent("onresize", n);
        else {
            if (!t.__rt__) {
                if (getComputedStyle(t).position == "static") t.style.position = "relative";
                rafPolyFill();
                createStyles();
                t.__rl__ = {};
                t.__rl__ = [];
                (t.__rt__ = document.createElement("div")).className = "r-t";
                t.__rt__.innerHTML = '<div class="e-t"><div></div></div>' + '<div class="c-t"></div>';
                t.appendChild(t.__rt__);
                resetTriggers(t);
                t.addEventListener("scroll", scrollListener, true)
            }
            t.__rl__.push(n)
        }
    };
    window.removeResizeListener = function(t, n) {
        if (attachEvent) t.detachEvent("onresize", n);
        else {
            t.__rl__.splice(t.__rl__.indexOf(n), 1);
            if (!t.__rl__.length) {
                t.removeEventListener("scroll", scrollListener);
                t.__rt__ = !t.removeChild(t.__rt__)
            }
        }
    }
})(window, document);
