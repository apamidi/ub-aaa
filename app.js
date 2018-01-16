var app = angular.module('plunker', ["ngGrid"]);

app.factory("columnDefFactory", [
  function() {

    var self = this;

    function byRowOnly(firstRow) {
      if (!firstRow) throw new Error("Must provide firstRow");

      var results = [];

      angular.forEach(firstRow, function(datum, fieldName) {
        var result = {};

        result.field = fieldName;

  

        if (!datum || datum.toString().length < result.displayName.length)
          result.width = result.displayName.length * 9;
        else
          result.width = datum.toString().length * 7.5;

        if (result.width < 40)
          result.width = 40;

        if (result.width > 250)
          result.width *= 0.95;

        result.width += 20;

        results.push(result);

      });

      return results;
    }

    function byRowAndHeaders(firstRow, headers) {
      var results = [];

      angular.forEach(headers, function(displayName, fieldName) {

        var result = {};

        var datum = firstRow ? firstRow[fieldName] : null;

        result.field = fieldName;
        result.displayName = displayName;

        if (!datum || datum.toString().length < displayName.length)
          result.width = displayName.length * 9;
        else
          result.width = datum.toString().length * 7.5;

        if (result.width < 40)
          result.width = 40;

        if (result.width > 250)
          result.width *= 0.95;

        result.width += 20;

        results.push(result);

      });

      return results;
    }

    self.generateDefs = function(firstRow, headers) {
      return headers ? byRowAndHeaders(firstRow, headers) : byRowOnly(firstRow);
    };

    return self;

  }
]);

app.service("columnDefService", function() {

  var columnDef = {};

  columnDef.FuelUsed = {
    Season: "Season",
    Meeting: "Meeting Name"
    
    
  };

  return columnDef;
});

app.service("mockHttpService", ["$q", function($q) {

  var self = this;

  var myData = [{
    "Season": "2015 vhvhjhjgjhghjgjhhg ",
    "Meeting": "2015 FORMULA 1 SHELL BELGIAN GRAND PRIX dfdfdggddg gfghfghfghfghfhgfghfghfghfghfhg",
    
    
  }, {
    "Season": 2015,
    "Meeting": "FORMULA 1 PIRELLI MAGYAR NAGYDÍJ 2015gjhjhjhjhjhjhjhjh",
    
  }, {
    "Season": "2015 hvhghjghjghghgjgjh ",
    "Meeting": "2015 FORMULA 1 BRITISH GRAND PRIX",
    
  }];

  self.getData = function() {

    return $q(function(resolve, reject) {
      resolve(myData);
    });

  };

  return self;

}]);

app.controller('MainCtrl', function($scope, columnDefService, columnDefFactory, mockHttpService) {

  var self = this;

  mockHttpService.getData().then(function(response) {
  
    self.myData = response;
    
    self.gridOptions = {
      data: 'main.myData',
      
      columnDefs: columnDefFactory.generateDefs(self.myData[0], columnDefService.FuelUsed),
      enableColumnResize: true,
      
    }
  });

});