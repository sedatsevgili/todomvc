Todos.TodosController = Ember.ArrayController.extend({
	isEditing: false,
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
		}
	},
	remaining: function() {
		return this.filterBy('isCompleted', false).get('length');
	}.property('@each.isCompleted'),
	inflection: function() {
		var remaining = this.get('remaining');
		return remaining === 1 ? 'item' : 'items';
	}.property('remaining')
});	