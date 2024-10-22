const express = require('express')

const router = express.Router()

const StatisticController = require('../controllers/Staistic.Controller')

router.get('/',StatisticController.getStatistic);

module.exports = router;