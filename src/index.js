import Aggregator from './aggregator'
const fs = require('fs');
const es  = require('event-stream');


const main =()=>{
    let input = fs.createReadStream("/tmp/test");
    let output = process.stdout;
    let agg = new Aggregator(input, output, 10);
    agg.exec();
}

main();