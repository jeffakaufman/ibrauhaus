window.BeerView = Backbone.View.extend({

    initialize: function () {
    	this.myCommentElement = this.$el.find(".edit");
    	var comments = this.model.get("comments");
        this.render(comments);
    },

    render: function (comments) {
        $(this.el).html(this.template(this.model.toJSON()));
        var beerComments = new BeerCommentsView({model: comments});
        beerComments.render();
        $(this.el).append(beerComments.el);
        //console.log(beerComments.el);
        this.$("#beer_comments_list").append(beerComments.el);
        return this;
    },

    events: {
        "change"        : "change",
        "dbkclick .comment_body": "updateComment",
        "dblclick .view"  : "editComment",
        "click .new_comment_btn"   : "addComment",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteWine",
        "drop #picture" : "dropHandler",
        "keypress .edit"  : "updateComment",
        "keypress .new_comment"  : "saveNewComment"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },
    
    editComment: function(e) {
		var id = $(e.currentTarget).data("id");
		var item = this.model.get("comments");
		var name = item.get(id);
		console.log(item);
    	/*console.log($(e.currentTarget));
      	$(this.currentTarget).data("id").$el.find(".view").hide();
      	this.$el.find(".comment_body").show();*/
    },
    
    updateComment: function(e) {
      if (e.keyCode == 13) {
      	this.$el.find(".view").show();
      	this.$el.find(".edit").hide();
      	console.log(this.model.get("comment_body"));
      }
    },
    
    addComment: function(e) {
      	this.$el.find(".new_comment_btn").hide();
      	this.$el.find(".new_comment").show();
    },
    
    saveNewComment: function(e) {
      if (e.keyCode == 13) {
      	this.$el.find(".new_comment").hide();
      	this.$el.find(".new_comment_btn").show();
      }
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveBeer();
        return false;
    },

    saveBeer: function () {
        var self = this;
        console.log('updating ');
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('beer/' + model.id, false);
                utils.showAlert('Success!', 'Beer saved successfully', 'alert-success');
                if(self.model.get("new_comment")) {
                	self.model.set({new_comment: ""});
                }
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    deleteWine: function () {
        this.model.destroy({
            success: function () {
                alert('Wine deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});