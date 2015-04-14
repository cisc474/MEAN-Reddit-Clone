var app = angular.module('ourRedditApp', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
    })

    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    });
    
  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', ['$http', function($http){
  var o = {
    posts: []
  };
  
  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };
  
  o.create = function(post) {
    return $http.post('/posts', post).success(function(data){
      o.posts.push(data);
    });
  };
  
  o.upvote = function(post) {
	console.log("starting upvote");
    return $http.put('/posts/' + post._id + '/upvote')
    .success(function(data){
      post.upvotes += 1;
    });
  };
  
  o.downvote = function(post) {
	console.log("starting downvote");
    return $http.put('/posts/' + post._id + '/downvote')
    .success(function(data){
      post.upvotes -= 1;
    });
  };
  
  o.get = function(id) {
    return $http.get('/posts/' + id).then(function(res){
      return res.data;
    });
  };
  
  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
  };
  
  o.upvoteComment = function(post, comment) {
    console.log("Reached factory upvote comment function");
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
    .success(function(data){
      console.log("Factory Success");
      comment.upvotes += 1;
    })
    .error(function(data){
      console.log("Factory Error");
      console.log(data);
    });
  };
  
  o.downvoteComment = function(post, comment) {
    console.log("Reached factory downvote comment function");
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/downvote')
    .success(function(data){
      console.log("Factory Success");
      comment.upvotes -= 1;
    })
    .error(function(data){
      console.log("Factory Error");
      console.log(data);
    });
  };
  
  return o;
}]);

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.posts = posts.posts;

  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
	  text: $scope.text,
      link: $scope.link,
    });
    $scope.title = '';
	$scope.text = '';
    $scope.link = '';
  };
  
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
  };
  
  $scope.decrementUpvotes = function(post) {
	posts.downvote(post);
  };
  
}]);

app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post){
  $scope.post = post;
  $scope.addComment = function(){
    if(!$scope.body || $scope.body === '') { return; }
    posts.addComment(post._id, {
      body: $scope.body,
      author: 'user',
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
  };
  
  $scope.incrementUpvotesComment = function(comment){
    console.log("Reached upvote comment function");
    posts.upvoteComment(post, comment);
  };
  
  $scope.decrementUpvotesComment = function(comment){
    console.log("Reached downvote comment function");
    posts.downvoteComment(post, comment);
  };
  
}]);