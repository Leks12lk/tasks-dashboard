app.controller('listCtrl', function(cardFactory, listsFactory) {
	var self = this;

	self.isEditTitleMode = false;
	
	self.createCard = function (list) {
		cardFactory.createCard(list, self.cardDecsription);
		self.cardDecsription = '';
	}

	self.getCards = function (listId) {
		return cardFactory.getCards(listId);
	}
	
	self.toRecoverList = false;
	
	self.recoverList = function () {
		listsFactory.recoverList();
		self.toRecoverList = false;
	}
	
	self.softDeleteList = function (list) {
		listsFactory.softDeleteList(list);
		self.toRecoverList = true;
	}

	self.switchEditTitleMode = function (list) {
		list.isEditTitleMode = !list.isEditTitleMode;
	}
	
})