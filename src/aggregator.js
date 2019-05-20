import {isValidDate, isValidNumber, formatDate} from './utils';
const es  = require('event-stream');


class Aggregator {
    constructor(inputStream, outputStream, window){
        this.reader = inputStream;
        this.writer = outputStream;
        this.window = window;
        this.timeDurationMap = fillDateMap(window);
        this.timeCountMap = fillDateMap(window);
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
        return data;
    } 

    exec(){
        this.reader
            .pipe(es.split())
            .pipe(es.mapSync(line=>{
                this.reader.pause();
                this.parse(line)
                    .then(this.validate.bind(this))
                    .then(this.updateMaps.bind(this))
                    .then(() => {
                       
                        setTimeout(()=> {
                            this.reader.resume();
                        }, 1);
            
                    })
            })).on('error', err=>{
                console.error(err);
            }).on('end', ()=>{
                setTimeout(()=>{
                    let out = this.results();
                    es.readArray(out).pipe(this.writer);
                }, 1)
                
            })
    }

    updateMaps(data){
        let {timeCountMap, timeDurationMap} = this;
        let {timestamp, duration} = data;
        let date = formatDate(timestamp);
        // add it if it is part of the window, ignore otherwise.
        if (timeCountMap[date] != null){
            timeCountMap[date] +=1;
            timeDurationMap[date] += duration;
        }
    }

    results() {
        let {timeCountMap, timeDurationMap} = this;
        return Object.keys(timeDurationMap).map(date=>{
            let avg_time = !timeCountMap[date] ? 0: timeDurationMap[date]/timeCountMap[date]
            let obj = {
                date: date,
                average_delivery_time : avg_time
            };
            return JSON.stringify(obj)+"\n"
        });
    }
}

const fillDateMap = (window)=>{
    let map = {};
    let now = new Date();
    now.setMinutes(now.getMinutes() - window);
    for(var i=window; i>0; i--){
        map[formatDate(now)] = 0;
        now.setMinutes(now.getMinutes() + 1)
    }
    return map
} 

export default Aggregator;