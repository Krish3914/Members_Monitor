const Visit = require('../model/Visits');

exports.getDailyVisits = async (req, res) => {
    try {
        const visits = await Visit.aggregate([
            { $group: { _id: "$visitDate", uniqueVisits: { $addToSet: "$ipAddress" } } },
            { $project: { _id: 1, uniqueVisits: { $size: "$uniqueVisits" } } },
            { $sort: { _id: -1 } } // Sort by date descending
        ]);
        res.json({ visits });
    } catch (err) {
        res.status(500).send('Error retrieving visits');
    }
};
