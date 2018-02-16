var app = {
    config: require('./config.js'),
    util: require('./util.js'),
    parser: require('./parser.js'),
    skeleton: require('./skeleton.js'),
    network: require('./network.js'),
}

// module access to main app, and other modules
for( var k in app ) {
    app[k].app = app;
}

app.skeleton.start();
app.network.start();

app.network.handle("auth", function(m) {
    app.skeleton.w("{red-fg}Auth{/red-fg}, sending password.");
    app.network.client.write(app.config.password + "\n");
    setInterval(function() {
        app.network.client.write("gettime\nlistplayers\n");
    }, app.config.frequency);
});

app.network.handle("time", function(m) {
    app.skeleton.t(0, "Day " + m.day + ", " + m.hour + ":" + m.minute );
    app.skeleton.t(1, "Next Horde Day: " + app.util.next_horde_day(m.day) );
});
