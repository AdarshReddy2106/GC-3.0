const router = require("express").Router();
const controller = require("../controllers/schedule.controller");

router.get("/days", controller.getDays);
router.get("/:day", controller.getScheduleByDay);

module.exports = router;
