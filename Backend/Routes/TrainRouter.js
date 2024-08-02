const express = require('express');
const { addTrain, getSeatAvailability, getAllTrains, getUniqueStations, deleteTrain } = require('../Controllers/TrainController');
const { adminMiddleware } = require('../Middlewares/authMiddleware');
const router = express.Router();

router.post('/create', addTrain);
router.get('/availability', getSeatAvailability);
router.get('/view', getAllTrains);
router.get('/stations',getUniqueStations)
router.delete('/:train_id', deleteTrain);
module.exports = router;
