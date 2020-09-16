const util = require('util');
const exec = util.promisify(require('child_process').exec);

const run = async (name) => {
    try {
        let {stderr, stdout} = await exec(`python3.6 ${__dirname}/../../../pyrnn/mn.py`);
        let gen = stdout.split('\n')[stdout.split('\n').length - 2].split('[\'')[1].split('\']')[0];  
        return gen;  
    } catch (err) {
        console.error(err);
        return null;
    };
}

module.exports = run;