const express = require("express");
const router = express.Router();
const SeanceController = require("../controllers/Seance.controller");

router.get("/", SeanceController.getAll);
router.get("/:id", SeanceController.getSeanceById);
router.post("/", SeanceController.create);
router.put("/:id", SeanceController.update);
router.delete("/:id", SeanceController.delete);

module.exports = router;
