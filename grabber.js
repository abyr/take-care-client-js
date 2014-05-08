var _errors = [];
(function() {
    window.onerror = function() {
        _errors.push(arguments);
    };
    var logError = function() {
        var newScript = document.createElement("script"),
            firstScript = document.getElementsByTagName("script")[0];
        newScript.src = "logger.js";
        newScript.async = true;
        firstScript.parentNode.insertBefore(newScript, firstScript)
    };
    window.addEventListener
        ? window.addEventListener("load", logError, false)
        : window.attachEvent("onload", logError)
})();
