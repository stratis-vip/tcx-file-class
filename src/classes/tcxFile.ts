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
    isError = consts.ERROR_STRING_VALUE;
    isReady = false;

    constructor(filename:string, callback:(err:string)=>void){
        read(this, filename,(err)=>{
            if (err){
                this.isError = err;
                callback(err);
            }else {
                this.isReady = true;
                callback(consts.ERROR_STRING_VALUE);
            }
        });
    }

    

    getId ():string {
        let id:string = "";
        let self = this;
        if (self.isReady) {
            id = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Id[0];
        }
        return id;
    };

    getSport():string {
        let sport;
        let self = this;
        if (self.isReady) {
            sport = self.data.TrainingCenterDatabase.Activities[0].Activity[0].$.Sport;
        }
        return sport;
    };
    
    getAuthor():Author|null {
        let author:Author= null;
        let self = this;
        //runtastic does not have author record
        if (self.isReady && self.data.TrainingCenterDatabase.Author !== undefined) {
            author = new Author(self.data.TrainingCenterDatabase.Author[0]);
        }
        return author;
    };
    
    hasCreator():boolean {
        let self = this;
        if (self.isReady) {
            return self.data.TrainingCenterDatabase.$.creator !== undefined || self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator !== undefined;
        }
        return false;
    };

    getCreator():Creator |null {
        let creator:Creator=null;
        let self = this;
        if (self.isReady && self.hasCreator()) {
            if (self.data.TrainingCenterDatabase.$.creator !== undefined) {
                creator = new Creator();
                creator.name = self.data.TrainingCenterDatabase.$.creator;
                creator.isRuntastic = true;
            } else {
                creator = new Creator(self.data.TrainingCenterDatabase.Activities[0].Activity[0].Creator[0]);
                creator.isRuntastic = false;
            }
        }
        return creator;
    };
    
    getLaps():Array<Lap> | Array<null> {
        let laps = [];
        let self = this;
        if (self.isReady) {
            let lapCount = self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap.length;
            for (let i = 0 ; i != lapCount; ++i){
                laps.push(new Lap(self.data.TrainingCenterDatabase.Activities[0].Activity[0].Lap[i]));
            }
        }
        return laps;
    };
}

function read(obj:any,filename: string, callback:(err:string, data:iXmlData)=>void) {
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
                } else {
                    self.isError = err.message;
                    self.data = null;
                    self.isReady = false;
                    callback(err, null);
                }
            });
        } else {
            //το αρχείο δεν υπάρχει
            self.data = null;
            self.isError = err.message;
            self.isReady = false;
            callback(err.message, null);
        }
    });
}

export default TcxFile;