window.Beer = Backbone.DeepModel.extend({
    urlRoot: "/beers",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};
        this.validators.beer_name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };
        this.validators.type = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a type"};
        };
        this.validators.description = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a description"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
   beer_name: "",
   brew_date: "",
   description: "",
   type: "",
   original_gravity: "",
   url:""
    }
});

var BeerComments = Backbone.RelationalModel.extend({
urlRoot: "/beers/comments",
    idAttribute: "_id",
    defaults: {
     _id:	null,
        body: "",
        date: null
    }
});

var BeerCommentsCollection = Backbone.Collection.extend({
    model: BeerComments,
url: "/beers/comments",
    idAttribute: "_id"
});

window.BeerCollection = Backbone.Collection.extend({
    model: Beer,
    url: "/beers"
});