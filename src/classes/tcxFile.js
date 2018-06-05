"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var events_1 = require("events");
var fs = require("fs");
var author_1 = require("./author");
var creator_1 = require("./creator");
var pstring = require("xml2js");
var consts = require("./consts");
var lap_1 = require("./lap");
var activity_1 = require("./activity");
var pString = pstring.parseString;
/**
 * Το κεντρικό αντικείμενο που διαχειρίζεται το TCX αρχείο
 */
var TcxFile = /** @class */ (function (_super) {
    __extends(TcxFile, _super);
    /**
     * Δημιουργία του αντικειμένου που διαβάζει τα δεδομένα από TCX  αρχείο
     *
     * @param {string} filename το όνομα του αρχείου TCX
     * @param {function} callback η συνάρτηση που καλείται όταν διαβάσει το αρχείο. Αν
     * υπάρχει λάθος, τότε η callback(err:string) επιστρέφει το λάθος στην err
     */
    //constructor(filename:string, callback:(err:string)=>void){
    function TcxFile() {
        var _this = _super.call(this) || this;
        /**Όλα τα δεδομένα του αρχείου σε ΧΜL μορφή */
        _this.data = null;
        /**Κρατάει την τιμή του λάθους, αν υπάρχει, στην ανάγωνση του TCX αρχείου */
        _this.isError = consts.ERROR_STRING_VALUE;
        /**Ετοιμότητα του αντικειμένου */
        _this.isReady = false;
        return _this;
        // this.read(filename,(err)=>{
        //     if (err){
        //         this.isError = err;
        //         this.emit('endReading',err);
        //         callback(err);
        //     }else {
        //         this.emit('endReading',null)
        //         this.isReady = true;
        //         callback(undefined);
        //     }
        // });
    }
    /**Διαβάζει την ιδότητα Id του ΤCX αρχείου
     * @return {string} id η τσυτότητα της δραστηριότητας
    */
    TcxFile.prototype.getId = function () {
        var id = "";
        var self = this;
        if (self.isReady) {
            id = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Id[0];
        }
        return id;
    };
    ;
    /**Διαβάσει το τύπο του Sport από το TCX αρχείο
     * @returns {string} sport το άθλημα της δραστηριότητας
      */
    TcxFile.prototype.getSport = function () {
        var sport;
        var self = this;
        if (self.isReady) {
            sport = self.data.TrainingCenterDatabase.Activities[0].Activity[0].$.Sport;
        }
        return sport;
    };
    ;
    /**
     * Συμπληρώνει ένα αντικείμενο Author με τα στοχεία (αν υπάρχουν) στο TCX αρχείο
     *
     * @returns {Author} author αντικείμενο Author η null
     */
    TcxFile.prototype.getAuthor = function () {
        var author = null;
        var self = this;
        //runtastic does not have author record
        if (self.isReady && self.data.TrainingCenterDatabase.Author !== undefined) {
            author = new author_1.Author(self.data.TrainingCenterDatabase.Author[0]);
        }
        return author;
    };
    ;
    /**
     * Ελέγχει αν το αρχείο έχει στοιχεία Creator
     * @return {boolean} true ή false
     */
    TcxFile.prototype.hasCreator = function () {
        var self = this;
        if (self.isReady) {
            return self.data.TrainingCenterDatabase.$.creator !== undefined || self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator !== undefined;
        }
        return false;
    };
    ;
    /**
    * Συμπληρώνει ένα αντικείμενο Creator με τα στοχεία (αν υπάρχουν) στο TCX αρχείο
    *
    * @returns {Creator} creator αντικείμενο Creator η null
    */
    TcxFile.prototype.getCreator = function () {
        var creator = null;
        var self = this;
        if (self.isReady && self.hasCreator()) {
            if (self.data.TrainingCenterDatabase.$.creator !== undefined) {
                creator = new creator_1.Creator();
                creator.name = self.data.TrainingCenterDatabase.$.creator;
                creator.isRuntastic = true;
            }
            else {
                creator = new creator_1.Creator(self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator[0]);
                creator.isRuntastic = false;
            }
        }
        return creator;
    };
    ;
    /**
     * Συμπληρώνει ένα πίνακα με όλα τα Laps του αρχείου TCX
     *
     * @return τον πίνακα σε μορφή Array<Lap>
     */
    TcxFile.prototype.getLaps = function () {
        var laps = Array();
        var self = this;
        if (self.isReady) {
            var lapCount = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap.length;
            for (var i = 0; i != lapCount; ++i) {
                laps.push(new lap_1.Lap(self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap[i]));
            }
        }
        return laps;
    };
    ;
    /**
     * Ανάγνωση αρχείου TCX και απόδοση των στοιχείων του στο obj αντικείμενο TcxFile
     *
     * @param {TcxFile} obj το αντικείμενο που θα διαβάσουμε
     * @param {string} filename το όνομα του αρχείου
     * @param callback η συνάρτηση που επιστρέφει (err, data). Όπου data σε μορφή iXmlData
     * το σύνολο των δεδομένων του TCX αρχείου (filename)
     */
    TcxFile.prototype.read = function (filename, callback) {
        var self = this;
        fs.readFile(filename, 'utf8', function (err, data) {
            if (!err) {
                //το αρχείο υπάρχει τότε το string πάει για parsing
                pString(data, function (err, result) {
                    if (!err) {
                        self.data = result;
                        self.isError = consts.ERROR_STRING_VALUE;
                        self.isReady = true;
                        self.emit('endReading', null);
                        callback(null, result);
                    }
                    else {
                        self.isError = err.message;
                        self.data = null;
                        self.isReady = false;
                        self.emit('endReading', err);
                        callback(err, null);
                    }
                });
            }
            else {
                //το αρχείο δεν υπάρχει
                self.data = null;
                self.isError = err.message;
                self.isReady = false;
                self.emit('endReading', err);
                callback(err.message, null);
            }
        });
    };
    TcxFile.prototype.readFromString = function (source, callback) {
        var self = this;
        pString(source, function (err, result) {
            if (!err) {
                self.data = result;
                self.isError = consts.ERROR_STRING_VALUE;
                self.isReady = true;
                self.emit('endReading', null);
                callback(null, result);
            }
            else {
                self.isError = err.message;
                self.data = null;
                self.isReady = false;
                self.emit('endReading', err);
                callback(err, null);
            }
        });
    };
    TcxFile.prototype.save = function (filename, athleteId, zones, callback) {
        var self = this;
        self.emit('Proccessing', 'starting...');
        var act = new activity_1.Activity();
        act.on('Process', function (val) {
            self.emit('Process', val);
        });
        act.on('progress', function (val) {
            self.emit('progress', val);
        });
        act.read(athleteId, this, zones);
        self.emit('Proccessing', '...end');
        fs.writeFile(filename, JSON.stringify(act.proccessElements), function (err) {
            if (err) {
                self.emit('endWriting', err);
                callback(err.message);
            }
            else {
                self.emit('endWriting', null);
                callback(undefined);
            }
        });
    };
    return TcxFile;
}(events_1.EventEmitter));
exports.TcxFile = TcxFile;
