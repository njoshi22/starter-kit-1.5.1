App = Ember.Application.create();

App.Store = DS.Store.extend({
    adapter: DS.RESTAdapter.create({
        host: 'http://neilapi.azurewebsites.net',
        namespace: 'api'
    })
});

//App.ApplicationSerializer = DS.RESTSerializer.extend({
//    normalizePayload: function(payload) {
//        return payload['data']
//    }
//});


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