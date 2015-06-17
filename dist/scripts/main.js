Parse.initialize("CGiH8mU7FWqmYhm2HXL1KZ2yusLAYc6uLGLxWKOE", "pFMs3sr9uuLC8ITdi6mK2unnU4xVARJ97grozseD");


var HomeView = Parse.View.extend({
  template: _.template($("#home-template").html()),
  initialize: function(){
    this.render();
    $(".container").html(this.el);
  },
  render: function(){
    this.$el.html(this.template(this.model));
  }
});

var AccountView = Parse.View.extend({
  template: _.template($("#account-template").html()),
  initialize: function(){
    this.render();
    $(".container").html(this.el);
  },
  render: function(){
    this.$el.html(this.template(this.model));
  }
});

var SignupView = Parse.View.extend({
  template: _.template($("#signup-template").html()),
  initialize: function(){
    this.render();
    $(".container").html(this.el);
  },
  render: function(){
    this.$el.html(this.template(this.model));
  },
  events: {
      "submit form.signup-form": "signUp"
  },
  signUp: function(){
    var self = this;
    var username = this.$("#signup-username").val();
    var password = this.$("#signup-password").val();
    Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
      success: function(user) {
        new AccountView();
        delete self;
      },
      error: function(user, error) {
        self.$(".signup-form .error").html(error.message).show();
      }
    });
    return false;
  }
});


var LoginView = Parse.View.extend({
  template: _.template($("#login-template").html()),
  initialize: function(){
    this.render();
    $(".container").html(this.el);
  },
  render: function(){
    this.$el.html(this.template(this.model));
  },
  events:{
    "submit form.login-form": "logIn"
  },
  logIn: function(e){
    var self = this;
    var username = this.$("#login-username").val();
    var password = this.$("#login-password").val();

    Parse.User.logIn(username, password, {
      success: function(user) {
        new AccountView();
        delete self;
      },

      error: function(user, error) {
        self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
      }
    });

    return false;
  }
});


var ParseRouter = Parse.Router.extend({
  routes:{
    "":"home",
    "signup":"signup",
    "login": "login",
    "account": "account"
  },
  home: function (){
    new HomeView();
  },
  signup: function(){
    new SignupView();
  },
  login: function(){
    new LoginView();
  },
  account: function(){
    new AccountView();
  }
});

new ParseRouter();

Parse.history.start();
