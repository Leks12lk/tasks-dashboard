app.factory('cardFactory', ['$http','cardsUrl','localStorageService', function($http, cardsUrl, localStorageService) {
	// object to return
	var service = {};
	
	/*== PRIVATE ==*/
	// url to server
	var url = cardsUrl;
	// array to save data from server
	var cards = [];
	// object to reestablish
	var recoveringCard = localStorageService.get("recoveringCard") == null ? {} : localStorageService.get("recoveringCard");
	// get lists of cards from server
	function getCardsFromServer() {		
		 $http.get(url)
			.then(function (response) {
				 cards = response.data;
				 if(Object.keys(recoveringCard).length !== 0) {
					clearRecoveringCard();
				 }
			}, function (error) {
				// hadle error here
			});
	}
	// delete card
	function deleteCard(card) {
		_.remove(cards, {id: card.id});
		var deleteUrl = url + '/'+ card.id;
		$http.delete(deleteUrl);
	}
	// clear recovering object with card deleting and cleaning localStorage
	function clearRecoveringCard() {
		if(Object.keys(recoveringCard).length !== 0) {
			deleteCard(recoveringCard);
			recoveringCard = {};
			localStorageService.remove("recoveringCard");
		}
	}
	// get cards from server when factory is just created
	getCardsFromServer();
		
	
	/*== PUBLIC ==*/
	// get cards for specific list
	service.getCards = function(listId) {
		return _.filter(cards, { listId: listId });
	}
	// create new card
	service.createCard = function(list, cardDescription) {
		clearRecoveringCard();
		
		var cardToSend = {			
			description: cardDescription,
			listId: list.id
		};
		
		$http.post(url, cardToSend)
			.then(function (response) {			
				cards.push(response.data);
			}, function (error) {
				// handle error here
			});
	}
	// update card
	service.updateCard = function(card) {
		clearRecoveringCard();
		
		$http.put(url, card);
	}
	// soft deleting of card (put card to recoveringCard object)
	service.softDeleteCard = function(card) {
		clearRecoveringCard();
		
		recoveringCard = card;
		// if localStorage is supported - put recoveringCard to localStorage
		if(localStorageService.isSupported) {
			localStorageService.set("recoveringCard", recoveringCard);
		}
	}
	// reestablish card (from soft deleted card)
	service.recoverCard = function() {
		recoveringCard = {};
		localStorageService.remove("recoveringCard");
	}

	return service;

}]);