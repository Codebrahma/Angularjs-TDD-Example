describe("Index Page",function(){
  var ptor = protractor.getInstance();
  beforeEach(function(){
     browser.get("http://localhost:3000/");
     browser.ignoreSynchronization = true;
  });


  it("title should be angular TDD",function(){
     browser.driver.getTitle().then(function(title){
        expect(title).toEqual("Angular TDD");
     });
  });

  
  it("input fields bound to 'filterByRateFrom' and 'filterByRateTo' should filter the data",function(){
     
     var from = element(by.model('filterByRateFrom'))
         ,to = element(by.model('filterByRateTo'))
         ,initialLength, finalLength;

     element.all(by.repeater('data in datas')).then(function(rows){
        initialLength = rows.length;
     });
     
     from.sendKeys(12);
     to.sendKeys(13);
     
     /*
      * Since it's a promise object we chain it so
      * we wait for the firt promise to return
      */
     element.all(by.repeater('data in datas')).then(function(rows){
       finalLength = rows.length;
     }).then(function(){
       expect(finalLength).toBeLessThan(initialLength);
     });
  });


});