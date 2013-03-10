window.BeerCommentsView = Backbone.View.extend({
	tagName: 'div',
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
	tagName: 'div',
    
    className: "beer-comments",

    initialize: function () {
        _.bindAll(this);
        this.update_body = this.$('update_body');
    },

    render: function () {
        $(this.el).html(this.template(this.model));
        this.delegateEvents();
        return this;
    },

    events: {
        "dblclick .view"  : "editComment",
    	//"focusout .comment_body"  : "saveComment",
    },
    
    editComment: function(e) {
		this.$el.find(".view").hide();
		this.$el.find(".comment_body").show();
    },
    
    saveComment: function(e) {
    	this.model.body = this.$el.find('input#body').val();	 	
    	console.log(this.model);
		/*this.$el.find(".view").show();
		this.$el.find(".comment_body").hide();*/
    },
    

});