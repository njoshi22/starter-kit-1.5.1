App = Ember.Application.create();

App.ApplicationStore = DS.Store.extend({
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
                name: name,
                amount: 20
            });
            newExpense.save();
            this.store.push('expense',newExpense);
        },
        deleteExpense: function(expense) {
            expense.deleteRecord();
            expense.save();
        },
        sumExpenses: function() {
            var expenses = this.store.find('expense');
            var res = 0;
            var amounts = expenses.mapBy('amount');
            amounts.forEach(function(item){
                res += item;
            });

            return res;
        }.property('expenses.@each.amount')
    }
});

App.Expense = DS.Model.extend({
    name: DS.attr('string'),
    amount: DS.attr('number')
});