import {isValidDate, isValidNumber} from './utils';

class Aggregator {
    constructor(inputStream, outputStream, window){
        this.reader = inputStream;
        this.writer = outputStream;
        this.window = window;
    }

    async parse(data){
        return JSON.parse(data);
    }

    async validate(data){
        if (!isValidDate(data.timestamp)){
            throw new Error("Invalid value for the field timestamp")
        }
        if (!isValidNumber(data.duration)){
            throw new Error("Invalid value for the field duration");
        }
        return true;
    } 

    exec(){
        
    }
}

export default Aggregator;