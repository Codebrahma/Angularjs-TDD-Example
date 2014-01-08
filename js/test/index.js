/*
 * Test angular controllers
 */
describe("TDDTest Controller", function() {

  var $scope, $location, $rootScope, createController, $httpBackend, DEFAULT_DATA;

  //Load the module
  beforeEach(module("appl"));
  beforeEach(module("dummyBackendResponse"));

  //Inject dependencies
  beforeEach(inject(function($injector) {
        /*
         * Initialize variables
         */
        var $controller = $injector.get('$controller');

        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $httpBackend = $injector.get('$httpBackend');
        DEFAULT_DATA = $injector.get("DEFAULT_DATA");
        FILTERED_DEFAULT_DATA = $injector.get("FILTERED_DEFAULT_DATA");

        /*
         * create the controller
         */
        createController = function() {
            return $controller('TDDTestController', {
                '$scope': $scope
            });
        };
        
        /*
         * Default response
         */
        $httpBackend.when('GET', '/mock.json').respond(DEFAULT_DATA);
  }));

  afterEach(function(){
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
  });
  
  //Specs
  it("should have 'datas' array on the scope which should be initialized to an empty array", function() {
    createController();
    expect($scope.datas).toEqual([]);  
  });

  it("method loadData should load the data from the backend and assign the data to $scope.data",function(){
    createController();
    /*
     * When loadData is called test if the method is doing
     * what is it supposed to 
     */
    $scope.loadData();
    $httpBackend.expectGET("/mock.json");
    expect($rootScope.xhrRequestStatus).toEqual("working");
    $httpBackend.flush();
    expect($scope.datas).toEqual(DEFAULT_DATA);
    expect($rootScope.xhrRequestStatus).toEqual("idle");
  });

  it("method filterByRate should return filtered data and store actual data in temp.data",function(){
     createController();
     /*
      * sort on the datas object in the scope
      */
     $scope.filterByRateFrom = 11;
     $scope.filterByRateTo = 12;

     $scope.datas = DEFAULT_DATA;
     $scope.filterByRate();

     expect($scope.temp.datas).toEqual(DEFAULT_DATA);
     expect($scope.datas).toEqual(FILTERED_DEFAULT_DATA);  
  });
  it("method filterByRate should return the actual data stored in temp.data if nothing is returned",function(){
     createController();
     $scope.filterByRateFrom = 15;
     $scope.filterByRateTo = 19;

     $scope.datas = DEFAULT_DATA;
     $scope.filterByRate();

     expect($scope.temp.datas).toEqual(DEFAULT_DATA);
     expect($scope.datas).toEqual(DEFAULT_DATA);
  });
});


/*
 * Test angular filters
 */
describe("TDDTestFilter",function(){    
    beforeEach(module("appl"));
    beforeEach(module("dummyBackendResponse"));
    it("Filter by rate should only show the elements in the range specified",inject(function(byRateFilter,DEFAULT_DATA){
        expect(byRateFilter(DEFAULT_DATA,{start:0,end:100})).toEqual(DEFAULT_DATA);                    
    }));
    it("Filter by rate should return everything if nothing matches the criteria",inject(function(byRateFilter,DEFAULT_DATA){
        expect(byRateFilter(DEFAULT_DATA,{start:-1,end:-200})).toEqual(DEFAULT_DATA);                    
    }));
});