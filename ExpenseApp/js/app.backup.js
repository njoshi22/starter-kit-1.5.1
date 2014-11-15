App = Ember.Application.create();

// App.ApplicationStore = DS.Store.extend({
//     adapter: DS.RESTAdapter.extend({
//         host: 'http://neilapi.azurewebsites.net',
//         namespace: 'api',
//         serializer: App.ApplicationSerializer
//     })
// });

App.ApplicationAdapter = DS.RESTAdapter.extend({
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
    },
    someArray: function() {
            var arr = Ember.A();
            this.get('model').forEach(function(item) {
                console.log(item);
                arr.pushObject({label: item.name, value: item.amount, type: "expense"});
            });
            return arr;
        }.property('model')
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
            // this.store.push('expense',newExpense);
        },
        deleteExpense: function(expense) {
            expense.deleteRecord();
            expense.save();
        }
    }
});

App.Expense = DS.Model.extend({
    name: DS.attr('string'),
    amount: DS.attr('number')
});

// App.ApplicationController = Ember.Controller.extend({
//   content: function() {
//         return retarr = this.store.find('expense').toArray();
//     }.property(this.store.find('expense'))
// });


/*   // sumExpenses: function() {
  //           var expenses = this.store.find('expense');
  //           var res = 0;
  //           var amounts = expenses.mapBy('amount');
  //           amounts.forEach(function(item){
  //               res += item;
  //           });

  //           return res;
  //       }.property('expenses.@each.amount')
  //   } */

  // [
  //   {
  //       "label": "Equity",
  //       "value": 12935781.176999997,
  //       "type": "money"
  //   },
  //   {
  //       "label": "Real Assets",
  //       "value": 10475849.276172025,
  //       "type": "money"
  //   },
  //   {
  //       "label": "Fixed Income",
  //       "value": 8231078.16438347,
  //       "type": "money"
  //   },
  //   {
  //       "label": "Cash & Cash Equivalent",
  //       "value": 5403418.115000006,
  //       "type": "money"
  //   },
  //   {
  //       "label": "Hedge Fund",
  //       "value": 1621341.246006786,
  //       "type": "money"
  //   },
  //   {
  //       "label": "Private Equity",
  //       "value": 1574677.59,
  //       "type": "money"
  //   }
  // ]