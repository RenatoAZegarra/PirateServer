// import mongoose to build the model 
const mongoose = require('mongoose');

// the model - the rules the entries need to follow
const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minlength: [3, "name must have at least 3 characters"]
    },
    image: {
      type: String,
      required: [true, "image url is required"],
      minlength: [6, "image url must have at least 6 characters"]
    },
    treasure: {
      type: Number,
      required: [true, "must give a number of treasures"],
      min: [1, "must have more than 1 treasure"]
    },
    phrase: {
      type: String,
      required: [true, "catch-phrase is required"],
      minlength: [3, "catch phrase must have at least 6 characters"]
    },
    position: {
      type: String,
      required: [true, "position is required"],
      default: 'Powder Monkey',
      validate: {
          validator: function (value) {
              return value !== 'Captain' || this.constructor.countDocuments({ position: 'Captain' }).exec().then((count) => count === 0);
          },
          message: 'There can only be one Captain.'
      }
    },
    pegleg: {
      type: Boolean,
      default: true
    },
    eyepatch: {
      type: Boolean,
      default: true
    },
    hookhand: {
      type: Boolean,
      default: true
    }
}, {timestamps: true})

const Pirate = mongoose.model('Pirate', PirateSchema);

module.exports = Pirate