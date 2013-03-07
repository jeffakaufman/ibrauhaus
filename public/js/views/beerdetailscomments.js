window.BeerCommentsView = Backbone.View.extend({
	className: "beercomments",
	
    initialize: function () {
    	_.bindAll(this);
        //this.render();
    },

    render: function () {
        var beerComment = this.model;
        //console.log(this.model);
        var len = beerComment.length;
		//_.bindAll(beerComment);
        //$(this.el).html('<ul></ul>');

        for (var i = 0; i < len; i++) {
        	$(this.el).append(new BeerCommentItemView({model: beerComment[i]}).render().el);
        }
        return this;
    }
});

window.BeerCommentItemView = Backbone.View.extend({
    className: "beer-comments",

    initialize: function () {
        //this.model.bind("change", this.render, this);
        //this.model.bind("destroy", this.close, this);
        _.bindAll(this);
    },

    render: function () {
        $(this.el).html(this.template(this.model));
        return this;
    },

    events: {
        "dblclick .view"  : "editComment",
    },
    
    editComment: function(e) {
		this.$el.find(".view").hide();
		this.$el.find(".comment_body").show();
    	/*console.log($(e.currentTarget));
      	$(this.currentTarget).data("id").$el.find(".view").hide();
      	this.$el.find(".comment_body").show();*/
    },
    

});