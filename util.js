// how many util.js are out there?
var fs = require('fs');


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

module.exports.findall = findall;
module.exports.get = get;
module.exports.put = put;
module.exports.list = list;
