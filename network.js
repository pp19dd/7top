var net = require('net');
var client = new net.Socket();
var app;

client.on('data', function(data) {
    app.skeleton.w(
        "RECV " + data.toString().length + ": " +
        JSON.stringify(data.toString())
    );
    //screen.render();
    //parse_all(data.toString());
});

client.on('close', function() {
    this.app.skeleton.w("Disconnected");
});

function start() {
    app = this.app;

    var rs = app.config.hostname + ":" + app.config.port.toString();
    app.skeleton.w("Connecting to " + rs  + " ...");
    app.skeleton.w(app);
    //var that = this;

    //this.app.skeleton.w();

    client.connect( this.app.config.port, this.app.config.hostname, function() {
        app.skeleton.w( "... connected" );
    });
//         that.app.skeleton.w("Connected to " + rs);
//         //log.pushLine("Connected to " + this.app.config.hostname + ":" + this.app.config.port);
//         // setInterval(do_status, this.app.config.frequency);
//         //screen.render();
//     });

}

module.exports.start = start;
