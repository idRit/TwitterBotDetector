const util = require('util');
const exec = util.promisify(require('child_process').exec);

const csv = require("csvtojson");

const run = async (name) => {
    try {
        await exec(`GetOldTweets3 --username "${name}" --toptweets --maxtweets 50`);
        let tweets = await csv().fromFile(__dirname +  "/../../../output_got.csv");
        return tweets;        
    } catch (err) {
        console.error(err);
    };
}

module.exports = run;