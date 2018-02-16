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
    app.skeleton.w("auth?");
    app.network.client.write(app.config.password + "\n");
    setInterval(function() {
        app.network.client.write("gettime\nlistplayers\n");
    }, app.config.frequency);
});

app.network.handle("time", function(m) {
    app.skeleton.t(JSON.stringify(m));
});
