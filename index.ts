import TcxFile from "../tcx-file-class/dist/classes/tcxFile"
import GpsPoint from "../tcx-file-class/dist/classes/geoPoint"
import Author from "../tcx-file-class/dist/classes/author"
import Creator from "../tcx-file-class/dist/classes/creator"
import Lap from "../tcx-file-class/dist/classes/lap"
import * as consts from "../tcx-file-class/dist/classes/consts"
import {iGeoPoint, 
    iXmlTrainingCenterDatabase,
    iXmlLap,
    iXmlTrackPoint,
    iXsiType,
    iXmlBuild,
    iXmlAuthor,
    iXmlCreator,
    iXmlActivity,
    iXmlTrack,
    iXmlActivities, 
    iXmlData} from "./src/classes/iFaces"

import GeoPoint from "../tcx-file-class/dist/classes/geoPoint"

export { 
    TcxFile,
    GpsPoint,
    Author,
    Creator,
    Lap,
    consts,
    GeoPoint, 
    iGeoPoint, 
    iXmlTrainingCenterDatabase,
    iXmlLap,
    iXmlTrackPoint,
    iXsiType,
    iXmlBuild,
    iXmlAuthor,
    iXmlCreator,
    iXmlActivity,
    iXmlTrack,
    iXmlActivities, 
    iXmlData   
}