var application_module = angular.module("appl",[])
application_module.controller("TDDTestController",["$scope","$http","$filter",function($scope,$http,$filter){
  $scope.original_datas = [];
  $scope.datas = [];

  $scope.loadData = function(){
    // FIXME: make this an array
  	$scope.$root.xhrRequestStatus = "working";
    $http.get("/mock.json").then(function(data){
        $scope.original_datas = data.data;
        $scope.datas = $scope.original_datas;
        $scope.$root.xhrRequestStatus = "idle";
    });
  };

  $scope.filterByRate = function(){
    
    // If any of the fields arent ready
    if(!$scope.filterByRateFrom || !$scope.filterByRateTo) {
      $scope.datas = $scope.original_datas;
      return;
    }

    // The fields are ready, so FILTER!
    filtered = $filter('byRate')($scope.original_datas, {
      start : $scope.filterByRateFrom,
      end   : $scope.filterByRateTo
    });
    $scope.datas = filtered;     
  };

}]);
application_module.filter("byRate",function(){
  var within_range = function(value, range){
    value = parseFloat(value);
    return value >= range.start && value <= range.end;
  }
  return function(items,params){
    return _.filter(items,function(item){
      return within_range(item.rate.value, params);
    });
  };
});
