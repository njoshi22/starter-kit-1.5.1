App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://neilapi.azurewebsites.net',
    namespace: 'api',
    serializer: App.ApplicationSerializer
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

// App.ApplicationAdapter = DS.FixtureAdapter();

App.ApplicationController = Ember.Controller.extend({
    currentPathDidChange: function() {
        Ember.run.schedule('afterRender',this,function() {
            console.log('route changed');
            this.store.all('expense').update();
        });
    }.observes('currentPath')
});

App.Router.map(function() {
  // put your routes here
  this.resource('charts');
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
                amount: Math.floor(Math.random()*20*1.5)
            });
            newExpense.save();
            this.set('name') = '';
            // this.get('model').pushObject(newExpense);
            // this.get('store').reload();
            //this.store.update('expense',newExpense);
        },
        deleteExpense: function(expense) {
            // expense.deleteRecord();
            // expense.save();
            expense.destroyRecord();
        }
    },
    expenseCount: function() {
        return this.get('model.length');
    }.property('@each')
});

App.Expense = DS.Model.extend({
    name: DS.attr('string'),
    amount: DS.attr('number'),
    label: function() {
        return this.get('name');
    }.property('name'),
    value: function() {
        return this.get('amount');
    }.property('amount'),
    group: function() {
        return "expense";
    }.property()
});

App.ChartsRoute = Ember.Route.extend({
    // setupController: function(controller,model) {
    //     this._super(controller,model);
    //     var expenses = this.store.all('expense');
    //     controller.set('model',expenses);
    // }
});

App.ChartsController = Ember.Controller.extend({
     getData: function() {
        // this.store.unloadAll('expense');
        var expenses = this.store.all('expense');
        expenses.update();
        var retarr = Ember.A();
        expenses.forEach(function(expense) {
            retarr.pushObject({
                label: expense.get('name'),
                value: expense.get('amount'),
                group: 'expense'
            });
        });
        return retarr;
    }.property().volatile()
});

/* yayData: [
    {
        "label": "Equity",
        "value": 12935781.176999997,
        "group": "money"
    },
    {
        "label": "Real Assets",
        "value": 10475849.276172025,
        "group": "money"
    },
    {
        "label": "Fixed Income",
        "value": 8231078.16438347,
        "group": "money"
    },
    {
        "label": "Cash & Cash Equivalent",
        "value": 5403418.115000006,
        "group": "money"
    },
    {
        "label": "Hedge Fund",
        "value": 1621341.246006786,
        "group": "money"
    },
    {
        "label": "Private Equity",
        "value": 1574677.59,
        "group": "money"
    }
  ] */

  // App.Expense.FIXTURES = [
  //   {
  //       name: "Expense 1",
  //       amount: 20
  //   }
  // ];