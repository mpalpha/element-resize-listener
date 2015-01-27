##animate-scroll

Name: JavaScript element resize listener  
Description: A Cross-Browser, Event-based, Element Resize Detection and requestAnimationFrame Polyfill.  

In short, this implementation does NOT use an internal timer to detect size changes (as most implementations do). It uses scroll events on most browsers, and the onresize event on IE10 and below.  
The method used not only detects javascript generated resize changes but also changes made from CSS pseudo classes e.g. :hover, CSS animations, etc.  

Author: Jason Lusk  
Author URI: http://JasonLusk.com  
GIT URI: https://github.com/mpalpha/element-resize-listener.git  

#####Install:
```Batchfile
    bower i mpalpha/element-resize-listener
```
