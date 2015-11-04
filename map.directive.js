
angular.module('d3AngularApp', ['d3', 'd3Geo'])
    .directive('d3Bars', ['$window', '$timeout', 'd3Service', 'd3GeoService',
  function ($window, $timeout, d3Service, d3GeoService) {
            return {
                restrict: 'A',
                scope: {
                    data: '=',
                    label: '@',
                    onClick: '&'
                },
                link: function (scope, ele, attrs) {
                    d3Service.d3().then(function (d3) {

                        var renderTimeout;
                        var margin = parseInt(attrs.margin) || 20;


                        var projection = d3.geo.mercator()
                            .scale(182);

                        var path = d3.geo.path()
                            .projection(projection);
                        var svg = d3.select(ele[0])
                            .append('svg')
                            .style('width', '100%')
                            .append("g");

                        $window.onresize = function () {
                            scope.$apply();
                        };

                        scope.$watch(function () {
                            return angular.element($window)[0].innerWidth;
                        }, function () {
                            scope.render(scope.data);
                        });

                        scope.$watch('data', function (newData) {
                            scope.render(newData);
                        }, true);

                        scope.render = function (data) {
                            svg.selectAll('*').remove();

                            if (!data) return;
                            if (renderTimeout) clearTimeout(renderTimeout);

                            renderTimeout = $timeout(function () {
                                var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                                    height = scope.data.length * (barHeight + barPadding),
                                    color = d3.scale.category20(),
                                    xScale = d3.scale.linear()
                                    .domain([0, d3.max(data, function (d) {
                                        return d.score;
                                    })])
                                    .range([0, width]);

                                svg.attr('height', height);
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

                            }, 200);
                        };
                    });
                }
            }
}])