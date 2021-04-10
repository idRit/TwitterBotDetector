const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const levenshtein = require('js-levenshtein');
const stringSimilarity = require('string-similarity');

const getMetaData = require("./helper/handle.metadata");
const getGeneratedTweet = require("./helper/generate.tweet");
const getUserTweets2 = require('./helper/scraper.v2');
const getUserTweets3 = require('./helper/scraper.v3');

const {
    randomInt,
    getBiggerStringLength,
    calculateAverage,
    calculateMax,
    calculateMin,
    capCheck
} = require('./helper/util');

const {
    ec2URL
} = require('../../config');

const router = express.Router();

router.get('/analyse-handle/ec2/:tag', async(req, res) => {
    try {
        let metadata = await getMetaData(req.params.tag);
        if (metadata.errors) return res.json(metadata.errors[0]);

        let tweets = await getUserTweets3(req.params.tag);

        if (tweets.length === 0) return res.json({
            code: 90,
            message: "User has no tweets!!"
        });

        let str = "";
        tweets.forEach((el) => {
            str += el.text + "\n";
        });

        let path = __dirname + "/../../s.txt";

        fs.writeFileSync(path, str, { encoding: "ascii" });
        console.log("File written on path: \n" + path);

        let generated = await getGeneratedTweet(req.params.tag);
        while (generated == null) generated = await getGeneratedTweet(req.params.tag);
        console.log("Generated: " + generated);

        let randomSelection = tweets[randomInt(tweets.length - 1)];

        let DCsimilarityRand = stringSimilarity.compareTwoStrings(generated, randomSelection.text) / 0.3;
        let LVDsimilarityRand = (0.5 -
            ((levenshtein(generated, randomSelection.text) /
                getBiggerStringLength(generated, randomSelection.text) - 0.5))
        ) / 0.33;

        let DCsimMean = [],
            LVDsimMean = [];

        tweets.forEach(tweet => {
            LVDsimMean.push(
                (0.5 -
                    ((levenshtein(generated, tweet.text) /
                        getBiggerStringLength(generated, tweet.text) - 0.5))
                ) / 0.33
            );
            DCsimMean.push(
                stringSimilarity.compareTwoStrings(generated, tweet.text) / 0.3
            );
        });

        let responsePacket = {
            name: metadata.name,
            desc: metadata.description,
            dicesCoefficient: {
                dcRandomSelection: capCheck(DCsimilarityRand),
                dcMean: capCheck(calculateAverage(DCsimMean)),
            },
            levenshteinDistance: {
                LDRatioRandomSelection: capCheck(LVDsimilarityRand),
                LDRatioMean: capCheck(calculateAverage(LVDsimMean)),
            },
            fakeScore: capCheck(calculateAverage([
                calculateAverage(DCsimMean),
                calculateAverage(LVDsimMean)
            ])),
        };

        return res.json(responsePacket);
    } catch (error) {
        console.log(error);
        res.json({
            err: error,
        });
    }
});

router.get('/analyse-handle/:handle', async(req, res) => {
    let tweets = await (await fetch(ec2URL + req.params.handle)).json();
    return res.json(tweets);
});


module.exports = router;