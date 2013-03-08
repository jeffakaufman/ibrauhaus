window.BeerCommentsView = Backbone.View.extend({
	className: "beercomments",
	
    initialize: function () {
    	_.bindAll(this);
        this.render();
    },

    render: function () {
        var beerComment = this.model;
        var len = beerComment.length;

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
        "focusout .comment_body"  : "saveComment",
    },
    
    editComment: function(e) {
		this.$el.find(".view").hide();
		this.$el.find(".comment_body").show();
    },
    
    saveComment: function(e) {
    	console.log('hello,sailor');
		this.$el.find(".view").show();
		this.$el.find(".comment_body").hide();
    },
    

});