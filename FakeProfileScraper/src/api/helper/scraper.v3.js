const fetch = require("node-fetch");

const {
    twitterAuth, 
    twitterURL
} = require('../../../config');

// module.exports = async (handle) => {
let run = async (handle) => {
    // let res = await (await fetch(twitterURL + handle, {
    let res = await (await fetch("https://api.twitter.com/2/tweets/search/recent?query=from:" + handle, {
        headers: {
            "authorization": twitterAuth
        }
    })).json();
    if (res.meta.result_count === 0) {
        return [];
    }
    console.log(res.data);
    return res.data;
}

module.exports = run;

// console.log(run("botskies1"));
