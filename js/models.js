App.INDEX = [
	{
		id: 544,
		title: 'Mr',
		name: 'Boo',
		relationship: 'father'
	},
	{
		id: 543,
		title: 'Mrs',
		name: 'Boo',
		relationship: 'mother'
	},
	{
		id: 545,
		title: 'Mast.',
		name: 'Boo',
		relationship: 'son'
	}
];

//Example of API integration
App.Tests = Ember.Object.extend();

App.Tests.reopenClass({
	all: function() {
      return $.getJSON("http://api.ihackernews.com/page?format=jsonp&callback=?").then(function(response) {
        var items = [];
 
        response.items.forEach( function (item) {
          items.push( App.Tests.create(item) );
        });
          return items;
      });
  }
});