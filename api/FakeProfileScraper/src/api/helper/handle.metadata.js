const fetch = require("node-fetch");

module.exports = async (handle) => {
    let res = await (await fetch("https://api.twitter.com/1.1/users/show.json?screen_name=" + handle, {
        headers: {
            "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAKOPHQEAAAAAsSGFMXgnwd7LFvbqeBhfWdc55gk%3DzEuis41JMCAMVG0sgd895Bt6cXxFfRRAUw0x4YjtiRQ4D6U8Ua"
        }
    })).json();
    return res;
}