(function() {

    var createInput = function (name, value, index) {
            var element = false;

            if (name && value) {
                element = document.createElement("input");
                element.setAttribute("name", name + "[" + index + "]");
                element.setAttribute("value", value);
                element.setAttribute("type", "hidden");
            }
            return element;
        },

        doLog = function (beforeLoad) {

            // debug
            console.log('errors', _errors);

            if (!_errors.length) {
                return false;
            }
            if (!beforeLoad) {
                beforeLoad = 0;
            }

            var form = document.createElement("form"),
                i = 0,
                error,
                message,
                url, // file
                line,
                symbol,
                symbolInt;

            form.setAttribute("method", "post");
            form.setAttribute("enctype", "application/json");
            form.setAttribute("action", "http://localhost:3000/api");
            form.setAttribute('target', 'error-log-frame');

            for (i = 0; i < _errors.length; i++) {
                error = _errors[i];

                message = createInput('message', error[0], i);
                url = createInput('url', error[1], i);
                line = createInput('line', error[2], i);

                form.appendChild(message);
                form.appendChild(url);
                form.appendChild(line);

                symbolInt = parseInt(error[3], 10);
                if (+symbolInt) {
                    // symbol or error object
                    symbol = createInput('symbol', +symbolInt, i);
                    form.appendChild(symbol);
                }

            }

            document.body.appendChild(form);
            form.submit();

            // clean errors
            _errors = [];

            // observe once again
            setTimeout(function() {
                doLog(0);
            }, 1000);

        },

        // create hidden iframe
        iframe = document.createElement('iframe');

    iframe.setAttribute('style', 'display:none');
    iframe.setAttribute('name', 'error-log-frame');
    document.body.appendChild(iframe);

    // check on load
    doLog(1);

})();
