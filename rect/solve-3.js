/**
 * Created by Administrator on 24/06/2016.
 */

var rect = require('./rectangle-2');
var argv = require('yargs')
    .usage('Usage: node $0 --l=[num] --b=[num]')
    .demand(['l', 'b'])
    .argv;


function solveRect(l, b) {
    console.log("Solving for rectangle with l = " + l +
        " and b = " + b);

    rect(l, b, function (err, rectangle) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("The area of a rectangle of dimensions length = "
                + l + " and breadth = " + b + " is " + rectangle.area(l, b));

            console.log("The area of a perimeter of dimensions length = "
                + l + " and breadth = " + b + " is " + rectangle.perimeter(l, b));
        }
    });
}

solveRect(argv.l, argv.b);