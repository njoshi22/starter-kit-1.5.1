App.WarehousesController = Ember.Controller.extend({
	day: function() {
		return moment().format('LL');
	}.property()
});

App.WhStrComponenent = Ember.Component.extend({
	isExpanded: false,
	actions: {
		toggleDetails: function() {
			this.set('isExpanded',true);
		}
	}
});