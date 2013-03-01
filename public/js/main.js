var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "beer"	: "list",
        "beer/page/:page"	: "list",
        "beer/add"         : "addBeer",
        "beer/:id"         : "beerDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var beerList = new BeerCollection();
        beerList.fetch({success: function(){
            $("#content").html(new BeerListView({model: beerList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    beerDetails: function (id) {
        var beer = new Beer({_id: id});
        beer.fetch({success: function(){
            $("#content").html(new BeerView({model: beer}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addBeer: function() {
        var beer = new Beer();
        $('#content').html(new BeerView({model: beer}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'BeerView','BeerListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});