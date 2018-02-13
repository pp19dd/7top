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
