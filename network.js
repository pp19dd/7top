var net = require('net');
var client = new net.Socket();
var app;

var __handlers = {};

function handle(h_type, h_function) {
    __handlers[h_type] = h_function;
}

client.on('data', function(data) {
    app.skeleton.w(
        "RECV " + data.toString().length + ": " +
        JSON.stringify(data.toString())
    );
    var msgs = app.parser.parse_all(data.toString());
    for( var i = 0; i < msgs.length; i++ ) {
        var l_type = msgs[i].type;
        
        if( typeof __handlers[l_type] != "undefined") {
            __handlers[l_type](msgs[i]);
        }
    }
});

client.on('close', function() {
    this.app.skeleton.w("Disconnected");
});

function start() {
    app = this.app;

    var rs = app.config.hostname + ":" + app.config.port.toString();
    app.skeleton.w("Connecting to " + rs  + " ...");
    app.skeleton.w(app);
    client.connect( this.app.config.port, this.app.config.hostname, function() {
        app.skeleton.w( "... connected" );
    });
}

module.exports.start = start;
module.exports.handle = handle;
module.exports.client = client;
