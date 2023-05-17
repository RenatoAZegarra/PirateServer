
// import the model here
const Pirate = require("../models/pirate.model")


// READ ALL
module.exports.readAll = (req, res) => {
    Pirate.find()
        .then((allDaPirates) => {
            res.json(allDaPirates)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

// READ ONE
module.exports.readOne = (req, res) => {
    Pirate.findOne({ _id: req.params.id })
        .then(oneSinglePirate => {
            res.json(oneSinglePirate)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

// CREATE
module.exports.create = (req, res) => {
    Pirate.create(req.body)
        .then(newlyCreatedPirate => {
            res.status(200).json(newlyCreatedPirate)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}

// UPDATE
module.exports.update = (req, res) => {
    Pirate.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedPirate => {
            res.status(200).json(updatedPirate)
        })
        .catch((err) => {
            res.status(400).json(err);
        });}

// DELETE
module.exports.delete = (req, res) => {
    Pirate.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}