var endpoint = "https://ashrind.azurewebsites.net/api/v1/entries/sgv.json?count=1"
var app = angular.module('nightScoutApp', []);

app.controller('nightScoutCtrl', function($scope, $http) {
  $http.get(endpoint)
    .then(function(response) {
      $scope.data = response.data[0]; // The end point only returns one blood sugar entry
      
      // Determine the title to display based on the current blood glucose level (sgv)
      $scope.data.mainTitle = "";
      $scope.data.subTitle = null;

      var UPPER_ALMOST = 180;
      var LOWER_ALMOST = 70;

      var UPPER_DEAD = 700;
      var LOWER_DEAD = 20;

      if (($scope.data.sgv > UPPER_ALMOST && $scope.data.sgv < UPPER_DEAD ) || 
      	  ($scope.data.sgv < LOWER_ALMOST && $scope.data.sgv > UPPER_DEAD ))
      {
      	$scope.data.mainTitle = "Almost."
      	$scope.data.subTitle  = "Check back soon";	
      }
      else if($scope.data.sgv === null || $scope.data.sgv <= LOWER_DEAD || $scope.data.sgv >= UPPER_DEAD)
      {
      	$scope.data.mainTitle = "Yes.";
      	$scope.data.subTitle = "Somebody should probably call an ambulance";
      }
      else if ($scope.data.sgv === undefined || $scope.data.sgv === null)
      {
      	$scope.data.mainTitle = "Maybe?"
	    $scope.data.subTitle = "The webservice could be down";
      	$scope.data.sgv = "Unavailable";
      }
      else
      {
      	$scope.data.mainTitle = "No."
      }
    });
});
