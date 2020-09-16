const express = require('express');

const emojis = require('./emojis');
const scrapper = require('./profile.scraper');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/analyse', scrapper);

module.exports = router;
