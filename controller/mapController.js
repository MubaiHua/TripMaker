const Map = require('../model/mapModel');

exports.createMap = async (req, res) => {
    const {code, points} = req.body;
    try {
        await Map.create({
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

exports.updateMap = async (req, res) =>{
    const {code, points} = req.body;
    try {
        await Map.findOneAndUpdate({code: code}, {points: points});
        res.status(201).json({
            status: "success",
        });
    }
    catch(err){
        res.status(401).json(err.message);
    }
}

exports.getMap = async (req, res) => {
    const {code} = req.body;
    try {
        const mapRes = await Map.findOne({code: code}, {_id: 0, code: 0});
        res.status(201).json({
            points: mapRes.points
        });
    }
    catch(err){
        res.status(401).json(err.message);
    }
}

exports.findCode = async (req, res) =>{
    const {code} = req.body;
    try {
        const foundCode = await Map.findOne({code: code});
        if(foundCode!==null){
            res.status(201).json({
                status: "found"
            });
        }
        else{
            res.status(201).json({
                points: "not found"
            });
        }
    }    catch(err){
        res.status(401).json(err.message);
    }
}