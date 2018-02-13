
var config = {
    hostname: "localhost",
    port: "8081",
    password: "enter-password-here",
    frequency: 1000 * 5,
    debug: false,
}

for( var k in config ) {
    module.exports[k] = config[k];
}
