
var app = this;

var parse = [
    [/Please enter password:/, function(matched, chunk) {
        return({ type: 'auth' });
        // log.pushLine("Sending password ("  + config.password.length + ") chars" );
        // client.write(config.password + "\n");
        // screen.render();
    }],
    [/Total of (.?) in the game/, function(matched, chunk) {
        var roster = [];
        var p = chunk.split("\r\n");

        for( var j = 0; j < p.length; j++ ) {
            var n = p[j].toString().split(", pos=");
            if( n == "" ) continue;
            roster.push(n);

            //var n = p[j].toString().match(/id=([0-9]+), (.*), pos=/);
            //var n = p[j].toString().match(/herpderp/);
            ////if( n != null ) roster.push( n );
            //roster.push( n );
            //roster.push( n );
        }

        return({ type: 'playerlist', list: roster });
    }]
];

// optional CLI vector of entry for parsing tests
function test() {
    var clear = require('clear');
    app.util = require("./util.js");
    app.real_util = require('util');

    clear();

    var files = app.util.list("debug");

    for( var i in files ) {
        var text = app.util.get("debug/" + files[i]);
        var parsed = parse_all(text);

        console.info( "------------ " + files[i] + " ------------" );
        console.info( app.real_util.inspect( parsed, { showHidden: false, depth: null} ) );
    }
    //console.dir( files );
    // var x = util.get("debug/playerlist.txt");
    // console.info( x );
    setInterval(function() { }, 1000);

}

function parse_all(chunk) {
    var ret = [];

    for( var i = 0; i < parse.length; i++ ) {
        var x = chunk.match(parse[i][0]);
        if( x != null ) ret.push( parse[i][1](x, chunk) );
    }

    return( ret );
}

if( require.main === module ) {
    test();
}

module.exports.test = test;
module.exports.parse_all = parse_all;
