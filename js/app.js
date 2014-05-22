App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: '/api/v1/',
	host: 'http://node-api.azurewebsites.net'
});

DS.RESTAdapter.reopen({
	namespace: '/api/v1/',
	host: 'http://node-api.azurewebsites.net'
});

App.Router.map(function() {
  this.resource('tests', {path: '/tests'}, function() {
  });
  this.resource('warehouses', function() {
  	this.route('warehouse', {path: '/:id'});
  });
});