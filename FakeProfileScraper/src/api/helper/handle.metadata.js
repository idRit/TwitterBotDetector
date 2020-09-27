const fetch = require("node-fetch");

const {
    twitterAuth, 
    twitterURL
} = require('../../../config');

module.exports = async (handle) => {
    let res = await (await fetch(twitterURL + handle, {
        headers: {
            "authorization": twitterAuth
        }
    })).json();
    return res;
}