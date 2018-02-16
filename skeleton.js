// ===========================================================================
// wrapper for blessed, handles some other interface stuff
// ===========================================================================
var blessed = require('blessed');
var screen;
var log;
var players;
var box_s;

function start() {
    screen = blessed.screen({
        //smartCSR: true,
        fastCSR: true,
        fullUnicode: true,
    });
    screen.title = '7top';

    // Create a box perfectly centered horizontally and vertically.
    log = blessed.log({
        style: { fg: 'cyan' },
        parent: screen,
        top: 'top',
        width: '65%',
        height: '100%-1',
    });

    players = blessed.box({
        parent: screen,
        label: 'players',
        top: '30%',
        left: '65%',
        width: '35%',
        height: '70%',
        border: 'line',
        scrollable: true
    });

    box_s = blessed.box({
        parent: screen,
        style: { fg: 'blue', bold: true },
        label: 'server',
        top: 'top',
        left: '65%',
        width: '35%',
        height: '30%',
        border: 'line',
        scrollable: true
    });
    // Append our box to the screen.

    screen.append(log);
    screen.append(players);
    screen.append(box_s);

    log.focus();

    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        //client.write("exit\n");
        //screen.destroy();
        return process.exit(0);
    });

    // Render the screen.
    screen.render();
}

function w(text) {
    log.pushLine(text);
    //log.setContent(text.toString());
    screen.render();
}

function t(line, text) {
    // box_s.pushLine(text);
    box_s.setLine(line, text);
    screen.render();
}

module.exports.t = t;
module.exports.w = w;
module.exports.start  = start;
