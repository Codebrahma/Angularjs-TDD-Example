angular.module("appl",[])
.controller("TDDTestController",["$scope","$http","$filter",function($scope,$http,$filter){
  $scope.datas = [];
  $scope.temp = {
     datas:[]
  };

  $scope.$root.xhrRequestStatus = "idle";
  $scope.loadData = function(){
  	$scope.$root.xhrRequestStatus = "working";
    $http.get("/mock.json").then(function(data){
        $scope.datas = data.data;
        $scope.$root.xhrRequestStatus = "idle";
    });
  };

  $scope.filterByRate = function(){
    var filtered;
    if( $scope.temp.datas.length < $scope.datas.length ){
       $scope.temp.datas = $scope.datas;
    };
    filtered = $filter('byRate')($scope.temp.datas,{start:$scope.filterByRateFrom,end:$scope.filterByRateTo});
    $scope.datas = filtered;     
  };

}])

.filter("byRate",function(){
   return function(items,params){

     params.start = Math.abs(params.start);
     params.end = Math.abs(params.end);

     var filtered =  _.filter(items,function(item){
       return item.rate.value >= params.start && item.rate.value <= params.end;
     });

     if( filtered.length == 0 ){
        filtered = items;
     };
     return filtered;
   };
});
