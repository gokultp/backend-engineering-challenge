import Aggregator from './aggregator'
const fs = require('fs');
const commandLineArgs = require('command-line-args')

const defCommands = ()=>([
    {name: 'window_size', alias: 'w', type: Number},
    {name: 'input_file', alias: 'i', type: String}
]);



const main =()=>{
    let args = commandLineArgs(defCommands());
    if (!args.input_file) {
        console.log("No filename provided");
        process.exit(1);
    }
    if (args.window_size == null) {
        console.log("No window size provided");
        process.exit(1);
    }
    if (args.window_size < 1) {
        console.log("Window size should be > 0");
        process.exit(1);
    }
    let input = fs.createReadStream(args.input_file);
    let output = process.stdout;
    let agg = new Aggregator(input, output, args.window_size);
    try {
        agg.exec();
    }catch(err){
        console.log(err)
        process.exit(2);
    }
}

main();