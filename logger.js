(function() {

    var isOnLoad = true,
        createInput = function (name, value, index) {
            var element = false;

            if (name && value) {
                element = document.createElement("input");
                element.setAttribute("name", name + "[" + index + "]");
                element.setAttribute("value", value);
                element.setAttribute("type", "hidden");
            }
            return element;
        },

        doLog = function () {
            var fake = window.grabber.fakeMode;

            if (!_errors.length) {
                // observe once again, loop
                setTimeout(function() { // debug, reducing errors after page is loaded
                    doLog();
                }, 5000);
                return false;
            }

            // debug
            console.log('processing errors', _errors);

            var form = document.createElement("form"),
                i = 0,
                error,
                message,
                url, // file
                line,
                symbolInt,
                trace,
                beforeLoad,
                browser = (typeof window.bowser !== 'undefined')
                    // bowser
                    ? bowser.name + ' ' + bowser.version
                    // navigator
                    : window.navigator.userAgent;

            form.setAttribute("method", "post");
            form.setAttribute("enctype", "application/json");
            form.setAttribute("action", "http://localhost:3000/api");
            form.setAttribute('target', 'error-log-frame');

            for (i = 0; i < _errors.length; i++) {
                error = _errors[i];

                // add fake mark
                fake && form.appendChild(createInput('fake', 1, i));
                browser && form.appendChild(createInput('browser', browser, i));

                // required
                message = createInput('message', error[0], i);
                url = createInput('url', error[1], i);
                line = createInput('lineNumber', parseInt(error[2], 10), i);
                beforeLoad = createInput('beforeLoad', ''+(+isOnLoad), i);
                trace = (error[4]) ? error[4].stack : false;

                form.appendChild(message);
                form.appendChild(url);
                form.appendChild(line);
                form.appendChild(beforeLoad);

                trace && form.appendChild(createInput('trace', trace, i));

                // symbol or error object
                symbolInt = parseInt(error[3], 10);
                symbolInt && form.appendChild(createInput('symbolNumber', symbolInt, i));
            }

            document.body.appendChild(form);

            form.submit();

            console.log('errors sent');

            // clear all errors
            _errors = [];

            // observe once again, loop
            setTimeout(function() {
                doLog();
            }, 1000);

        },

        // create hidden iframe
        iframe = document.createElement('iframe');

    iframe.setAttribute('style', 'display:none');
    iframe.setAttribute('name', 'error-log-frame');
    document.body.appendChild(iframe);

    // check on load and start loop
    doLog();

    // onload errors are processed
    isOnLoad = false;

})();
