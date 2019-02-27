# tcx-file-class

## Description

Reads a tcx file from garmin, polar, runtastic, tapiriik and introduce the class TcxFile wich has function to read all the values. It uses [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) package for parsing the file.

## Istallation

To install `tcx-file-class` use npm.
```npm install xml2js``` will do the job.

## Usage

- Import reference to TcxFile class like this:
```Typescript
import TcxFile from "tcx-file-class";

const tcxFile = new TcxFile();
tcxFile.read(fname, (err:string|undefined)=>{
    if (err){ //something went wrong
    }
    console.log(tcxFile.getLaps());
});
```
- If the class was created succesfully, the value `tcxFile.isReady` will be `true`.
- Functions:
    -   **getId():string** gives the Id of the file.
    -   **getSport():string** gives a string with the Sport
    -   **getAuthor():Author|null** give the Author class if any exists
    -   **getCreator():Creator|null** give the Creator class if any exists
    -   **getLaps:Array\<Lap> | Array\<null>** give the Laps class
    -   **save(filename: string, athleteId: number, zones: [number, number, number, number]|null, callback: (err: string) => void)** save to the file (in json format), whith the proper athlete Id. The optional heart rate zones are used to calculate the time in zones.

### Helper classes
These classes are created internally and is not recommended to create them by yourself.
#### Author
```Typescript
class Author {
    name: string;
    typeOfAuthor: string | any;
    build: string;
    langId: string;
    partNumber: string;
}
```
#### Creator
```Typescript
class Creator {
    name: string;
    typeOfCreator: string;
    productId: Number;
    unitId: Number;
    version: string;
    isRuntastic: boolean;
}
```
#### Laps
```Typescript
class Lap {
    startTime: string;
    averageHeartRateBpm: number;
    maximumHeartRateBpm: number;
    maximumSpeed: number;
    totalTimeSeconds: number;
    calories: number;
    distanceMeters: number;
    maxBikeCadence = consts.ERROR_NUMBER_VALUE;
    steps = consts.ERROR_NUMBER_VALUE;
    avgRunCadence = consts.ERROR_NUMBER_VALUE;
    maxRunCadence = consts.ERROR_NUMBER_VALUE;
    avgSpeed = consts.ERROR_NUMBER_VALUE;
    intensity = consts.ERROR_STRING_VALUE;
    trackPoints: Array<GpsPoint>;
    triggerMethod = consts.ERROR_STRING_VALUE;
}
```

#### GpsPoint
```Typescript
class GpsPoint {
    distanceMeters = consts.ERROR_NUMBER_VALUE;
    speed = consts.ERROR_NUMBER_VALUE;
    runCadence = consts.ERROR_NUMBER_VALUE;
    cadence = consts.ERROR_NUMBER_VALUE;
    heartRateBpm = consts.ERROR_NUMBER_VALUE;
    position: { latitudeDegrees: number, longitudeDegrees: number, altitudeMeters: number } =
        {
            latitudeDegrees: consts.ERROR_NUMBER_VALUE,
            longitudeDegrees: consts.ERROR_NUMBER_VALUE,
            altitudeMeters: consts.ERROR_NUMBER_VALUE
        }
    time = consts.ERROR_STRING_VALUE;

```
#### Consts used
```Typescript
const ERROR_NUMBER_VALUE = -1;
const ERROR_STRING_VALUE = "";
```
## Tests

Package has number of tests. Package is written in Typescript, so if you want to change something do it in `src\*.ts` files.

## Support
If something is wrong or you have something to propose please feel free to ask me (email me).