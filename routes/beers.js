var BeerModel = require("../models/Beers").Beer;

// handler for homepage
exports.add_beer = function(req, res) {
    res.render('new_beer', { title: 'Add New Beer', beer_name: ''});
};

// handler for form submitted from homepage
exports.add_beer_post_handler = function(req, res) {
    beer_name = req.body.beer_name;
    //var beer_image = req.files.beer_picture.name;
	//upload a picture if there is one
    /*if (beer_image) {
    	var tmp_path = req.files.beer_picture.path;
    	console.log(beer_image);
    	// set where the file should actually exists - in this case it is in the "images" directory
    	var target_path = './public/images/' + req.files.beer_picture.name;
    	// move the file from the temporary location to the intended location
    	var fs = require('fs');
    	fs.rename(tmp_path, target_path, function(err) {
        	if (!err) {
     			return console.log("created");
     		} else {
     			return console.log(err);
     		}
        	// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        	fs.unlink(tmp_path, function() {
        	    if (err) throw err;
        	    console.log('File uploaded to: ' + target_path + ' - ' + req.files.beer_picture.size + ' bytes');
        	});
    	});
    }*/
    
    //save the information
    var beer = new BeerModel({
     	title: req.body.title,
     	description: req.body.description,
     	style: req.body.style,
  		beer_name:  req.body.beer_name,
  		brew_date: req.body.brew_date,
  		type: req.body.type,
  		description:   req.body.description,
  		recipe:   req.body.recipe,
  		original_gravity: req.body.original_gravity,
	});
	
	/*
	if (beer_image) {
		beer.beer_pictures = [{url: beer_image}];
	}
	*/
	if (req.body.comment) {
		beer.comments = [{body: req.body.comment}];
	}

    beer.save(function (err) {
     	if (!err) {
     		return console.log("created");
     	} else {
     		return console.log(err);
     	}
	});
	return res.send(beer); 
    
    //res.render('new_beer', { title: 'Add New Beer', beer_name: beer_name});
};

// handler for displaying the beers
exports.beerlist = function(req, res) {
	BeerModel.find(function (err, beers) {
		if (!err) {		
			res.send(beers);
			//res.render('beer_list',{title: 'iBrau Cellar',beers : beers});
		} else {
			console.log(err);
		}
	}); 
};

// handler for displaying individual beers
exports.item = function(req, res) {
	BeerModel.findById(req.params.id, function (err, beers) {
		if (!err) {
			res.send(beers);
		} else {
			console.log(err);
		}
	});
};



// handler for updating individual beers
exports.updateBeer = function(req, res) {
	BeerModel.findById(req.params.id, function (err, beer) {
	    beer.beer_name = req.body.beer_name;
  		beer.description = req.body.description,
     	beer.type = req.body.type;
  		beer.original_gravity = req.body.original_gravity;
  		if (req.body.new_comment){
    		console.log('adding comment: '+req.body.new_comment);
    		beer.comments.push( {body:req.body.new_comment});
    	}
		beer.save(function (err) {
			if (!err) {
				    console.log('Updating beer: ' + req.params.id);
				    console.log(JSON.stringify(beer));
			} else {
			console.log(err);
			}
				res.send(beer);
			});
		});
}
    
    


// handler for showing simple pages
exports.page = function(req, res) {
    var name = req.query.name;
    var contents = {
        about: 'Ninja Store sells the coolest ninja stuff in the world. Anyone shopping here is cool.',
        contact: 'You can contact us at <address><strong>Ninja Store</strong>,<br>1, World Ninja Headquarters,<br>Ninja Avenue,<br>NIN80B7-JP,<br>Nihongo.</address>'
    };
    res.render('page', { title: 'Ninja Store - ' + name, username: req.session.username, content:contents[name] });
};
