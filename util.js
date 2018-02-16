// how many util.js are out there?
var fs = require('fs');

function next_horde_day(day) {
    var i = parseInt(day / 7);
    var i2 = i + 1;
    var i_7 = i * 7;
    var i2_7 = i2 * 7;

    var upcoming = i2_7 - day;
    if( upcoming === 7 ) upcoming = 0;

    return( upcoming );
}

// sync is okay for get/put because these are debug routines
function get(filename) {
    return( JSON.parse(fs.readFileSync(filename, { encoding: 'utf8'} )) );
}

function put(filename, data_structure) {
    fs.writeFileSync(filename, JSON.stringify(data_structure) );
}

function list(folder) {
    return( fs.readdirSync(folder) );
}

// thanks, stackoverflow # 6323417
// note: don't forget /g
function findall(regex_pattern, string_) {
    var output_list = [];
    while( true ) {
        var a_match = regex_pattern.exec(string_);
        if (a_match) {
            delete a_match.input;
            output_list.push(a_match);
        } else {
            break;
        }
    }
    return( output_list );
}

module.exports.next_horde_day = next_horde_day;
module.exports.findall = findall;
module.exports.get = get;
module.exports.put = put;
module.exports.list = list;
