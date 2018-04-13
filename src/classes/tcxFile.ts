import * as fs from 'fs';
import Author from "./author";
import Creator from "./creator";
import * as pstring from 'xml2js';
import * as consts from "./consts";
import { iXmlData, iXmlAuthor, iXmlCreator } from './iFaces';
import Lap from './lap';

const pString = pstring.parseString;

class TcxFile {
    data:iXmlData=null;
    isError = true;

    read(filename: string, callback:(err:string, data:iXmlData)=>any) {
        let self = this;
        fs.readFile(filename, 'utf8', (err, data) => {
            if (!err) {
                //το αρχείο υπάρχει τότε το string πάει για parsing
                pString(data, function (err, result) {
                    if (!err) {
                        self.data = result;
                        self.isError = false;
                        callback(null, result);
                    } else {
                        self.isError = true;
                        self.data = null;
                        callback(err, null);
                    }
                });
            } else {
                //το αρχείο δεν υπάρχει
                self.data = null;
                self.isError = true;
                callback(err.message, null);
            }
        });
    }

    getId ():string {
        let id:string = "";
        let self = this;
        if (!self.isError) {
            id = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Id[0];
        }
        return id;
    };

    getSport():string {
        let sport;
        let self = this;
        if (!self.isError) {
            sport = self.data.TrainingCenterDatabase.Activities[0].Activity[0].$.Sport;
        }
        return sport;
    };
    
    getAuthor = function () {
        let author:Author= null;
        let self = this;
        //runtastic does not have author record
        if (!self.isError && self.data.TrainingCenterDatabase.Author !== undefined) {
            author = new Author(self.data.TrainingCenterDatabase.Author[0]);
        }
        return author;
    };
    
    hasCreator = function () {
        let self = this;
        if (!self.isError) {
            return self.data.TrainingCenterDatabase.$.creator !== undefined || self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator !== undefined;
        }
        return false;
    };

    getCreator = function () {
        let creator=new Creator();
        creator.isRuntastic =  false;
        let self = this;
        if (!self.isError && self.hasCreator()) {
            if (self.data.TrainingCenterDatabase.$.creator !== undefined) {
                creator.name = self.data.TrainingCenterDatabase.$.creator;
                creator.isRuntastic = true;
            } else {
                creator = new Creator(self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator[0]);
                creator.isRuntastic = false;
            }
        }
        return creator;
    };
    
    getLaps = function () {
        let laps = [];
        let self = this;
        if (!self.isError) {
            let lapCount = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap.length;
            for (let i = 0 ; i != lapCount; ++i){
                laps.push(new Lap(self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap[i]));
            }
        }
        return laps;
    };
}



export default TcxFile;