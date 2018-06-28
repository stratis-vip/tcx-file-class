import { Activity, TcxFile} from './index';
import {secsToTime} from './dist/utils/functions'
import * as fs from 'fs';
import * as path from 'path';

process.argv.forEach((val, index) => {
    
    if (index >=2 ) {
        console.log(index + ': ' + val);
        read(val)
    }
});

function read(alfa: string) {
    //alfa=path.join(__dirname,alfa);
    fs.exists(alfa, (exists) => {
        if (exists) {
            console.log(alfa);
            const t = new TcxFile();
            t.read(alfa,((err,data)=>{
                if (!err){
                    let act = new Activity();
                    act.read(0,t);
                    console.log(act.id);
                    console.log(act.distanceFromPoints);
                    console.log(act.distanceFromLaps +' <-Laps');
                    console.log(secsToTime(act.timeFromPoints));
                    console.log(secsToTime(act.timeFromLaps) +' <-Laps');
                    console.log('Pace =' +act.timeFromPoints +' '+secsToTime(act.timeFromPoints / (act.distanceFromPoints/1000)));
                    t.save('save.json',1,null,(err)=>{
                        if (err){
                            console.error(err);
                        }
                    })
                    
                    
                    
                }else {
                    console.log(err);
                }
            }))
            // t.read()
            // const a = new Activity();
            
        }
        else { console.log(`${alfa} doesn't exists!`) }
    })
}
