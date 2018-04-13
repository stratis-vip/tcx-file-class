import * as path from 'path';

import TcxFile from "../classes/tcxFile";
import Author from "../classes/author";
import * as consts from "../classes/consts";
import { iXmlData, iXmlTrainingCenterDatabase } from '../classes/iFaces';


class XmlData implements iXmlData {
    TrainingCenterDatabase: iXmlTrainingCenterDatabase;
}

describe("Αρχεία TCX\n", function () {

    it("\tΈλεγχος του αντικειμένου tcxFile", () => {
        let tcx = new TcxFile();
        expect(tcx.isError).toBe(true);
        expect(tcx.data).toEqual(null);

    });

    it("\tΘα πρέπει να ανοίγει ένα υπάρχον αρχείο tcx", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'garmin.tcx');
        tcxFile.read(fname, (err, data) => {
            expect(data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με τρέξιμο tcx της Garmin", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'garmin.tcx');
        tcxFile.read(fname, (err, data) => {
            expect(data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Running");
            expect(tcxFile.getId()).toEqual("2018-04-05T03:23:17.000Z");
            expect(tcxFile.getAuthor().name).toEqual("Garmin Connect API");
            expect(tcxFile.getAuthor().type).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("18.5.3.3");
            expect(tcxFile.getAuthor().langId).toEqual("en");
            expect(tcxFile.getAuthor().partNumber).toEqual("006-D2449-00");
            expect(tcxFile.getCreator().name).toEqual("Forerunner 230");
            expect(tcxFile.getCreator().type).toEqual("Device_t");
            expect(tcxFile.getCreator().productId).toEqual(2157);
            expect(tcxFile.getCreator().unitId).toEqual(3937251354);
            expect(tcxFile.getCreator().version).toEqual("7.70.0.0");
            expect(tcxFile.getCreator().isRuntastic).toEqual(false);
            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2018-04-05T03:23:17.000Z");
            expect(laps[4].startTime).toBe("2018-04-05T03:50:31.000Z");
            expect(laps[4].averageHeartRateBpm).toBe(144);
            expect(laps[4].maximumHeartRateBpm).toBe(149);
            expect(laps[4].maximumSpeed).toBe(2.687000036239624);
            expect(laps[4].totalTimeSeconds).toBe(445);
            expect(laps[4].calories).toBe(110);
            expect(laps[4].distanceMeters).toBe(1000);
            expect(laps[4].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[4].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[4].avgRunCadence).toBe(87);
            expect(laps[4].maxRunCadence).toBe(92);
            expect(laps[4].avgSpeed).toBe(2.249000072479248);
            expect(laps[4].intensity).toBe("Active");
            expect(laps[4].trackPoints[10].distanceMeters).toBe(4024.260009765625);
            expect(laps[4].trackPoints[10].speed).toBe(2.13700008392334);
            expect(laps[4].trackPoints[10].runCandence).toBe(87);
            expect(laps[4].trackPoints[10].candence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[4].trackPoints[10].heartRateBpm).toBe(141);
            expect(laps[4].trackPoints[10].time).toBe("2018-04-05T03:50:41.000Z");
            expect(laps[4].trackPoints[10].position.latitudeDegrees).toBe(40.5279478803277);
            expect(laps[4].trackPoints[10].position.longitudeDegrees).toBe(22.19791260547936);
            expect(laps[4].trackPoints[10].position.altitudeMeters).toBe(135.1999969482422);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με ποδηλασία tcx της Garmin", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'garmin-b.tcx');
        tcxFile.read(fname, (err, data) => {
            expect(data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Biking");
            expect(tcxFile.getId()).toEqual("2018-04-07T09:46:15.000Z");
            expect(tcxFile.getAuthor().name).toEqual("Garmin Connect API");
            expect(tcxFile.getAuthor().type).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("18.6.0.0");
            expect(tcxFile.getAuthor().langId).toEqual("en");
            expect(tcxFile.getAuthor().partNumber).toEqual("006-D2449-00");
            expect(tcxFile.getCreator().name).toEqual("Edge 520");
            expect(tcxFile.getCreator().type).toEqual("Device_t");
            expect(tcxFile.getCreator().productId).toEqual(2067);
            expect(tcxFile.getCreator().unitId).toEqual(3940583302);
            expect(tcxFile.getCreator().version).toEqual("12.50.0.0");
            expect(tcxFile.getCreator().isRuntastic).toEqual(false);
            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2018-04-07T09:46:15.000Z");
            expect(laps[4].startTime).toBe("2018-04-07T10:27:26.000Z");
            expect(laps[4].averageHeartRateBpm).toBe(139);
            expect(laps[4].maximumHeartRateBpm).toBe(146);
            expect(laps[4].maximumSpeed).toBe(11.67300033569336);
            expect(laps[4].totalTimeSeconds).toBe(733);
            expect(laps[4].calories).toBe(163);
            expect(laps[4].distanceMeters).toBe(5000);
            expect(laps[4].maxBikeCadence).toBe(67);
            expect(laps[4].steps).toBe(814);
            expect(laps[4].avgRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[4].maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[4].avgSpeed).toBe(6.823999881744385);
            expect(laps[4].intensity).toBe("Active");
            expect(laps[4].trackPoints[10].distanceMeters).toBe(20231.279296875);
            expect(laps[4].trackPoints[10].speed).toBe(11.392999649047852);
            expect(laps[4].trackPoints[10].runCandence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[4].trackPoints[10].candence).toBe(71);
            expect(laps[4].trackPoints[10].heartRateBpm).toBe(129);
            expect(laps[4].trackPoints[10].time).toBe("2018-04-07T10:27:45.000Z");
            expect(laps[4].trackPoints[10].position.latitudeDegrees).toBe(40.49690826795995);
            expect(laps[4].trackPoints[10].position.longitudeDegrees).toBe(22.286202795803547);
            expect(laps[4].trackPoints[10].position.altitudeMeters).toBe(43.599998474121094);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με τρέξιμο tcx της Tapiriik", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'tapirik.tcx');
        tcxFile.read(fname, (err, data) => {
            expect(data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Running");
            expect(tcxFile.getId()).toEqual("2017-10-29T07:11:03.000Z");
            expect(tcxFile.getAuthor().name).toEqual("tapiriik");
            expect(tcxFile.getAuthor().type).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("0.0.0.0");
            expect(tcxFile.getAuthor().langId).toEqual("en");
            expect(tcxFile.getAuthor().partNumber).toEqual("000-00000-00");
            expect(tcxFile.getCreator().isRuntastic).toEqual(false);

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
            expect(laps[0].trackPoints[1].runCandence).toBe(93);
            expect(laps[0].trackPoints[1].candence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[1].heartRateBpm).toBe(131);
            expect(laps[0].trackPoints[1].time).toBe("2017-10-29T07:12:28.000Z");
            expect(laps[0].trackPoints[1].position.latitudeDegrees).toBe(40.49249041825533);
            expect(laps[0].trackPoints[1].position.longitudeDegrees).toBe(22.257747910916805);
            expect(laps[0].trackPoints[1].position.altitudeMeters).toBe(33.599998474121094);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με ποδήλατο tcx της Tapiriik", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'tapirik-b.tcx');
        tcxFile.read(fname, (err, data) => {
            expect(data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Biking");
            expect(tcxFile.getId()).toEqual("2018-04-07T09:46:15.000Z");
            expect(tcxFile.getAuthor().name).toEqual("tapiriik");
            expect(tcxFile.getAuthor().type).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("0.0.0.0");
            expect(tcxFile.getAuthor().langId).toEqual("en");
            expect(tcxFile.getAuthor().partNumber).toEqual("000-00000-00");
            expect(tcxFile.getCreator().isRuntastic).toEqual(false);

            let laps = tcxFile.getLaps();
            expect(laps[0].startTime).toBe("2018-04-07T09:46:15.000Z");
            expect(laps[5].averageHeartRateBpm).toBe(139);
            expect(laps[5].maximumHeartRateBpm).toBe(143);
            expect(laps[5].maximumSpeed).toBe(9.6850004196167);
            expect(laps[5].totalTimeSeconds).toBe(703.762);
            expect(laps[5].calories).toBe(153);
            expect(laps[5].distanceMeters).toBe(5000);
            expect(laps[5].maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[5].steps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[5].avgRunCadence).toBe(66);
            expect(laps[5].maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[5].avgSpeed).toBe(7.105000019073486);
            expect(laps[5].intensity).toBe("Active");
            expect(laps[5].trackPoints[0].distanceMeters).toBe(25007.7109375);
            expect(laps[5].trackPoints[0].speed).toBe(4.992000102996827);
            expect(laps[5].trackPoints[0].runCandence).toBe(33);
            expect(laps[5].trackPoints[0].candence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[5].trackPoints[0].heartRateBpm).toBe(142);
            expect(laps[5].trackPoints[0].time).toBe("2018-04-07T10:39:39.000Z");
            expect(laps[5].trackPoints[0].position.latitudeDegrees).toBe(40.49748469144106);
            expect(laps[5].trackPoints[0].position.longitudeDegrees).toBe(22.24184475839138);
            expect(laps[5].trackPoints[0].position.altitudeMeters).toBe(85.19999694824219);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με τρέξιμο tcx της runtastic", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'runtastic.tcx');
        let author = new Author({});
        tcxFile.read(fname, (err, data) => {
            expect(data).not.toBe(null);
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
            expect(laps[0].trackPoints[3].runCandence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].candence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].heartRateBpm).toBe(97);
            expect(laps[0].trackPoints[3].time).toBe("2017-12-16T05:06:54.000Z");
            expect(laps[0].trackPoints[3].position.latitudeDegrees).toBe(40.52622985839844);
            expect(laps[0].trackPoints[3].position.longitudeDegrees).toBe(22.207685470581055);
            expect(laps[0].trackPoints[3].position.altitudeMeters).toBe(137.1999969482422);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με ποδήλατο tcx της runtastic", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'runtastic-b.tcx');
        let author = new Author({});
        tcxFile.read(fname, (err, data) => {
            expect(data).not.toBe(null);
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
            expect(laps[0].trackPoints[3].runCandence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].candence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].heartRateBpm).toBe(84);
            expect(laps[0].trackPoints[3].time).toBe("2018-04-07T09:46:21.000Z");
            expect(laps[0].trackPoints[3].position.latitudeDegrees).toBe(40.528228759765625);
            expect(laps[0].trackPoints[3].position.longitudeDegrees).toBe(22.209388732910156);
            expect(laps[0].trackPoints[3].position.altitudeMeters).toBe(107.5999984741211);
            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με τρέξιμο tcx της Polar", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'polar.tcx');
        tcxFile.read(fname, (err, data) => {
            expect(data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Running");
            expect(tcxFile.getId()).toEqual("2017-10-29T05:45:48.000Z");
            expect(tcxFile.getAuthor().name).toEqual("Polar Flow Mobile Viewer");
            expect(tcxFile.getAuthor().type).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("0.0");
            expect(tcxFile.getAuthor().langId).toEqual("EN");
            expect(tcxFile.getAuthor().partNumber).toEqual("XXX-XXXXX-XX");
            expect(tcxFile.getCreator().name).toEqual("Polar V800");
            expect(tcxFile.getCreator().type).toEqual("Device_t");
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
            expect(laps[0].trackPoints[3].runCandence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].candence).toBe(0);
            expect(laps[0].trackPoints[3].heartRateBpm).toBe(104);
            expect(laps[0].trackPoints[3].time).toBe("2017-10-29T05:45:52.000Z");
            expect(laps[0].trackPoints[3].position.latitudeDegrees).toBe(40.49050167);
            expect(laps[0].trackPoints[3].position.longitudeDegrees).toBe(22.25649667);
            expect(laps[0].trackPoints[3].position.altitudeMeters).toBe(52.274);

            done();
        });
    });

    it("\tΘα πρέπει να διαβάζει σωστά ένα αρχείο με ποδήλατο tcx της Polar", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'polar-b.tcx');
        tcxFile.read(fname, (err, data) => {
            expect(data).not.toBe(null);
            expect(err).toBe(null);
            expect(tcxFile.data).not.toEqual(null);
            expect(tcxFile.getSport()).toEqual("Biking");
            expect(tcxFile.getId()).toEqual("2018-04-11T15:21:10.000Z");
            expect(tcxFile.getAuthor().name).toEqual("Polar Flow Mobile Viewer");
            expect(tcxFile.getAuthor().type).toEqual("Application_t");
            expect(tcxFile.getAuthor().build).toEqual("0.0");
            expect(tcxFile.getAuthor().langId).toEqual("EN");
            expect(tcxFile.getAuthor().partNumber).toEqual("XXX-XXXXX-XX");
            expect(tcxFile.getCreator().name).toEqual("Polar V800");
            expect(tcxFile.getCreator().type).toEqual("Device_t");
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
            expect(laps[0].trackPoints[3].runCandence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].candence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(laps[0].trackPoints[3].heartRateBpm).toBe(86);
            expect(laps[0].trackPoints[3].time).toBe("2018-04-11T15:21:14.000Z");
            expect(laps[0].trackPoints[3].position.latitudeDegrees).toBe(40.52007333);
            expect(laps[0].trackPoints[3].position.longitudeDegrees).toBe(22.19930833);
            expect(laps[0].trackPoints[3].position.altitudeMeters).toBe(204.371);
            done();
        });
    });

    it("\tΘα πρέπει να ανοίγει ένα υπάρχον αρχείο που δεν είναι tcx και να γυρνάει κενό", (done) => {
        let tcxFile = new TcxFile();
        let fname = path.join(__dirname, 'tcxFileSpec.js');
        tcxFile.read(fname, (err, data) => {
            expect(data).toEqual(null);
            expect(err).not.toBe(null);
            expect(tcxFile.data).toEqual(null);
            expect(tcxFile.getSport()).toEqual(undefined);
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

