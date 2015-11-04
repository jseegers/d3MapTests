
var app = angular.module('MapTest', ['d3']);

app.controller('MapCtrl', function ($scope) {
    var self = $scope;
    d3.select(window)
        .on("resize", self.sizeChange);

    var projection = d3.geo.winkel3()
        .scale(182);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#container")
        .append("svg")
        .attr("width", "100%")
        .append("g");

    var countryG = svg.append("g");
    var pointG = svg.append("g");

    d3.json("world.json", function (error, world) {
        countryG.selectAll(".countries")
            .data(topojson.feature(world, world.objects.countries).features)
            .enter().append("path")
            .attr("class", "countries")
            .attr("d", path);
    });
    d3.json("points.json", function (error, points) {
        pointG.append("path")
            .datum(topojson.feature(points, points.objects.points))
            .attr("class", "points")
            .attr("d", path);
    });

    self.sizeChange = function () {
        console.log("this did a thing")
        d3.select("g").attr("transform", "scale(" + $("#container").width() / 900 + ")");
        $("svg").height($("#container").width() * 0.618);
    }
});

/*app.filter('noRepeats', function () {
  return function (input) {

    var filtered = [];
    angular.forEach(input, function(item){
        console.log(item + " this is the item")
        if(filtered.indexOf(item) == -1){
          filtered.push(item)
      }
    })
    console.log(filtered.length + " this is the input lenght")
    return filtered;
    
  }
});

app.factory('spellLoad', function($q, $timeout, $http) {
    var SpellLoad = {
        fetch: function(callback) {
            
            var deferred = $q.defer();

            $timeout(function() {
                $http.get('json/AllSpellsClean.json').success(function(data) {
                    deferred.resolve(data);
                });
            }, 30);

            return deferred.promise;
        }
    };

    return SpellLoad;
});*/