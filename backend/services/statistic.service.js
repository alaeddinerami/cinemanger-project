const Film = require("../models/Film.model");
const User = require("../models/User");
const Salle = require("../models/salle.model");
const Seance = require('../models/seance.model')

class StatisticService {
  async getStatistics() {
    try {
      const filmCount = await Film.countDocuments();

      const salleCount = await Salle.countDocuments();

      const userCount = await User.countDocuments({role:'client'});
        const seanceCount = await Seance.countDocuments()
      

      return {
        filmCount,
        salleCount,
        userCount,
        seanceCount,
      };
    } catch (error) {
      console.error("Error fetching statistics:", error);
      throw new Error("Could not retrieve statistics");
    }
  }
}

module.exports = new StatisticService();
