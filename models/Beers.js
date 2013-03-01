var mongoose = require("mongoose");
var Schema = mongoose.Schema; 


var BeerCommentsSchema = new Schema({
	body: String,
	date: { type: Date, default: Date.now },
});

var BeerSchema = new Schema({
  beer_name:  String,
  brew_date: Date,
  rack_date: Date,
  bottle_date: Date,
  type: String,
  description:   String,
  recipe:   String,
  original_gravity: Number,
  rack_gravity: Number,
  final_gravity: Number,
  comments: [BeerCommentsSchema],
  beer_pictures: [{ url: String, description: String, date: { type: Date, default: Date.now } }],
});

BeerSchema.virtual('format_brew_date').get(function () {
	var date = new Date(this.brew_date);
	var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var curr_date = date.getDate();
	var curr_month = date.getMonth();
	var curr_year = date.getFullYear();
	
    return m_names[curr_month] + " " + curr_date + ", " + curr_year;
});

var Beer = mongoose.model('Beer', BeerSchema);

module.exports = {
  Beer: Beer
}