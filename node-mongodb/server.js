/**
 * Created by Administrator on 26/06/2016.
 */

var MongoClinet = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations');

var url = "mongodb://localhost:27017/conFusion";

MongoClinet.connect(url, function (err, db) {
    assert.equal(err, null);
    console.log("Connected correctly to server");

    dboper.insertDocument(db, {name: "Vadound", description: "Test"},
        "dishes", function (result) {
            console.log(result.ops);

            dboper.findDocument(db, "dishes", function (docs) {
                console.log(docs);

                dboper.updateDocument(db, {name: "Vadound"},
                    {description: "Updated test"},
                    "dishes", function (result) {
                        console.log(result.result);

                        dboper.findDocument(db, "dishes", function (docs) {
                            console.log(docs);

                            db.dropCollection("dishes", function (result) {
                                console.log(result);
                                db.close();
                            });
                        });
                    });
            });
        });
});

