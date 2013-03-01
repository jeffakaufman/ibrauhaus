window.BeerCommentsView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "dbkclick .comment_body": "updateComment",
        "dblclick .comment-controls"  : "editComment",
        "click .new_comment_btn"   : "addComment",
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
      	this.$el.find(".view").hide();
      	this.$el.find(".edit").show();
    },
    
    updateComment: function(e) {
      if (e.keyCode == 13) {
      	this.$el.find(".view").show();
      	this.$el.find(".edit").hide();
      	console.log(this.model.get("comment_body"));
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
    }
});