const Map = require('../model/mapModel');

exports.createMap = async (req, res) => {
    const {code} = req.body;
    try {
        const newMap = await Map.create({
            code: code
        });
        res.status(201).json({
            status: "success",
        });
    }
    catch(err){
        res.status(401).json(err.message);
    }
}