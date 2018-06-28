"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var functions_1 = require("./dist/utils/functions");
var fs = require("fs");
process.argv.forEach(function (val, index) {
    if (index >= 2) {
        console.log(index + ': ' + val);
        read(val);
    }
});
function read(alfa) {
    //alfa=path.join(__dirname,alfa);
    fs.exists(alfa, function (exists) {
        if (exists) {
            console.log(alfa);
            var t_1 = new index_1.TcxFile();
            t_1.read(alfa, (function (err, data) {
                if (!err) {
                    var act = new index_1.Activity();
                    act.read(0, t_1);
                    console.log(act.id);
                    console.log(act.distanceFromPoints);
                    console.log(act.distanceFromLaps + ' <-Laps');
                    console.log(functions_1.secsToTime(act.timeFromPoints));
                    console.log(functions_1.secsToTime(act.timeFromLaps) + ' <-Laps');
                    console.log('Pace =' + act.timeFromPoints + ' ' + functions_1.secsToTime(act.timeFromPoints / (act.distanceFromPoints / 1000)));
                    t_1.save('save.json', 1, null, function (err) {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
                else {
                    console.log(err);
                }
            }));
            // t.read()
            // const a = new Activity();
        }
        else {
            console.log(alfa + " doesn't exists!");
        }
    });
}
