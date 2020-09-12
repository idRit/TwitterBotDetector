const util = require('util');
const exec = util.promisify(require('child_process').exec);

const csv = require("csvtojson");

async function run(name) {
    try {
        const { stdout, stderr } = await exec(`GetOldTweets3 --username "${name}" --toptweets --maxtweets 50`);
        console.log('stdout:', stdout);
        
        let tweets = await csv().fromFile(__dirname +  "/output_got.csv");
        console.log(tweets); 

        
    } catch (err) {
        console.error(err);
    };
}

run("TinyCareBot");