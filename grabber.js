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

    window.grabber = {

        fakeMode: false,

        fake: function(n) {
            console.log('Generating ', n, ' fake errors');
            this.fakeMode = true;

            var i = 0,
                err = [];

            if (!n) {
                n = 10; // default
            }
            for (i = 0; i < n; i++) {
                err = [
                    chance.sentence(),
                    'http://' + chance.domain() + '/' + chance.word() + '.html',
                    chance.integer({min: 1, max: 500}),
                    chance.integer({min: 1, max: 50})
                ];
                _errors.push(err);
            }

        }
    }
})();
