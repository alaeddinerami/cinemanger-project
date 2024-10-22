const StatisticService = require('../services/statistic.service');

class StatisticController {
    async getStatistic(req, res) {
        try {
            const statistic = await StatisticService.getStatistics(); 
            res.status(200).json(statistic); 
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new StatisticController();
