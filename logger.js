(function() {
    var doLog = function (beforeLoad) {
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
            number;

        form.setAttribute("method", "post");
        form.setAttribute("enctype", "application/json");
        form.setAttribute("action", "http://localhost:3000/api");
        form.setAttribute('target', 'error-log-frame');

        for (i = 0; i < _errors.length; i++) {
            error = _errors[i];

            message = document.createElement("input");
            message.setAttribute("name", "message[" + i + "]");
            message.setAttribute("value", error[0]);
            message.setAttribute("type", "hidden");

            url = document.createElement("input");
            url.setAttribute("name", "url[" + i + "]");
            url.setAttribute("value", error[1]);
            url.setAttribute("type", "hidden");

            line = document.createElement("input");
            line.setAttribute("name", "line[" + i + "]");
            line.setAttribute("value", error[2]);
            line.setAttribute("type", "hidden");

            symbol = document.createElement("input");
            symbol.setAttribute("name", "symbol[" + i + "]");
            symbol.setAttribute("value", error[3]);
            symbol.setAttribute("type", "hidden");

            form.appendChild(message);
            form.appendChild(url);
            form.appendChild(line);
            form.appendChild(symbol);
        }

        document.body.appendChild(form);
        form.submit();

        _errors = [];

        // observe once again
        setTimeout(function() {
            doLog(0);
        }, 1000);

    };

    // create hidden iframe
    var iframe = document.createElement('iframe');

    iframe.setAttribute('style', 'display:none');
    iframe.setAttribute('name', 'error-log-frame');
    document.body.appendChild(iframe);

    // check on load
    doLog(1);

})();
