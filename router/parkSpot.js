
const { spotDetails, updateSpot } = require("../controller/parkspotController");
const authMiddlewares = require("../middlewares/authMiddlewares");
const router = require('express').Router()


router.get("/details", authMiddlewares, spotDetails);

router.post("/update", authMiddlewares, updateSpot);

module.exports = router;

