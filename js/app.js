App = Ember.Application.create();

App.Router.map(function() {
  this.resource('tests', {path: '/tests'}, function() {
  	  this.route('test',{path: '/:id'});
  });
});