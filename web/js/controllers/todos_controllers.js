Todos.TodosController = Ember.ArrayController.extend({
	actions: {
		createTodo: function() {
			// Get the todo title set by the "New Todo" text field
			var title = this.get('newTitle');
			if(!title.trim()) { return; }
			
			// Create the new Todo model
			var todo = this.store.createRecord('todo', {
				title: title,
				isCompleted: false
			});
			
			// Clear the "New Todo" text field
			this.set('newTitle', '');
			
			// Save the model
			todo.save();
		},
		isCompleted: function(key, value) {
			var model = this.get('model');
			
			if(value == undefined) {
				// property being used as a getter
				return model.get('isCompleted');
			} else {
				// property being used as a setter
				model.set('isCompleted', value);
				model.save();
				return value;
			}
		}.property('model.isCompleted')
	},
	remaining: function() {
		return this.filterBy('isCompleted', false).get('length');
	}.property('@each.isCompleted'),
	inflection: function() {
		var remaining = this.get('remaining');
		return remaining === 1 ? 'item' : 'items';
	}.property('remaining')
});	