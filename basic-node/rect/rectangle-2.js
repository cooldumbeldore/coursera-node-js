/**
 * Created by Administrator on 24/06/2016.
 */


module.exports = function (x, y, callback) {
    try {
        if (x < 0 || y < 0) {
            throw new Error("Rectangle dimensions should be greater than zero:" +
                "l = " + x + ", and b = " + y);
        } else {
            callback(null, {
                perimeter: function (x, y) {
                    return (2 * (x + y));
                },

                area: function (x, y) {
                    return (x * y);
                }

            });
        }
    }
    catch (error) {
        callback(error, null)
    }
}
