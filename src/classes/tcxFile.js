"use strict";
exports.__esModule = true;
var fs = require("fs");
var author_1 = require("./author");
var creator_1 = require("./creator");
var pstring = require("xml2js");
var consts = require("./consts");
var lap_1 = require("./lap");
var pString = pstring.parseString;
var TcxFile = /** @class */ (function () {
    function TcxFile(filename, callback) {
        var _this = this;
        this.data = null;
        this.isError = consts.ERROR_STRING_VALUE;
        this.isReady = false;
        this.getAuthor = function () {
            var author = null;
            var self = this;
            //runtastic does not have author record
            if (self.isReady && self.data.TrainingCenterDatabase.Author !== undefined) {
                author = new author_1["default"](self.data.TrainingCenterDatabase.Author[0]);
            }
            return author;
        };
        this.hasCreator = function () {
            var self = this;
            if (self.isReady) {
                return self.data.TrainingCenterDatabase.$.creator !== undefined || self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator !== undefined;
            }
            return false;
        };
        this.getCreator = function () {
            var creator = null;
            var self = this;
            if (self.isReady && self.hasCreator()) {
                if (self.data.TrainingCenterDatabase.$.creator !== undefined) {
                    creator = new creator_1["default"]();
                    creator.name = self.data.TrainingCenterDatabase.$.creator;
                    creator.isRuntastic = true;
                }
                else {
                    creator = new creator_1["default"](self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator[0]);
                    creator.isRuntastic = false;
                }
            }
            return creator;
        };
        this.getLaps = function () {
            var laps = [];
            var self = this;
            if (self.isReady) {
                var lapCount = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap.length;
                for (var i = 0; i != lapCount; ++i) {
                    laps.push(new lap_1["default"](self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap[i]));
                }
            }
            return laps;
        };
        read(this, filename, function (err) {
            if (err) {
                _this.isError = err;
                callback(err);
            }
            else {
                _this.isReady = true;
                callback(consts.ERROR_STRING_VALUE);
            }
        });
    }
    TcxFile.prototype.getId = function () {
        var id = "";
        var self = this;
        if (self.isReady) {
            id = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Id[0];
        }
        return id;
    };
    ;
    TcxFile.prototype.getSport = function () {
        var sport;
        var self = this;
        if (self.isReady) {
            sport = self.data.TrainingCenterDatabase.Activities[0].Activity[0].$.Sport;
        }
        return sport;
    };
    ;
    return TcxFile;
}());
function read(obj, filename, callback) {
    var self = obj;
    fs.readFile(filename, 'utf8', function (err, data) {
        if (!err) {
            //το αρχείο υπάρχει τότε το string πάει για parsing
            pString(data, function (err, result) {
                if (!err) {
                    self.data = result;
                    self.isError = consts.ERROR_STRING_VALUE;
                    self.isReady = true;
                    callback(null, result);
                }
                else {
                    self.isError = err.message;
                    self.data = null;
                    self.isReady = false;
                    callback(err, null);
                }
            });
        }
        else {
            //το αρχείο δεν υπάρχει
            self.data = null;
            self.isError = err.message;
            self.isReady = false;
            callback(err.message, null);
        }
    });
}
exports["default"] = TcxFile;
