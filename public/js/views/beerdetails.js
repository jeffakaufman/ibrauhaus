window.BeerView = Backbone.View.extend({

    initialize: function () {
    	this.myCommentElement = this.$el.find(".edit");
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "click .new_comment_btn"   : "addComment",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteWine",        
        "dblclick .view"  : "editComment",
        "focusout .comment_body"  : "updateComment",
        "drop #picture" : "dropHandler",
        "dragover #picture" : "dragoverHandler", 
        "keypress .edit"  : "updateComment",
        "keypress .new_comment"  : "saveNewComment",
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
		var viewItem = 'div#'+id+'.view';
		var editItem = 'div#'+id+'.comment_body';
      	this.$el.find(viewItem).hide();
      	this.$el.find(editItem).show();
    },
    
    updateComment: function(e) {
    	//get el information for editted comment
    	var id = $(e.currentTarget).data("id");
		var viewItem = 'div#'+id+'.view';
		var editItem = 'div#'+id+'.comment_body';
		
		//update the comment in the model, then save the model
    	this.model.set('comments.'+event.target.id+'.body',event.target.value);
    	this.beforeSave();
    	
    	this.$el.find(viewItem).show();
      	this.$el.find(editItem).hide();
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
    
    addImage: function(e) {
      	console.log('hello,sailor');
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
        
        console.log(this.pictureFile);
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    },
    	dragoverHandler: function(event) {
        	event.preventDefault();
     } 

});