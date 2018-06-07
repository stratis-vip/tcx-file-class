import * as path from 'path';

import {TcxFile} from "../classes/tcxFile";
import {Author} from "../classes/author";
import * as consts from "../classes/consts";
import { iXmlData, iXmlTrainingCenterDatabase } from '../classes/iFaces';

import * as fs from 'fs';
import { ResultClass } from '../classes/resultClass';


class XmlData implements iXmlData {
    TrainingCenterDatabase: iXmlTrainingCenterDatabase;
}

describe("Αρχεία TCX\n", function () {

    // it("\tΈλεγχος του αντικειμένου tcxFile όταν δεν υπάρχει το αρχείο", (done) => {
    //     let tcx = new TcxFile();
    //     tcx.read("test.tcx", (err: string) => {
    //         expect(tcx.isError).not.toBe(undefined);
    //         expect(tcx.data).toEqual(null);
    //         done()
    //     });
    // });

    it("\tΘα πρέπει να αποθηκεύει ένα υπάρχον αρχείο tcx χωρίς ζώνες", (done) => {
        let fname = path.join(__dirname, 'g1.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err: string) => {
            expect(tcxFile.data).not.toEqual(null);
            expect(err).toBe(null);
            tcxFile.save(path.join(__dirname, 'act.json'), 1358, null, (err) => {
                fs.readFile(path.join(__dirname, "act.json"), 'utf8', (err, data) => {
                    if (!err) {
                        let res: ResultClass = JSON.parse(data);
                        //console.log(act.proccessElements.times);
                        expect(res.id).toEqual("2018-05-08T15:15:06.000Z");
                        expect(res.athlete).toEqual(1358);
                        expect(res.distance).toEqual(12021.613140206222);
                        expect(res.sport).toEqual(1);
                        expect(res.minAlt).toEqual(53.400001525878906);
                        expect(res.totalTime).toEqual(4810);
                        expect(res.maxAlt).toEqual(58);
                        expect(res.totalUp).toEqual(112.00003433227539);
                        expect(res.totalDown).toEqual(111.20003509521484);
                        expect(res.maxSpeed).toEqual(6.6367348461480455);
                        expect(res.maxHR).toEqual(147);
                        expect(res.maxCadence).toEqual(92);
                        expect(res.times[0].start).toEqual(922);
                        expect(res.times[1].end).toEqual(2331);
                        expect(res.times[2].distance).toEqual(405.0802319315244);
                        expect(res.times[3].time).toEqual(389);

                        expect(res.times[4].recTime).toEqual(786.8494693407717);
                        expect(res.times[5].avgHr).toEqual(143);
                        expect(res.times[6].dAlt).toEqual(0);
                        fs.unlinkSync(path.join(__dirname, "act.json"));

                        done();
                    } else { done(); }
                })
            });
        });

    });

    it("\tΘα πρέπει να αποθηκεύει ένα υπάρχον αρχείο tcx με ζώνες", (done) => {
        let fname = path.join(__dirname, 'g1.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err: string) => {
            expect(tcxFile.data).not.toEqual(null);
            expect(err).toBe(null);
            tcxFile.save(path.join(__dirname, 'actZones.json'), 1358, [112, 126, 137, 142], (err) => {
                fs.readFile(path.join(__dirname, "actZones.json"), 'utf8', (err, data) => {
                    if (!err) {
                        let res: ResultClass = JSON.parse(data);
                        //console.log(act.proccessElements.times);
                        expect(res.id).toEqual("2018-05-08T15:15:06.000Z");
                        expect(res.athlete).toEqual(1358);
                        expect(res.distance).toEqual(12021.613140206222);
                        expect(res.sport).toEqual(1);
                        expect(res.minAlt).toEqual(53.400001525878906);
                        expect(res.totalTime).toEqual(4810);
                        expect(res.maxAlt).toEqual(58);
                        expect(res.totalUp).toEqual(112.00003433227539);
                        expect(res.totalDown).toEqual(111.20003509521484);
                        expect(res.maxSpeed).toEqual(6.6367348461480455);
                        expect(res.maxHR).toEqual(147);
                        expect(res.maxCadence).toEqual(92);
                        expect(res.times[0].start).toEqual(922);
                        expect(res.times[1].end).toEqual(2331);
                        expect(res.times[2].distance).toEqual(405.0802319315244);
                        expect(res.times[3].time).toEqual(389);

                        expect(res.times[4].recTime).toEqual(786.8494693407717);
                        expect(res.times[5].avgHr).toEqual(143);
                        expect(res.times[6].dAlt).toEqual(0);
                        expect(res.zones[0].time).toEqual(40);
                        expect(res.zones[1].time).toEqual(202);
                        expect(res.zones[2].time).toEqual(500);
                        expect(res.zones[3].time).toEqual(1358);
                        expect(res.zones[4].time).toEqual(2078);
                        fs.unlinkSync(path.join(__dirname, "actZones.json"));
                        done();
                    } else { done(); }
                })
            });
        });

    });

    it("\tΘα πρέπει να ανοίγει ένα υπάρχον αρχείο tcx", (done) => {
        let fname = path.join(__dirname, 'garmin.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err: string) => {
            expect(tcxFile.data).not.toEqual(null);
            expect(err).toBe(null);
            done();
        });

    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με τρέξιμο tcx της Garmin", (done) => {
        let fname = path.join(__dirname, 'garmin.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Running");
            expect(tcxFile.getId()).toEqual("2018-04-05T03:23:17.000Z");
            expect(tcxFile.getAuthor().name).toEqual("Garmin Connect API");
            expect(tcxFile.getAuthor().typeOfAuthor).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("18.5.3.3");
            expect(tcxFile.getAuthor().langId).toEqual("en");
            expect(tcxFile.getAuthor().partNumber).toEqual("006-D2449-00");
            expect(tcxFile.getCreator().name).toEqual("Forerunner 230");
            expect(tcxFile.getCreator().typeOfCreator).toEqual("Device_t");
            expect(tcxFile.getCreator().productId).toEqual(2157);
            expect(tcxFile.getCreator().unitId).toEqual(3937251354);
            expect(tcxFile.getCreator().version).toEqual("7.70.0.0");
            expect(tcxFile.getCreator().isRuntastic).toEqual(false);
            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2018-04-05T03:23:17.000Z");
            expect(laps[0].averageHeartRateBpm).toBe(129);
            expect(laps[0].maximumHeartRateBpm).toBe(140);
            expect(laps[0].maximumSpeed).toBe(3.0230000019073486);
            expect(laps[0].totalTimeSeconds).toBe(380);
            expect(laps[0].calories).toBe(78);
            expect(laps[0].distanceMeters).toBe(1000);
            expect(laps[0].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgRunCadence).toBe(91);
            expect(laps[0].maxRunCadence).toBe(97);
            expect(laps[0].avgSpeed).toBe(2.6429998874664307);
            expect(laps[0].intensity).toBe("Active");
            expect(laps[0].trackPoints[0].distanceMeters).toBe(1.3300000429153442);
            expect(laps[0].trackPoints[0].speed).toBe(1.3339999914169312);
            expect(laps[0].trackPoints[0].runCadence).toBe(60);
            expect(laps[0].trackPoints[0].cadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[0].heartRateBpm).toBe(97);
            expect(laps[0].trackPoints[0].time).toBe("2018-04-05T03:23:17.000Z");
            expect(laps[0].trackPoints[0].position.latitudeDegrees).toBe(40.52633394487202);
            expect(laps[0].trackPoints[0].position.longitudeDegrees).toBe(22.20780048519373);
            expect(laps[0].trackPoints[0].position.altitudeMeters).toBe(134.8000030517578);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με ποδηλασία tcx της Garmin", (done) => {
        let fname = path.join(__dirname, 'garmin-b.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Biking");
            expect(tcxFile.getId()).toEqual("2018-04-07T09:46:15.000Z");
            expect(tcxFile.getAuthor().name).toEqual("Garmin Connect API");
            expect(tcxFile.getAuthor().typeOfAuthor).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("18.6.0.0");
            expect(tcxFile.getAuthor().langId).toEqual("en");
            expect(tcxFile.getAuthor().partNumber).toEqual("006-D2449-00");
            expect(tcxFile.getCreator().name).toEqual("Edge 520");
            expect(tcxFile.getCreator().typeOfCreator).toEqual("Device_t");
            expect(tcxFile.getCreator().productId).toEqual(2067);
            expect(tcxFile.getCreator().unitId).toEqual(3940583302);
            expect(tcxFile.getCreator().version).toEqual("12.50.0.0");
            expect(tcxFile.getCreator().isRuntastic).toEqual(false);
            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2018-04-07T09:46:15.000Z");
            expect(laps[0].averageHeartRateBpm).toBe(134);
            expect(laps[0].maximumHeartRateBpm).toBe(141);
            expect(laps[0].maximumSpeed).toBe(11.869000434875488);
            expect(laps[0].totalTimeSeconds).toBe(591);
            expect(laps[0].calories).toBe(109);
            expect(laps[0].distanceMeters).toBe(5000);
            expect(laps[0].maxBikeCadence).toBe(65);
            expect(laps[0].steps).toBe(584);
            expect(laps[0].avgRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgSpeed).toBe(9.152999877929688);
            expect(laps[0].intensity).toBe("Active");
            expect(laps[0].trackPoints[0].distanceMeters).toBe(0);
            expect(laps[0].trackPoints[0].speed).toBe(0);
            expect(laps[0].trackPoints[0].runCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[0].cadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[0].heartRateBpm).toBe(89);
            expect(laps[0].trackPoints[0].time).toBe("2018-04-07T09:46:15.000Z");
            expect(laps[0].trackPoints[0].position.latitudeDegrees).toBe(40.52823739126325);
            expect(laps[0].trackPoints[0].position.longitudeDegrees).toBe(22.209320543333888);
            expect(laps[0].trackPoints[0].position.altitudeMeters).toBe(108);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με τρέξιμο tcx της Tapiriik", (done) => {
        let fname = path.join(__dirname, 'tapirik.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Running");
            expect(tcxFile.getId()).toEqual("2017-10-29T07:11:03.000Z");
            expect(tcxFile.getAuthor().name).toEqual("tapiriik");
            expect(tcxFile.getAuthor().typeOfAuthor).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("0.0.0.0");
            expect(tcxFile.getAuthor().langId).toEqual("en");
            expect(tcxFile.getAuthor().partNumber).toEqual("000-00000-00");
            expect(tcxFile.hasCreator()).toEqual(false);

            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2017-10-29T07:11:03.000Z");
            expect(laps[0].averageHeartRateBpm).toBe(135);
            expect(laps[0].maximumHeartRateBpm).toBe(145);
            expect(laps[0].maximumSpeed).toBe(2.724999904632569);
            expect(laps[0].totalTimeSeconds).toBe(390.284);
            expect(laps[0].calories).toBe(78);
            expect(laps[0].distanceMeters).toBe(1000);
            expect(laps[0].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgSpeed).toBe(2.5620000362396236);
            expect(laps[0].intensity).toBe("Active");
            expect(laps[0].trackPoints[1].distanceMeters).toBe(207.63999938964844);
            expect(laps[0].trackPoints[1].speed).toBe(2.48200011253357);
            expect(laps[0].trackPoints[1].runCadence).toBe(93);
            expect(laps[0].trackPoints[1].cadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[1].heartRateBpm).toBe(131);
            expect(laps[0].trackPoints[1].time).toBe("2017-10-29T07:12:28.000Z");
            expect(laps[0].trackPoints[1].position.latitudeDegrees).toBe(40.49249041825533);
            expect(laps[0].trackPoints[1].position.longitudeDegrees).toBe(22.257747910916805);
            expect(laps[0].trackPoints[1].position.altitudeMeters).toBe(33.599998474121094);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με ποδήλατο tcx της Tapiriik", (done) => {
        let fname = path.join(__dirname, 'tapirik-b.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Biking");
            expect(tcxFile.getId()).toEqual("2018-04-07T09:46:15.000Z");
            expect(tcxFile.getAuthor().name).toEqual("tapiriik");
            expect(tcxFile.getAuthor().typeOfAuthor).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("0.0.0.0");
            expect(tcxFile.getAuthor().langId).toEqual("en");
            expect(tcxFile.getAuthor().partNumber).toEqual("000-00000-00");
            expect(tcxFile.hasCreator()).toEqual(false);

            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2018-04-07T09:46:15.000Z");
            expect(laps[0].averageHeartRateBpm).toBe(134);
            expect(laps[0].maximumHeartRateBpm).toBe(141);
            expect(laps[0].maximumSpeed).toBe(11.869000434875488);
            expect(laps[0].totalTimeSeconds).toBe(546.263);
            expect(laps[0].calories).toBe(109);
            expect(laps[0].distanceMeters).toBe(5000);
            expect(laps[0].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgRunCadence).toBe(65);
            expect(laps[0].maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgSpeed).toBe(9.152999877929688);
            expect(laps[0].intensity).toBe("Active");
            expect(laps[0].trackPoints[0].distanceMeters).toBe(0);
            expect(laps[0].trackPoints[0].speed).toBe(0);
            expect(laps[0].trackPoints[0].runCadence).toBe(0);
            expect(laps[0].trackPoints[0].cadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[0].heartRateBpm).toBe(89);
            expect(laps[0].trackPoints[0].time).toBe("2018-04-07T09:46:15.000Z");
            expect(laps[0].trackPoints[0].position.latitudeDegrees).toBe(40.52823739126325);
            expect(laps[0].trackPoints[0].position.longitudeDegrees).toBe(22.209320543333888);
            expect(laps[0].trackPoints[0].position.altitudeMeters).toBe(108);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με τρέξιμο tcx της runtastic", (done) => {
        let fname = path.join(__dirname, 'runtastic.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("running");
            expect(tcxFile.getId()).toEqual("2017-12-16T05:06:45.000Z");
            expect(tcxFile.getAuthor()).toEqual(null);
            expect(tcxFile.getCreator().isRuntastic).toEqual(true);
            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2017-12-16T05:06:45.000Z");
            expect(laps[0].averageHeartRateBpm).toBe(136);
            expect(laps[0].maximumHeartRateBpm).toBe(150);
            expect(laps[0].maximumSpeed).toBe(5.745062777777778);
            expect(laps[0].totalTimeSeconds).toBe(2901);
            expect(laps[0].calories).toBe(645);
            expect(laps[0].distanceMeters).toBe(7009);
            expect(laps[0].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgSpeed).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].intensity).toBe(consts.ERROR_STRING_VALUE);
            expect(laps[0].trackPoints[3].distanceMeters).toBe(14);
            expect(laps[0].trackPoints[3].speed).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].runCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].cadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].heartRateBpm).toBe(97);
            expect(laps[0].trackPoints[3].time).toBe("2017-12-16T05:06:54.000Z");
            expect(laps[0].trackPoints[3].position.latitudeDegrees).toBe(40.52622985839844);
            expect(laps[0].trackPoints[3].position.longitudeDegrees).toBe(22.207685470581055);
            expect(laps[0].trackPoints[3].position.altitudeMeters).toBe(137.1999969482422);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με ποδήλατο tcx της runtastic", (done) => {
        let fname = path.join(__dirname, 'runtastic-b.tcx');
        let author = new Author({});
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("cycling");
            expect(tcxFile.getId()).toEqual("2018-04-07T09:46:15.000Z");
            expect(tcxFile.getAuthor()).toEqual(null);
            expect(tcxFile.getCreator().isRuntastic).toEqual(true);
            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2018-04-07T09:46:15.000Z");
            expect(laps[0].averageHeartRateBpm).toBe(139);
            expect(laps[0].maximumHeartRateBpm).toBe(151);
            expect(laps[0].maximumSpeed).toBe(14.328850555555556);
            expect(laps[0].totalTimeSeconds).toBe(3865);
            expect(laps[0].calories).toBe(1009);
            expect(laps[0].distanceMeters).toBe(30020);
            expect(laps[0].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgSpeed).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].intensity).toBe(consts.ERROR_STRING_VALUE);
            expect(laps[0].trackPoints[3].distanceMeters).toBe(2);
            expect(laps[0].trackPoints[3].speed).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].runCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].cadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].heartRateBpm).toBe(84);
            expect(laps[0].trackPoints[3].time).toBe("2018-04-07T09:46:21.000Z");
            expect(laps[0].trackPoints[3].position.latitudeDegrees).toBe(40.528228759765625);
            expect(laps[0].trackPoints[3].position.longitudeDegrees).toBe(22.209388732910156);
            expect(laps[0].trackPoints[3].position.altitudeMeters).toBe(107.5999984741211);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με τρέξιμο tcx της Polar", (done) => {
        let fname = path.join(__dirname, 'polar.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Running");
            expect(tcxFile.getId()).toEqual("2017-10-29T05:45:48.000Z");
            expect(tcxFile.getAuthor().name).toEqual("Polar Flow Mobile Viewer");
            expect(tcxFile.getAuthor().typeOfAuthor).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("0.0");
            expect(tcxFile.getAuthor().langId).toEqual("EN");
            expect(tcxFile.getAuthor().partNumber).toEqual("XXX-XXXXX-XX");
            expect(tcxFile.getCreator().name).toEqual("Polar V800");
            expect(tcxFile.getCreator().typeOfCreator).toEqual("Device_t");
            expect(tcxFile.getCreator().productId).toEqual(13);
            expect(tcxFile.getCreator().unitId).toEqual(0);
            expect(tcxFile.getCreator().version).toEqual("1.10.0.0");
            expect(tcxFile.getCreator().isRuntastic).toEqual(false);

            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2017-10-29T05:45:49.000Z");
            expect(laps[0].averageHeartRateBpm).toBe(140);
            expect(laps[0].maximumHeartRateBpm).toBe(153);
            expect(laps[0].maximumSpeed).toBe(3.722221851348877);
            expect(laps[0].totalTimeSeconds).toBe(294);
            expect(laps[0].calories).toBe(1346);
            expect(laps[0].distanceMeters).toBe(1000);
            expect(laps[0].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgRunCadence).toBe(88);
            expect(laps[0].maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgSpeed).toBe(3.3840947681003146);
            expect(laps[0].intensity).toBe("Active");
            expect(laps[0].trackPoints[3].distanceMeters).toBe(2.200000047683716);
            expect(laps[0].trackPoints[3].speed).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].runCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].cadence).toBe(0);
            expect(laps[0].trackPoints[3].heartRateBpm).toBe(104);
            expect(laps[0].trackPoints[3].time).toBe("2017-10-29T05:45:52.000Z");
            expect(laps[0].trackPoints[3].position.latitudeDegrees).toBe(40.49050167);
            expect(laps[0].trackPoints[3].position.longitudeDegrees).toBe(22.25649667);
            expect(laps[0].trackPoints[3].position.altitudeMeters).toBe(52.274);

            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με ποδήλατο tcx της Polar", (done) => {
        let fname = path.join(__dirname, 'polar-b.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Biking");
            expect(tcxFile.getId()).toEqual("2018-04-11T15:21:10.000Z");
            expect(tcxFile.getAuthor().name).toEqual("Polar Flow Mobile Viewer");
            expect(tcxFile.getAuthor().typeOfAuthor).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("0.0");
            expect(tcxFile.getAuthor().langId).toEqual("EN");
            expect(tcxFile.getAuthor().partNumber).toEqual("XXX-XXXXX-XX");
            expect(tcxFile.getCreator().name).toEqual("Polar V800");
            expect(tcxFile.getCreator().typeOfCreator).toEqual("Device_t");
            expect(tcxFile.getCreator().productId).toEqual(13);
            expect(tcxFile.getCreator().unitId).toEqual(0);
            expect(tcxFile.getCreator().version).toEqual("1.11.0.0");
            expect(tcxFile.getCreator().isRuntastic).toEqual(false);

            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2018-04-11T15:21:11.000Z");
            expect(laps[0].averageHeartRateBpm).toBe(89);
            expect(laps[0].maximumHeartRateBpm).toBe(140);
            expect(laps[0].maximumSpeed).toBe(7.166665924919976);
            expect(laps[0].totalTimeSeconds).toBe(210);
            expect(laps[0].calories).toBe(503);
            expect(laps[0].distanceMeters).toBe(1000);
            expect(laps[0].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgSpeed).toBe(4.750594033135308);
            expect(laps[0].intensity).toBe("Active");
            expect(laps[0].trackPoints[3].distanceMeters).toBe(11.5);
            expect(laps[0].trackPoints[3].speed).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].runCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].cadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].heartRateBpm).toBe(86);
            expect(laps[0].trackPoints[3].time).toBe("2018-04-11T15:21:14.000Z");
            expect(laps[0].trackPoints[3].position.latitudeDegrees).toBe(40.52007333);
            expect(laps[0].trackPoints[3].position.longitudeDegrees).toBe(22.19930833);
            expect(laps[0].trackPoints[3].position.altitudeMeters).toBe(204.371);
            done();
        });
    });

    it("\tΘα πρέπει να ανοίγει ένα υπάρχον αρχείο που δεν είναι tcx και να γυρνάει κενό", (done) => {
        let fname = path.join(__dirname, 'tcxFileSpec.js');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).not.toBe(consts.ERROR_STRING_VALUE);
            expect(tcxFile.data).toEqual(null);
            expect(tcxFile.getSport()).toEqual(undefined);
            expect(tcxFile.getId()).toBe(consts.ERROR_STRING_VALUE);
            expect(tcxFile.getAuthor()).toEqual(null);
            expect(tcxFile.getCreator()).toEqual(null);


            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με τρέξιμο tcx της Garmin χωρίς καρδιακούς παλμούς", (done) => {
        let fname = path.join(__dirname, 'nobpmgarmin.tcx');
        let tcxFile = new TcxFile();
        tcxFile.read(fname, (err) => {
            expect(this.data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Running");
            expect(tcxFile.getId()).toEqual("2018-04-16T16:56:17.000Z");
            expect(tcxFile.getAuthor().name).toEqual("Garmin Connect API");
            expect(tcxFile.getAuthor().typeOfAuthor).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("18.7.0.0");
            expect(tcxFile.getAuthor().langId).toEqual("en");
            expect(tcxFile.getAuthor().partNumber).toEqual("006-D2449-00");
            expect(tcxFile.getCreator().name).toEqual("Forerunner 230");
            expect(tcxFile.getCreator().typeOfCreator).toEqual("Device_t");
            expect(tcxFile.getCreator().productId).toEqual(2157);
            expect(tcxFile.getCreator().unitId).toEqual(3937251354);
            expect(tcxFile.getCreator().version).toEqual("7.70.0.0");
            expect(tcxFile.getCreator().isRuntastic).toEqual(false);
            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2018-04-16T16:56:17.000Z");
            expect(laps[0].averageHeartRateBpm).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].maximumHeartRateBpm).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].maximumSpeed).toBe(2.00600004196167);
            expect(laps[0].totalTimeSeconds).toBe(128);
            expect(laps[0].calories).toBe(14);
            expect(laps[0].distanceMeters).toBe(238.92);
            expect(laps[0].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].avgRunCadence).toBe(81);
            expect(laps[0].maxRunCadence).toBe(91);
            expect(laps[0].avgSpeed).toBe(1.86300003528595);
            expect(laps[0].intensity).toBe("Active");
            expect(laps[0].trackPoints[0].distanceMeters).toBe(0);
            expect(laps[0].trackPoints[0].speed).toBe(1.128999948501587);
            expect(laps[0].trackPoints[0].runCadence).toBe(58);
            expect(laps[0].trackPoints[0].cadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[0].heartRateBpm).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[0].time).toBe("2018-04-16T16:56:17.000Z");
            expect(laps[0].trackPoints[0].position.latitudeDegrees).toBe(40.525106247514486);
            expect(laps[0].trackPoints[0].position.longitudeDegrees).toBe(22.207767879590392);
            expect(laps[0].trackPoints[0].position.altitudeMeters).toBe(132.39999389648438);
            done();
        });
    });
    it("\tΘα πρέπει να εμφανίζει λάθος όταν δεν υπάρχει το αρχείο tcx", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'NotExisted.ts');
        tcxFile.read(fname, (err, data) => {
            expect(data).toBe(null);
            expect(err).not.toBe(null);
            expect(tcxFile.data).toEqual(null);
            expect(tcxFile.getSport()).toEqual(undefined);
            done();
        });
    });

});

