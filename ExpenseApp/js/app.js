App = Ember.Application.create();

App.Store = DS.Store.extend({
    adapter: DS.RESTAdapter.extend({
        host: 'http://neilapi.azurewebsites.net',
        namespace: 'api',
        serializer: App.ApplicationSerializer
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
    },
    actions: {
        loading: function(transition) {
            var el = $('.spinner');
            el.show();
            transition.then(function() {
                el.hide();
            });
            return true;
        }
    }
});

App.IndexController = Ember.ArrayController.extend({
    actions: {
        saveExpense: function() {
            var name = this.get('name');
            var newExpense = this.get('store').createRecord('expense',{
                name: "Boo",
                amount: 20
            });
            newExpense.save();
            this.store.push('expense',newExpense);
        }
    }
});

App.Expense = DS.Model.extend({
    name: DS.attr('string'),
    amount: DS.attr('number')
});