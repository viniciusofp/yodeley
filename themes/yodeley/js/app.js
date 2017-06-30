angular.module('yodeley', ['ngSanitize', 'ngResource', 'ngRoute', 'ngAnimate'])

/*
	Routes
 */

.config(function($routeProvider){

	var templateUrl = '/wp-content/themes/yodeley/'

	$routeProvider
	.when("/", {
	  redirectTo: '/home'
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

/*
	Filters
*/


// Adiciona id do Soundcloud à URL
.filter('soundcloudEmbedUrl', function ($sce) {
	return function(audioId) {
		return $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + audioId +"&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=true");
	};
})
// Adiciona id do Youtube à URL
.filter('youtubeEmbedUrl', function ($sce) {
	return function(videoId) {
		return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + videoId +"?rel=0&amp;showinfo=0");
	};
})
// Classes para items de posts
.filter('itemClass', function () {
	return function (i) {
		if (i == 0 || (i + 1) % 4 == 0 || i % 4 == 0) {
			return 'col-sm-6 col-md-4'
		} else {
			return 'col-sm-6 col-md-4'
		};
	}
})

/*
	Directives
*/


// Header
.directive('yodeleyHeader', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/header.html'
  };

})
// Navbar
.directive('yodeleyNavbar', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/navbar.html'
  };

})
// Footer
.directive('yodeleyFooter', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/footer.html'
  };

})
// Modal de post
.directive('modaal', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/modaal.html'
  };

})
// Grade de posts
.directive('item', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/item.html'
  };

})
// Grade de categorias Home
.directive('catGrid', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/cat-grid.html'
  };

})
// Conteúdo posts Home Page
.directive('itemHome', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/item-home.html'
  };

})
// Page Equipe
.directive('pageEquipe', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/page-equipe.html'
  };

})
// Page Produtora
.directive('pageProdutora', function() {
  
  return {
      restrict: 'E',
      templateUrl: '/wp-content/themes/yodeley/directives/page-produtora.html'
  };

})

/*
	WP REST API Factory
*/

