var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "beer"	            : "list",
        "beer/page/:page"	: "list",
        "beer/add"          : "addBeer",
        "beer/:id"          : "beerDetails",
        "beer/comments/:id" : "beerComments",
        "about"             : "about"
    },

    initialize: function () {
    	_.bindAll(this, 'render_beer_comments');
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
        console.log(beerList);
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
    
    beerComments: function(id) {
    	var beer = new Beer({_id: id});
        beer.fetch({success: function(){
        	//console.log(beer.toJSON());
        	var comments = beer.get("comments");
            $("#content").html(new BeerCommentsView({model: comments}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
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
    },
    
    render_beer_comments: function(comments) {
    	var beer = new Beer({_id: id});
        var beer_comments_view = new BeerCommentsView({model: beer.comments});
        this.$('div.comments_list').append($(beer_comments_view.render()));
    }
    
    

});

utils.loadTemplate(['HomeView', 'HeaderView', 'BeerView','BeerListItemView','BeerCommentItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});