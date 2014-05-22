App.TestsRoute = Ember.Route.extend({
  model: function() {
  	return App.Tests.all();
  }
});

App.TestsTestRoute = Ember.Route.extend({
	model: function(params) {
		return App.Tests.all().find('id',params.id)
	}
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return App.INDEX; 
	}
	//setupController: function(controller,)
});

// App.IndexController = Ember.Controller.extend({

// });

// App.TestsController = Ember.Controller.extend({
// 	 day: function () {
// 	  	return(new Date().getDay().toDateString());
// 	  }.property()
// });