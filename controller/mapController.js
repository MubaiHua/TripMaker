const Map = require('../model/mapModel');

exports.createMap = async (req, res) => {
    const {code, points} = req.body;
    try {
        const newMap = await Map.create({
            code: code,
            points: points
        });
        res.status(201).json({
            status: "success",
        });
    }
    catch(err){
        res.status(401).json(err.message);
    }
}