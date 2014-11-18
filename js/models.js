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
        var choices = ["Expense A","Expense B"];
        return (choices[Math.round(Math.random*choices.length)]);
    }.property().volatile()
});