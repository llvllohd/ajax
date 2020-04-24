var btn = document.querySelector('button');

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function output(inp) {
    document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}

btn.onclick = function(){
    // create a new HML Http Request Object
    var xhttp = new XMLHttpRequest();
    //defining a callback - when readyState changes
    // we are intested in readyState = 4, and status = 200
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json, undefined, 4);
            output(syntaxHighlight(str));
        }
    };
    // we are opening a GET connection specifiying the URL
    /*
        HTTP Request Methods

        GET         Get a resource form the server
        POST        Create  a new resource at the server
        PUT         Update the resource
        DELETE      Delete a resource
    */
    xhttp.open("GET", "http://localhost:3030/projects", true);
    // we are sending the request
    xhttp.send();
}