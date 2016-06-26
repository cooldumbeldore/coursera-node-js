/**
 * Created by Administrator on 26/06/2016.
 */

var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes')

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected correctly to server");

    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            }
        ]
    });

    /*
     newDish.save(function (err) {
     if (err) throw err;

     console.log("Dish created!");
     Dishes.find({}, function (err, dishes) {
     if (err) throw err;

     console.log(dishes);

     db.collection("dishes").drop(function (err) {
     db.close();
     });
     });
     });
     */

    Dishes.create({
        name: 'Uthapizza2',
        description: 'Test2',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            }
        ]
    }, function (err, dish) {
        if (err) throw err;

        console.log('Dish created!');
        console.log(dish);
        var id = dish._id;


        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Update Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);
                    });


                });
        }, 3000)


        setTimeout(function () {
            Dishes.findByIdAndUpdate(
                id,
                {
                    $push: {
                        "comments": {
                            rating: 1,
                            comment: 'BLA BLO BLI',
                            author: 'BABA'
                        }
                    }
                }, {
                    safe: true,
                    new: true
                })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Update Dish! AGAIN');
                    console.log(dish);

                    db.collection("dishes").drop(function (err) {
                        db.close();
                    });
                });
        }, 5000)

    })
});