.factory('wp', function ($resource, $q) {

	var baseUrl = 'index.php/wp-json/wp/v2/';

	var wp = [];
	
	wp.posts = $resource(baseUrl + "posts?per_page=3").query();

	wp.equipe = $resource(baseUrl + "equipe").query();

	wp.catPosts = function (catId) {
		return $resource(baseUrl + "posts?per_page=12&order=desc&categories=" + catId).query();
	}

	wp.catLastPost = function (catId) {
		return $resource(baseUrl + "posts?per_page=4&order=desc&categories=" + catId).query();
	}

	wp.singlePost = function (slug) {
		return $resource(baseUrl + "posts?slug=" + slug).query();
	}

	wp.singlePage = function (slug) {
		return $resource(baseUrl + "pages?slug=" + slug).query();
	}

	wp.categories = $resource(baseUrl + "categories?order_by=slug").query();
	
	wp.getCategories = function (catSlug) {
		return $resource(baseUrl + "categories?slug=" + catSlug).query();
	}
	wp.getCategoryById = function (catId) {
		return $resource(baseUrl + "categories/" + catId).get();
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


/*
	Controllers
*/

// Home Page Controller

.controller('Home', ['$scope', '$routeParams', '$q', '$location',  'wp', function($scope, $routeParams, $q, $location, wp) {
	console.log($location.$$url);
	$scope.theRoute = [{
			slug: 'home',
		}];
	$scope.posts = wp.posts;

	document.querySelector('title').innerHTML = 'Yodeley';


	$scope.catArray = [];

	$q.all([
	    $scope.posts.$promise
	]).then( function (data) {
		for (i in data[0]) {
		
			i = parseInt(i);

			if (Number.isInteger(i)) {
				$scope.catArray[i] = wp.getCategoryById(data[0][i].categories[0])

			};

		}
	});



}])

// Produtora Controller

.controller('Produtora', ['$scope', '$routeParams', '$q', '$location',  'wp', function($scope, $routeParams, $q, $location, wp) {
	$q.all([
	    wp.singlePage('produtora').$promise
	]).then( function (data) { 
		$scope.produtora = data[0][0];
		console.log($scope.produtora)
	});
}])

// Equipe Controller

.controller('Equipe', ['$scope', '$routeParams', '$q', '$location',  'wp', function($scope, $routeParams, $q, $location, wp) {
	$q.all([
	    wp.singlePage('equipe').$promise
	]).then( function (data) { 
		$scope.equipePage = data[0][0];
		console.log($scope.equipePage)
	});

	$scope.equipe = wp.equipe;
	$q.all([
	    $scope.equipe.$promise
	]).then( function (data) { 
		data[0].sort(function(a, b){
		    if(a.title.rendered < b.title.rendered) return -1;
		    if(a.title.rendered > b.title.rendered) return 1;
		    return 0;
		})		
	});

	console.log($scope.equipe)
}])

// Single Page Controller

.controller('Single', ['$scope', '$http', '$routeParams', '$q', '$location', 'wp', function($scope, $http, $routeParams, $q, $location, wp) {

	if ($routeParams.catSlug == 'home') {
		$scope.theRoute = [{
			slug: 'home'
		}];
		
		$scope.posts = wp.posts;
		
		$scope.catArray = [];

		$q.all([
		    $scope.posts.$promise
		]).then( function (data) {
			for (i in data[0]) {
				i = parseInt(i);
				if (Number.isInteger(i)) {
					$scope.catArray[i] = wp.getCategoryById(data[0][i].categories[0])
				};
			}
		});
	} else {
		$scope.theRoute = wp.getCategories($routeParams.catSlug);
		$q.all([
		    $scope.theRoute.$promise
		]).then( function (data) { 
			document.querySelector('title').innerHTML = data[0][0];
			$scope.posts = wp.catPosts(data[0][0].id);
			$scope.catArray = [];
			$q.all([
			    $scope.posts.$promise
			]).then( function (data) {

				for (i in data[0]) {
					i = parseInt(i);
					if (Number.isInteger(i)) {
						$scope.catArray[i] = wp.getCategoryById(data[0][i].categories[0])

					};
				}
			});	
		});
	};


	$http.get("index.php/wp-json/wp/v2/posts?slug=" + $routeParams.postSlug).success(function(res){
	    $scope.single = res[0];
	    
		console.log(res[0])
		document.querySelector('title').innerHTML = res[0].title.rendered + ' - Yodeley';

	});
	
	$scope.openModaal = function() {
		$('#modaal').addClass('active')
	}
	
	$scope.closeModaal = function() {
		$('#modaal').removeClass('active')
	}

}])

// Categories Page Controller

.controller('Categories', ['$scope', '$routeParams', '$q', '$location',  'wp', function($scope, $routeParams, $q, $location, wp) {

	console.log($location.$$url);

	$scope.theRoute = wp.getCategories($routeParams.catSlug);

	$q.all([
	    $scope.theRoute.$promise
	]).then( function (data) { 
		$scope.posts = wp.catPosts(data[0][0].id);
		console.log(data[0][0]);

		document.querySelector('title').innerHTML = data[0][0].name + ' - Yodeley';
	});

}])

// Nav Controller

.controller('Nav', ['$scope', '$routeParams', '$q',  'wp', function($scope, $routeParams, $q, wp) {

	$scope.categories = wp.categories;

}])

// Cat Grid Controller

.controller('CatGrid', ['$scope', '$routeParams', '$q',  'wp', function($scope, $routeParams, $q, wp) {

	$scope.categories = wp.categories;

	$scope.imgs = [];


	$q.all([
	    $scope.categories.$promise
	]).then( function (data) {
		for (i in data[0]) {
		
			i = parseInt(i);

			if (Number.isInteger(i)) {

				$scope.imgs[i] = wp.catLastPost(data[0][i].id)

			};

		}
		console.log($scope.imgs);
	});


	$scope.catGrid = function(index) {
			return 'col-sm-6'
	}

}]);


