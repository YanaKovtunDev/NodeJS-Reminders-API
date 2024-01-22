const router = require('express').Router();
const controller = require('../controllers/reminders');


router.post("/", controller.createReminder);
router.get("/", controller.getAllReminders);
router.get("/:id", controller.getReminderById);
router.delete("/:id", controller.changeReminder);
router.put("/:id", controller.changeReminder);
router.patch("/:id", controller.changeReminder);
module.exports = router;
