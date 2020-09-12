const express = require('express');

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

module.exports = router;