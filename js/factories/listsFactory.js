app.factory('listsFactory',['$http','listsUrl','localStorageService', function($http, listsUrl, localStorageService) {
	// object to return
	var service = {};
	
	/*== PRIVATE ==*/
	// url to server
	var url = listsUrl;
	// array to save data from server
	var lists = [];
	// object to reestablish
	var recoveringList = localStorageService.get("recoveringList") == null ? {} : localStorageService.get("recoveringList");
	// get lists of tasks-lists from server
	function getListsFromServer() {
		 $http.get(url)
			.then(function (response) {
				 lists = response.data;
				 if(Object.keys(recoveringList).length !== 0) {
					clearRecoveringList();
				 }
			}, function (error) {
				// handle error here
			});
	}
	// delete list
	function deleteList(list) {
		_.remove(lists, {id: list.id});
		var deleteUrl = url + '/'+list.id;
		$http.delete(deleteUrl);
	}
	// clear recovering object with list deleting and cleaning localStorage
	function clearRecoveringList() {
		if(Object.keys(recoveringList).length !== 0) {
			deleteList(recoveringList);
			recoveringList = {};
			localStorageService.remove("recoveringList");
		}
	}
	// get lists from server when factory is just created
	getListsFromServer();
	

	/*== PUBLIC ==*/
	// get lists
	service.getLists = function() {
		return lists;
	}
	// create new list
	service.addList = function(listName) {
		clearRecoveringList();
		
		var list = {
			title: listName
		}
		
		$http.post(url, list)
			.then(function (response) {
				lists.push({
					id: response.data,
					title: listName
				});
			}, function (error) {
				// handle error here
			});
	}
	// soft deleting of list (put list to recoveringList object)
	service.softDeleteList = function(list) {
		clearRecoveringList();
		
		recoveringList = list;
		if(localStorageService.isSupported) {
			localStorageService.set("recoveringList", recoveringList);
		}
		
	}
	// reestablish list (from soft deleted list)
	service.recoverList = function() {
		recoveringList = {};
		localStorageService.remove("recoveringList");
	}
	
	return service;
}]);