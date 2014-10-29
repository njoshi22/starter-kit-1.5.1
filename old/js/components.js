App.WhStrComponent = Ember.Component.extend({
	init: function() {
		this._super();
		this.set('isExpanded',true);
		this.set('status','Not set');
	},
	isExpanded: true,
	status: 'Not set',
	actions: {
		toggleDetails: function() {
			//this.toggleProperty('isExpanded');
			/* var warehouse = store.createRecord('warehouse',{
				whid: 'test',
				name: 'test WH',
				location: 'UN-MA'
			}).save().then(function() {
				this.set('status','saved');
			}).catch(function() {
				this.set('status','failed');
			}); */
			this.set('status','Yay!');
		}
	}
});