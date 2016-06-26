/**
 * Created by Administrator on 24/06/2016.
 */
/**
 * Created by Administrator on 24/06/2016.
 */

var rect = require('./rectangle-1');
var argv = require('yargs')
    .usage('Usage: node $0 --l=[num] --b=[num]')
    .demand(['l', 'b'])
    .argv;

function solveRect(l, b) {
    console.log("Solving for rectangle with l = " + l +
        " and b = " + b);

    if (l < 0 || b < 0) {
        console.log("Rectangle dimensions should be greater than zero: l = " + l +
            ", and b = " + b);
    }
    else {
        console.log("The area of a rectangle of dimensions length = "
            + l + " and breadth = " + b + " is " + rect.area(l, b));

        console.log("The area of a perimeter of dimensions length = "
            + l + " and breadth = " + b + " is " + rect.perimeter(l, b));

    }
}

solveRect(argv.l, argv.b);

