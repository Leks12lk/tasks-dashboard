app.controller('listsCtrl',['listsFactory', '$rootScope','$location', function(listsFactory, $rootScope, $location) {
	if(!$rootScope.isAuthorize) {
		$location.path('/login');
	}
	var self = this;

	self.newListVisible = false;
	self.listName = "New list name";

	self.addList = function () {
		listsFactory.addList(self.listName);
		self.newListVisible = false;
	}

	self.showNewListForm = function () {
		self.newListVisible = true;
	}

	self.hideNewListForm = function () {
		self.newListVisible = false;
	}

	self.getLists = function () {
		return listsFactory.getLists();
	}
	
}]);