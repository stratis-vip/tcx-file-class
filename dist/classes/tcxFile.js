"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const author_1 = require("./author");
const creator_1 = require("./creator");
const pstring = require("xml2js");
const consts = require("./consts");
const lap_1 = require("./lap");
const pString = pstring.parseString;
class TcxFile {
    constructor(filename, callback) {
        this.data = null;
        this.isError = consts.ERROR_STRING_VALUE;
        this.isReady = false;
        this.getAuthor = function () {
            let author = null;
            let self = this;
            //runtastic does not have author record
            if (self.isReady && self.data.TrainingCenterDatabase.Author !== undefined) {
                author = new author_1.default(self.data.TrainingCenterDatabase.Author[0]);
            }
            return author;
        };
        this.hasCreator = function () {
            let self = this;
            if (self.isReady) {
                return self.data.TrainingCenterDatabase.$.creator !== undefined || self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator !== undefined;
            }
            return false;
        };
        this.getCreator = function () {
            let creator = null;
            let self = this;
            if (self.isReady && self.hasCreator()) {
                if (self.data.TrainingCenterDatabase.$.creator !== undefined) {
                    creator = new creator_1.default();
                    creator.name = self.data.TrainingCenterDatabase.$.creator;
                    creator.isRuntastic = true;
                }
                else {
                    creator = new creator_1.default(self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator[0]);
                    creator.isRuntastic = false;
                }
            }
            return creator;
        };
        this.getLaps = function () {
            let laps = [];
            let self = this;
            if (self.isReady) {
                let lapCount = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap.length;
                for (let i = 0; i != lapCount; ++i) {
                    laps.push(new lap_1.default(self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap[i]));
                }
            }
            return laps;
        };
        read(this, filename, (err) => {
            if (err) {
                this.isError = err;
                callback(err);
            }
            else {
                this.isReady = true;
                callback(consts.ERROR_STRING_VALUE);
            }
        });
    }
    getId() {
        let id = "";
        let self = this;
        if (self.isReady) {
            id = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Id[0];
        }
        return id;
    }
    ;
    getSport() {
        let sport;
        let self = this;
        if (self.isReady) {
            sport = self.data.TrainingCenterDatabase.Activities[0].Activity[0].$.Sport;
        }
        return sport;
    }
    ;
}
function read(obj, filename, callback) {
    let self = obj;
    fs.readFile(filename, 'utf8', (err, data) => {
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
exports.default = TcxFile;
//# sourceMappingURL=tcxFile.js.map