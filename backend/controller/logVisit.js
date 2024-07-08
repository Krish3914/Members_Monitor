// const Visits = require('../model/Visits');

// const logVisit = async (req, res) => {
//   try {
//     const today = new Date().toISOString().slice(0, 10);
//     const visitRecord = await Visits.findOneAndUpdate(
//       { date: today },
//       { $inc: { count: 1 } },
//       { new: true, upsert: true }
//     );
//     res.status(200).json({ message: "Visit logged successfully", visitRecord });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to log visit", error });
//   }
// };

// module.exports = { logVisit };


const Visits = require('../model/Visits');

const logVisit = async (req, res) => {
  try {
    const referer = req.get('Referer');
    
    if (referer === 'https://membersmonitor.com') {
      const today = new Date().toISOString().slice(0, 10);
      const visitRecord = await Visits.findOneAndUpdate(
        { date: today },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      res.status(200).json({ message: "Visit logged successfully", visitRecord });
    } else {
      res.status(400).json({ message: "Visit not logged, incorrect referer" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to log visit", error });
  }
};

module.exports = { logVisit };
