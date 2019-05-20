
class Aggregator {
    constructor(inputStream, outputStream, window){
        this.reader = inputStream;
        this.writer = outputStream;
        this.window = window;
    }

    async parse(data){
        return JSON.parse(data);
    }

   

    exec(){
        
    }
}

export default Aggregator;