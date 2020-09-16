const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const levenshtein = require('js-levenshtein');
const stringSimilarity = require('string-similarity');

const getUserTweets = require("./helper/scrapper");
const getMetaData = require("./helper/handle.metadata");
const getGeneratedTweet = require("./helper/generate.tweet");

const {
  randomInt,
  getBiggerStringLength,
  calculateAverage,
  calculateMax,
  calculateMin
} = require('./helper/util');

const router = express.Router();

router.get("/:tag", async (req, res) => {
  try {
    let tweets = await getUserTweets(req.params.tag);
    let metadata = await getMetaData(req.params.tag);
    res.json({
      metadata,
      tweets,
    });
  } catch (error) {
    console.log(error);
    res.json({
      err: error,
    });
  }
});

router.get("/tweets/:tag", async (req, res) => {
  try {
    let tweets = await getUserTweets(req.params.tag);
    let str = "";
    tweets.forEach((el) => {
      str += el.text + "\n";
    });
    // let path = __dirname + "/../../pyrnn/s.txt";
    // let path = __dirname + "./helper/s.txt";
    let path = __dirname + "/../../s.txt";
    fs.writeFileSync(path, str, { encoding: "ascii" });
    res.json({
      tweets,
    });
  } catch (error) {
    console.log(error);
    res.json({
      err: error,
    });
  }
});

router.get("/all-data/:tag", async (req, res) => {
  try {
    let metadata = await getMetaData(req.params.tag);
    let tweets = await (
      await fetch(
        "http://ec2-18-225-6-124.us-east-2.compute.amazonaws.com:4000/api/v1/scrapper/tweets/" +
        req.params.tag
      )
    ).json();
    tweets = tweets.tweets;

    res.json({
      metadata,
      tweets,
    });
  } catch (error) {
    console.log(error);
    res.json({
      err: error,
    });
  }
});

router.get('/analyse-handle/ec2/:tag', async (req, res) => {
  try {
    let tweets = await getUserTweets(req.params.tag);

    let str = "";
    tweets.forEach((el) => {
      str += el.text + "\n";
    });
    // let path = __dirname + "/../../pyrnn/s.txt";
    let path = __dirname + "/../../s.txt";
    // let path = __dirname + "/s.txt";
    fs.writeFileSync(path, str, { encoding: "ascii" });
    console.log("File written on path: \n" + path);

    let metadata = await getMetaData(req.params.tag);

    let generated = await getGeneratedTweet(req.params.tag);
    console.log("Generated: " + generated);
    while (generated == null) generated = await getGeneratedTweet(req.params.tag);

    let randomSelection = tweets[randomInt(tweets.length - 1)];

    let DCsimilarityRand = stringSimilarity.compareTwoStrings(generated, randomSelection.text) / 0.8;
    let LVDsimilarityRand = (0.5 -
      ((levenshtein(generated, randomSelection.text) /
        getBiggerStringLength(generated, randomSelection.text) - 0.5))
    ) / 0.66;

    let DCsimMean = [], LVDsimMean = [], rtMean = [], fvMean = [];

    tweets.forEach(tweet => {
      LVDsimMean.push(
        (0.5 -
          ((levenshtein(generated, tweet.text) /
            getBiggerStringLength(generated, tweet.text) - 0.5))
        ) / 0.66
      );
      DCsimMean.push(
        stringSimilarity.compareTwoStrings(generated, tweet.text) / 0.8
      );
      rtMean.push(parseInt(tweet.retweets));
      fvMean.push(parseInt(tweet.favorites));
    });

    let responsePacket = {
      dicesCoefficient: {
        dcRandomSelection: DCsimilarityRand,
        dcMean: calculateAverage(DCsimMean),
      },
      levenshteinDistance: {
        LDRatioRandomSelection: LVDsimilarityRand,
        LDRatioMean: calculateAverage(LVDsimMean),
      },
      retweetStats: {
        averageRetweets: Math.floor(calculateAverage(rtMean)),
        lowestRetweet: calculateMin(rtMean),
        highestRetweet: calculateMax(rtMean),
      },
      favStats: {
        averageFavourites: Math.floor(calculateAverage(fvMean)),
        lowestFavoutite: calculateMin(fvMean),
        highestFavourite: calculateMax(fvMean),
      },
      generatedTweet: generated,
      botScore: calculateAverage([
        DCsimilarityRand,
        calculateAverage(DCsimMean),
        LVDsimilarityRand,
        calculateAverage(LVDsimMean)
      ]),
    };

    return res.json(responsePacket);
  } catch (error) {
    console.log(error);
    res.json({
      err: error,
    });
  }
});

router.get('/analyse-handle/:handle', async (req, res) => {
  let tweets = await (
    await fetch(
      "http://ec2-18-225-6-124.us-east-2.compute.amazonaws.com:4000/api/v1/scrapper/analyse-handle/ec2/" +
      req.params.tag
    )
  ).json();
  return res.json(tweets);
});


module.exports = router;

