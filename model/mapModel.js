const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapSchema = new Schema(
  {
    city: String,
    lat: String,
    lng: String,
    country: String,
    iso2: String,
    admin_name: String,
    capital: String,
    population: String,
    population_proper: String,
  },
  { collection: "maps" }
);

const mapModel = mongoose.model("Map", mapSchema);
module.exports = mapModel;
