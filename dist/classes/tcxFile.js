"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const author_1 = require("./author");
const creator_1 = require("./creator");
const pstring = require("xml2js");
const lap_1 = require("./lap");
const pString = pstring.parseString;
class TcxFile {
    constructor() {
        this.data = null;
        this.isError = true;
        this.getAuthor = function () {
            let author = null;
            let self = this;
            //runtastic does not have author record
            if (!self.isError && self.data.TrainingCenterDatabase.Author !== undefined) {
                author = new author_1.default(self.data.TrainingCenterDatabase.Author[0]);
            }
            return author;
        };
        this.hasCreator = function () {
            let self = this;
            if (!self.isError) {
                return self.data.TrainingCenterDatabase.$.creator !== undefined || self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator !== undefined;
            }
            return false;
        };
        this.getCreator = function () {
            let creator = new creator_1.default();
            creator.isRuntastic = false;
            let self = this;
            if (!self.isError && self.hasCreator()) {
                if (self.data.TrainingCenterDatabase.$.creator !== undefined) {
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
            if (!self.isError) {
                let lapCount = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap.length;
                for (let i = 0; i != lapCount; ++i) {
                    laps.push(new lap_1.default(self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap[i]));
                }
            }
            return laps;
        };
    }
    read(filename, callback) {
        let self = this;
        fs.readFile(filename, 'utf8', (err, data) => {
            if (!err) {
                //το αρχείο υπάρχει τότε το string πάει για parsing
                pString(data, function (err, result) {
                    if (!err) {
                        self.data = result;
                        self.isError = false;
                        callback(null, result);
                    }
                    else {
                        self.isError = true;
                        self.data = null;
                        callback(err, null);
                    }
                });
            }
            else {
                //το αρχείο δεν υπάρχει
                self.data = null;
                self.isError = true;
                callback(err.message, null);
            }
        });
    }
    getId() {
        let id = "";
        let self = this;
        if (!self.isError) {
            id = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Id[0];
        }
        return id;
    }
    ;
    getSport() {
        let sport;
        let self = this;
        if (!self.isError) {
            sport = self.data.TrainingCenterDatabase.Activities[0].Activity[0].$.Sport;
        }
        return sport;
    }
    ;
}
exports.default = TcxFile;
//# sourceMappingURL=tcxFile.js.map