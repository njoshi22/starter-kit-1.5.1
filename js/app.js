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

App.Router.map(function() {
    this.resource('expenses',function() {
        this.route('charts');
    });
});

// This gets rid of the # part of the app using HTMl5 history API.
// DISABLED FOR LOCALLY VIEWING FILES. ENABLE FOR SERVER UPLOAD.
// App.Router.reopen({
//     location: 'history',
//     rootURL: '/ExpenseApp/'
// });

App.ApplicationController = Ember.Controller.extend({
    currentPathDidChange: function() {
        Ember.run.schedule('afterRender',this,function() {
            console.log('route changed');
            this.store.all('expense').update();
        });
    }.observes('currentPath')
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('expenses');
    }
});

App.ExpensesRoute = Ember.Route.extend({
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

App.ExpensesIndexRoute = Ember.Route.extend({
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

App.ExpensesIndexController = Ember.ArrayController.extend({
    actions: {
        saveExpense: function() {
            var name = this.get('name');
            var amount = this.get('amount');
            if(name=='' || amount==''||!name||!amount) {
                alert('You must enter values for both fields');
                return false;
            } else {
                var newExpense = this.get('store').createRecord('expense',{
                    name: name,
                    //amount: Math.floor(Math.random()*20*1.5)
                    amount: amount
                });
                newExpense.save();
                this.set('name','');
            }
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

App.ExpensesChartsRoute = Ember.Route.extend({

    setupController: function(controller,model) {

        var expenses = this.store.all('expense');
        var subset = Ember.A();
        expenses.forEach(function(expense) {
            subset.pushObject({
                label: expense.get('label'),
                value: expense.get('value'),
                group: expense.get('group')
            });
        });
        controller.set('model',subset);
    } 

});