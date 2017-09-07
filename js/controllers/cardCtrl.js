app.controller('cardCtrl', function(cardFactory) {
	var self = this;

	self.isEditing = false;
	self.editingCard = {};
	self.toRecoverCard = false;
	

	self.editCard = function (card) {
		self.isEditing = true;
		self.editingCard = card;
	}
	
	self.updateCard = function () {
		cardFactory.updateCard(self.editingCard);
		self.editingCard = {};
		self.isEditing = false;
	}
	
	self.deleteCard = function (card) {
		cardFactory.deleteCard(card);
		self.isEditing = false;
	}
	
	self.recoverCard = function () {
		cardFactory.recoverCard();
		self.toRecoverCard = false;
	}
	
	self.softDeleteCard = function (card) {
		cardFactory.softDeleteCard(card);
		self.toRecoverCard = true;
	}
	
});