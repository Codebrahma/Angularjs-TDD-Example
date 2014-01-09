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

}]);

application_module.filter("byRate",function(){
  var isWithinRange = function(value, range){
    value = parseFloat(value);
    return value >= range.start && value <= range.end;
  };
  return function(items,params){
    var filtered = items;
    if(params.start && params.end){
      filtered = _.filter(items,function(item){
        return isWithinRange(item.rate.value, params);
      });
    }

    return filtered;
  };
});
