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
        this.route('add')
    });
});

// This gets rid of the # part of the app using HTMl5 history API.
// DISABLED FOR LOCALLY VIEWING FILES. ENABLE FOR SERVER UPLOAD.
// App.Router.reopen({
//     location: 'history',
//     rootURL: '/ExpenseApp/'
// });

App.ApplicationController = Ember.Controller.extend({
    modalButtons: [
        Ember.Object.create({title: 'Submit', clicked:"saveExpense"}),
        Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
    ],
    selectedGroup: null,
    groupChoices: [
        {
            title: 'Unfiled Expenses'
        },
        {
            title: 'Filed Expenses'
        }
    ],
    actions: {
        showModal: function() {
            Bootstrap.ModalManager.open('expenseModal','Add new expense',
                'new-expense',this.modalButtons,this);
        },
        saveExpense: function() {
            var name = this.get('name');
            var amount = this.get('amount');
            var group = this.get('selectedGroup.title');
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
                this.set('amount','');
                // this.transitionTo('expenses.index');
                Bootstrap.NM.push('Expense created!','success');
                Bootstrap.ModalManager.close('expenseModal');
                return true;
            }
        }
    }
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
    }
});

App.ExpensesIndexController = Ember.ArrayController.extend({
    actions: {
        deleteExpense: function(expense) {
            expense.destroyRecord();
        }
    },
    expenseCount: function() {
        return this.get('model.length');
    }.property('@each')
});

App.ExpensesAddController = Ember.ArrayController.extend({
    success: false,
    actions: {
        saveExpense: function() {
            console.log('button clicked');
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
                this.set('amount','');
                // this.transitionTo('expenses.index');
                this.set('success',true);
                return true;
            }
        }
    }
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