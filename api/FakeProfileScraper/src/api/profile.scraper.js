const express = require('express');
const fetch = require('node-fetch');

const getUserTweets = require("./helper/scrapper");
const getMetaData = require("./helper/handle.metadata");

const router = express.Router();

router.get('/:tag', async (req, res) => {
    try {
        let tweets = await getUserTweets(req.params.tag);
        let metadata = await getMetaData(req.params.tag);
        res.json({
            metadata,
            tweets
        });
    } catch (error) {
        console.log(error);
        res.json({
            err: error
        });
    }
});

router.get('/tweets/:tag', async (req, res) => {
    try {
        let tweets = await getUserTweets(req.params.tag);
        res.json({
            tweets
        });
    } catch (error) {
        console.log(error);
        res.json({
            err: error
        });
    }
});

router.get('/all-data/:tag', async (req, res) => {
    try {
        let metadata = await getMetaData(req.params.tag);
        let tweets = await (await fetch('http://ec2-18-225-6-124.us-east-2.compute.amazonaws.com:4000/api/v1/scrapper/tweets/' + req.params.tag)).json();

        res.json({
            metadata,
            tweets
        });
    } catch (error) {
        console.log(error);
        res.json({
            err: error
        });
    }
});

module.exports = router;