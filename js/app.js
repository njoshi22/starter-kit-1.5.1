App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: 'api/v1',
	host: 'http://node-api.azurewebsites.net'
});

/* App.Store = DS.Store.extend({
	adapter: DS.RESTAdapter.create({
		//namespace: 'api/v1',
		url: 'http://node-api.azurewebsites.net/api/v1'
	})
}); */

DS.RESTAdapter.reopen({
	namespace: 'api/v1',
	host: 'http://node-api.azurewebsites.net'
});


App.Router.map(function() {
  this.resource('tests', {path: '/tests'});
  this.resource('warehouses', function() {
  	this.route('warehouse', {path: '/:id'});
  	});
  });