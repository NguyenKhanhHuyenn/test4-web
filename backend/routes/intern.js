const express = require('express');
const middlewareController = require("../controllers/middlewareController");
const internControllers = require("../controllers/internControllers");
const router = express.Router();

router.get("/student/internship-register/collab/positions", middlewareController.verifyToken, internControllers.getAllPositions);

router.post("/internship-mana/position-list", middlewareController.verifyTokenAndAdmin, internControllers.postAPosition);

module.exports = router;