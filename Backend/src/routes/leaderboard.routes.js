const router = require("express").Router();
const controller = require("../controllers/leaderboard.controller");

router.get("/", controller.getTables);
router.get("/:table", controller.getLeaderboard);

module.exports = router;
