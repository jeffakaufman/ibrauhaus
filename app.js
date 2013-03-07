
/**
 * Module dependencies.
 */

var express = require('express')
  , beers = require('./routes/beers')
  , user = require('./routes/list')
  , http = require('http')
  , path = require('path')
  ,  sys = require('sys')
  ,  fs = require('fs')
  ,  mongoose = require('mongoose'); 
var app = express();


// Database
//mongoose.connect('mongodb://localhost/nodebeer'); 
mongoose.connect('mongodb://nodejitsu:c0accfe232007eefdb21f99349231bab@linus.mongohq.com:10076/nodejitsudb8966990062'); 

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/', beer.add_beer);

app.post('/beers', beers.add_beer_post_handler);
//app.post('/beers', beers.updateBeer);

app.get('/users', user.list);


// display the list of beers
app.get('/beers', beers.beerlist);
// show individual beer
app.get('/beers/:id', beers.item);
// show individual beer
app.get('/beers/comments/:id', beers.beerComments);
// update individual beer
app.put('/beers/:id', beers.updateBeer);

// show general pages
app.get('/page', beers.page);

app.get('/logout', function(req, res) {
    // delete the session variable
    delete req.session.username;
    // redirect user to homepage
    res.redirect('/');
});



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
