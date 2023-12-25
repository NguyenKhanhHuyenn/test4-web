const express = require('express');
const middlewareController = require("../controllers/middlewareController");
const internControllers = require("../controllers/internControllers");
const router = express.Router();

router.get("/student/internship-register/collab/positions", middlewareController.verifyToken, internControllers.getAllPositions);

router.post("/internship-mana/position-list", middlewareController.verifyTokenAndAdmin, internControllers.postAPosition);

router.post("/internship-mana/position-list/matching-request", middlewareController.verifyTokenAndAdmin, internControllers.matchingIntern);

router.get("/internship-mana/register-list", middlewareController.verifyTokenAndAdmin, internControllers.getAllPromise);

router.get("/internship-mana/matching-result", middlewareController.verifyTokenAndAdmin, internControllers.getMatchingResults);

router.get("/student/internship-register/collab/result/:id", middlewareController.verifyToken, internControllers.getStudentMatchingResults)

module.exports = router;