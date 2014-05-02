window.onerror = function(msg, url, line) {

    var errorLog = {
            message: msg,
            file: url,
            line: line,
            browser: window.navigator.userAgent
        };

    var request = new XMLHttpRequest();

    request.open('POST', 'http://localhost:3000/api', true);

    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(errorLog));

    return false;
};
