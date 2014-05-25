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

//Ember Data example
var attr = DS.attr;

App.Warehouse = DS.Model.extend({
	whid: attr('string'),
	name: attr('string'),
	location: attr('string')
});

App.WarehouseSerializer = DS.RESTSerializer.extend({
   primaryKey: 'whid'
  //   normalize: function(type,hash,property) {
  //   	hash.id = hash.whid;
		// return this._super(type,hash,property);
  //   }
});

App.Product = DS.Model.extend({
	productid: attr('string')
});






// //Example of API integration with Promises
// App.Tests = Ember.Object.extend();

// //Original
// App.Tests.reopenClass({
// 	all: function() {
//       return $.getJSON("http://api.ihackernews.com/page?format=json").then(function(response) {
//         var items = [];
 
//         response.items.forEach( function (item) {
//           items.push( App.Tests.create(item) );
//         });
//           return items;
//       });
//   }
// });