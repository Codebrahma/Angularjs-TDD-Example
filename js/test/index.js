describe("TDDTest Controller", function() {

  var $scope, $location, $rootScope, createController, $httpBackend, DEFAULT_DATA;

  beforeEach(module("appl"));
  beforeEach(module("dummyBackendResponse"));

  beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');

        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $httpBackend = $injector.get('$httpBackend');
        DEFAULT_DATA = $injector.get("DEFAULT_DATA");
        INTEREST_RATE_BETWEEN_11_AND_12 = $injector.get("INTEREST_RATE_BETWEEN_11_AND_12");

        createController = function() {
            return $controller('TDDTestController', {
                '$scope': $scope
            });
        };
        
        $httpBackend.when('GET', '/mock.json').respond(DEFAULT_DATA);
        createController();
  }));

  afterEach(function(){
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
  });
  
  it("should have 'datas' array on the scope which should be initialized to an empty array", function() {
    expect($scope.datas).toEqual([]);  
  });
  

  it("method loadData should load the data from the backend and assign the data to $scope.data",function(){
    $scope.loadData();
    $httpBackend.expectGET("/mock.json");

    // Setting rootScope Request Status to working
    expect($rootScope.xhrRequestStatus).toEqual("working");
    
    // Finish the AJAX request
    $httpBackend.flush();

    expect($scope.datas).toEqual(DEFAULT_DATA);

    // Setting rootScope Request Status to idle
    expect($rootScope.xhrRequestStatus).toEqual("idle");
  });

  it("should not filter when the range is not available", function(){
    $scope.filterByRateFrom = undefined;
    $scope.filterByRateTo   = undefined;

    $scope.original_datas = DEFAULT_DATA;
    $scope.filterByRate();

    expect($scope.datas).toEqual(DEFAULT_DATA);
  });

  it("filterByRate should return filtered data and store actual data in original_data",function(){
     $scope.filterByRateFrom = 11;
     $scope.filterByRateTo = 12;

     $scope.original_datas = DEFAULT_DATA;
     $scope.filterByRate();

     expect($scope.original_datas).toEqual(DEFAULT_DATA);
     expect($scope.datas).toEqual(INTEREST_RATE_BETWEEN_11_AND_12);  
  });
  it("filterByRate should return the actual data stored in original_data if nothing is returned",function(){
     $scope.filterByRateFrom = 15;
     $scope.filterByRateTo = 19;

     $scope.original_datas = DEFAULT_DATA;
     $scope.filterByRate();

     expect($scope.original_datas).toEqual(DEFAULT_DATA);
     expect($scope.datas).toEqual([]);
  });
});


describe("Filter By Rate Should",function(){    
    beforeEach(module("appl"));

    var DEFAULT_DATA = [
      {rate : { value: 8 }} , 
      {rate : { value: 9 }} , 
      {rate : { value: 10 }} , 
      {rate : { value: 11 }} , 
      {rate : { value: 12 }} , 
      {rate : { value: 13 }}
    ];

    var DEFAULT_DATA_AS_STRING = [
      {rate : { value: "8" }} , 
      {rate : { value: "9" }} , 
      {rate : { value: "10" }} , 
      {rate : { value: "11" }} , 
      {rate : { value: "12" }} , 
      {rate : { value: "13" }}
    ];
    var GREATER_THAN_10 = [
      {rate : { value: 11 }} , 
      {rate : { value: 12 }} , 
      {rate : { value: 13 }}
    ];

    it("only show the elements in the range specified", inject(function(byRateFilter) {
        expect(byRateFilter(DEFAULT_DATA, {start:11, end:15})).toEqual(GREATER_THAN_10);                    
    }));
    it("only show the elements in the range specified, even if the range specified is a string", inject(function(byRateFilter) {
        expect(byRateFilter(DEFAULT_DATA_AS_STRING, {start:"8", end:"15"})).toEqual(DEFAULT_DATA_AS_STRING);                    
    }));
    it("return nothing if nothing matches the criteria", inject(function(byRateFilter) {
        expect(byRateFilter(DEFAULT_DATA,{start:30, end:40})).toEqual([]);                    
    }));
});
