const Train = require('../Models/Train');

exports.addTrain = async (req, res) => {
    const { train_name, source, destination, seat_capacity, available_seats, arrival_time_at_source, arrival_time_at_destination } = req.body;
    try {
        const train = new Train({ train_name, source, destination, seat_capacity, available_seats, arrival_time_at_source, arrival_time_at_destination });
        await train.save();
        res.status(200).json({ message: "Train added successfully", train_id: train._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSeatAvailability = async (req, res) => {
    const { source, destination } = req.query;

    
    const formattedSource = source.trim().toLowerCase();
    const formattedDestination = destination.trim().toLowerCase();

    try {
        const trains = await Train.find({
            source: { $regex: new RegExp(`^${formattedSource}$`, 'i') },
            destination: { $regex: new RegExp(`^${formattedDestination}$`, 'i') }
        });

        if (trains.length === 0) {
            return res.status(404).json({ message: "No trains available between the entered stations." });
        }

        res.status(200).json(trains.map(train => ({
            train_id: train._id,
            train_name: train.train_name,
            available_seats: train.available_seats
        })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTrains = async (req, res) => {
    try {
      const trains = await Train.find(); 
      res.status(200).json(trains);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getUniqueStations = async (req, res) => {
    try {
  
      const sources = await Train.distinct('source');
      const destinations = await Train.distinct('destination');
  
      res.status(200).json({ sources, destinations });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.deleteTrain = async (req, res) => {
    const { train_id } = req.params;
    try {
        await Train.findByIdAndDelete(train_id);
        res.status(200).json({ message: "Train deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
