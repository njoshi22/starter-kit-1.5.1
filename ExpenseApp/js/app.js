App = Ember.Application.create();

App.Store = DS.Store.extend({
    adapter: DS.RESTAdapter.extend({
        host: 'http://neilapi.azurewebsites.net',
        namespace: 'api',
        serializer: App.ApplicationSerializer
    })
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('expense');
    }
});


App.Expense = DS.Model.extend({
    name: DS.attr('string'),
    amount: DS.attr('number')
});

//App.Expense.FIXTURES = [
//        {
//            name: "Expense1",
//            amount: 18,
//            id: 1
//        }
//    ];