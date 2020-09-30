let axios = require('axios');

async function parseBody(handle) {
    let mainBody = await axios.get("https://m.twitter.com/" + handle);
    let parsedBody = await mainBody.data.toString();
    return parsedBody;
}

async function getTweetsAxios(handle) {
    let fullBody = await parseBody(handle);
    let tweets = parseTweets(fullBody);
    return tweets;
}

async function parseTweets(fullBody) {
    let tweets = [];
    let startTag = fullBody.split('<div class="dir-ltr" dir="ltr">');
    let endTag = startTag.toString().split('\n</div>\n');
    endTag.forEach((tag) => {
        let extractedWord = tag.split('      ,  ')[1];
        if (typeof extractedWord !== 'undefined')
            if (extractedWord.length > 0)
                tweets.push({
                    tweet: extractedWord
                });
    });
    // tweets = tweets.map(el => el.tweet.split('<')[0]);
    tweets = tweets.map(el => el.tweet.replace(/(<([^>]+)>)/gi, ""));
    tweets = await formattedList(tweets);
    // console.log(tweets);
    return tweets;
}

async function formattedList(tweets) {
    let fList = [];
    tweets.forEach(el => fList.push({ text: el }));
    fList = fList.filter(el => el.text !== '');
    return fList;
}

// async function test() {
//     let res = await getTweetsAxios("lalalal");
//     console.log(res);
// }

// test();

module.exports = getTweetsAxios;