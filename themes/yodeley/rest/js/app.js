angular.module('yodeley', ['ngSanitize', 'ngResource', 'ngRoute', 'ngAnimate'])


// Routes
 
.config(function($routeProvider){

	var templateUrl = '/wp-content/themes/yodeley/'

	$routeProvider
	.when("/", {
	  redirectTo: 'home'
	})
	.when("/home", {
	  templateUrl: templateUrl + "views/home.html",
	  controller: 'Home'
	})
	.when('/:catSlug/:postSlug', {
	    templateUrl: templateUrl + "views/single.html",
	    controller: 'Single'
	})
	.when('/:catSlug/', {
	    templateUrl: templateUrl + "views/category.html",
	    controller: 'Categories'
	})
	.otherwise({redirectTo: '/home'});

})

// Filters

.filter('soundcloudEmbedUrl', function ($sce) {
	return function(audioId) {
		return $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + audioId +"&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=true");
	};
})
.filter('youtubeEmbedUrl', function ($sce) {
	return function(videoId) {
		return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + videoId +"?rel=0&amp;showinfo=0");
	};
})

// Directives

.directive('modaal', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/modaal.html'
  };

})
.directive('item', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/item.html'
  };

})

// WP REST API Service

.factory('wp', function ($resource, $q) {

	var baseUrl = 'wp-json/wp/v2/';

	var wp = [];
	
	wp.posts = $resource(baseUrl + "posts?per_page=12").query();

	wp.catPosts = function (catId) {
		return $resource(baseUrl + "posts?per_page=12&categories=" + catId).query();
	}

	wp.singlePost = function (slug) {
		return $resource(baseUrl + "posts?slug=" + slug).query();
	}

	wp.categories = $resource(baseUrl + "categories").query();
	
	wp.getCategories = function (catSlug) {
		return $resource(baseUrl + "categories?slug=" + catSlug).query();
	} 

	wp.thePost = function (slug) {
		return $resource(baseUrl + "posts/?slug=" + slug).get();
	}

	wp.getMedia = function (mediaId) {
		var media = $resource(baseUrl + 'media/' + mediaId).get();
		return media;
	}

	return wp

})

// Home Page Controller

.controller('Home', ['$scope', '$routeParams', '$q',  'wp', function($scope, $routeParams, $q, wp) {

	$scope.theRoute = [{
			slug: 'home',
		}];
	$scope.posts = wp.posts;
	
	$q.all([
	    $scope.posts.$promise
	]).then( function (data) {
		for (i in data[0]) {
			$scope.posts[i].the_media = wp.getMedia(data[0][i].featured_media)
		}
	});	

}])

// Single Page Controller

.controller('Single', ['$scope', '$http', '$routeParams', '$q', 'wp', function($scope, $http, $routeParams, $q, wp) {
	if ($routeParams.catSlug == 'home') {
		$scope.theRoute = [{
			slug: 'home'
		}];
		$scope.posts = wp.posts;
	} else {
		$scope.theRoute = wp.getCategories($routeParams.catSlug);

		$q.all([
		    $scope.theRoute.$promise
		]).then( function (data) { 
			$scope.posts = wp.catPosts(data[0][0].id);
			$q.all([
	    	$scope.posts.$promise
			]).then( function (data) {
				for (i in data[0]) {
					$scope.posts[i].the_media = wp.getMedia(data[0][i].featured_media)

				}
			});	
		});
	};


	$http.get("wp-json/wp/v2/posts?slug=" + $routeParams.postSlug).success(function(res){
	    $scope.single = res[0]; 
	    console.log($scope.single);	
	});
	
	$scope.openModaal = function() {
		$('#modaal').addClass('active')
	}
	
	$scope.closeModaal = function() {
		$('#modaal').removeClass('active')
	}

}])

// Categories Page Controller

.controller('Categories', ['$scope', '$routeParams', '$q',  'wp', function($scope, $routeParams, $q, wp) {

	$scope.theRoute = wp.getCategories($routeParams.catSlug);

	$q.all([
	    $scope.theRoute.$promise
	]).then( function (data) { 
		$scope.posts = wp.catPosts(data[0][0].id);
		$q.all([
    		$scope.posts.$promise
		]).then( function (data) {
			for (i in data[0]) {
				$scope.posts[i].the_media = wp.getMedia(data[0][i].featured_media)

			}
		});
	});

}])

// Nav Controller

.controller('Nav', ['$scope', '$routeParams',  'wp', function($scope, $routeParams, wp) {

	$scope.categories = wp.categories;

}]);


