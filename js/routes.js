App.TestsRoute = Ember.Route.extend({
  model: function() {
  	// return App.Tests.all();
  	return Ember.$.getJSON('http://node-api.azurewebsites.net/api/v1/warehouses');
  }
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return App.INDEX; 
	}
	//setupController: function(controller,)
});

App.WarehousesRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('warehouse');
	}
});

// App.WarehousesWarehouseRoute = Ember.Route.extend({
// 	model: function(params) {
// 		return this.store.findBy('warehouse',params.whid);
// 	}
// });

// App.IndexController = Ember.Controller.extend({

// });

// App.TestsController = Ember.Controller.extend({
// 	 day: function () {
// 	  	return(new Date().getDay().toDateString());
// 	  }.property()
// });