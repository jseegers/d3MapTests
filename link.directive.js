'use strict';

var app = angular.module('jsApp');

app.directive('mapChart', function () {
    return {
        restrict: 'E',
        controller: 'MapController',
        controllerAs: 'mapCtrl',
        templateUrl: 'directives/map.html'
    };
});

app.controller('MapController', function (d3Promise) {

    var self = this;
    self.loaded = true;
    var width = window.innerWidth / 2;
    var height = 500;
    /*        self.projection = d3.geo.albersUsa()
                .scale(500)
                .translate([width / 2, height / 2])
                .precision(.1);*/

    self.projection = d3.geo.mercator()
        .center([-67.109375, 34.664841])
        .scale(400);


    self.path = d3.geo.path()
        .projection(self.projection)

    self.svg = d3.select("#stateMap")
        .classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 120 550 550")
        .classed("svg-content-responsive", true);
    //self.loaded = true;
    //self.polyG = self.svg.append("g")
    self.lineG = self.svg.append("g")
    self.markerG = self.svg.append("g")
    self.backText = self.svg.append("g")
    self.labelText = self.svg.append("g")

    //self.statePromise = d3Promise.json("assets/states.json")

    /*    self.statePromise.then(function (states) {

            self.polyG.insert("path", ".graticule")
                .datum(topojson.feature(states, states.objects.projected))
                .attr("class", "land")
                .attr("d", self.path);

            self.polyG.insert("path", ".graticule")
                .datum(topojson.mesh(states, states.objects.projected, function (a, b) {
                    return a !== b;
                }))
                .attr("class", "boundary")
                .attr("d", self.path);

        }, function (error) {}).then(function () {*/



    d3.json("assets/Towns.json", function (error, towns) {
            if (error) throw error;
            self.links = self.createLinks(topojson.feature(towns, towns.objects.myTowns).features)
            self.markerG.selectAll(".town")
                .data(topojson.feature(towns, towns.objects.myTowns).features)
                .enter().append("path")
                .attr("class", function (d, i) {
                    return "town town" + i;
                })
                .attr("d", self.path.pointRadius(5))
                .on("mouseover", function () {
                    var marker = d3.select(this)
                    var strVal = marker.attr("class")
                    var indexVal = strVal.charAt(strVal.length - 1)
                    var dataSet = marker.data()[0]
                    var back = d3.select("#back" + indexVal)
                        .text(dataSet.properties.timestamp)
                    var front = d3.select("#front" + indexVal)
                        .text(dataSet.properties.timestamp)
                })
                .on("mouseout", function () {
                    var marker = d3.select(this)
                    var strVal = marker.attr("class")
                    var indexVal = strVal.charAt(strVal.length - 1)
                    var dataSet = marker.data()[0]
                    var back = d3.select("#back" + indexVal)
                        .text(dataSet.properties.Name)
                    var front = d3.select("#front" + indexVal)
                        .text(dataSet.properties.Name)
                });

            self.backText.selectAll(".label-backing")
                .data(topojson.feature(towns, towns.objects.myTowns).features)
                .enter().append("text")
                .attr("class", "label-backing")
                .attr("id", function (d, i) {
                    return "back" + i;
                })
                .attr("transform", function (d) {
                    return "translate(" + self.projection(d.geometry.coordinates) + ")";
                })
                .attr("dy", function (d) {
                    if (d.properties.Name === "San Antonio" || d.properties.Name === "Champaign" || d.properties.Name === "Houston") {
                        return ".9em";
                    } else {
                        return "-.5em"
                    }
                })
                .attr("dx", function (d) {
                    if (d.properties.Name === "Houston" || d.properties.Name === "Reston" || d.properties.Name === "Virginia Beach") {
                        return ".7em";
                    } else {
                        return "-.5em"
                    };
                })
                .text(function (d) {
                    return d.properties.Name;
                })
                .style("text-anchor", function (d) {
                    if (d.properties.Name === "Houston" || d.properties.Name === "Reston" || d.properties.Name === "Virginia Beach") {
                        return "start";
                    } else {
                        return "end"
                    };
                });

            self.labelText.selectAll(".place-label")
                .data(topojson.feature(towns, towns.objects.myTowns).features)
                .enter().append("text")
                .attr("class", "place-label")
                .attr("id", function (d, i) {
                    return "front" + i;
                })
                .attr("transform", function (d) {
                    return "translate(" + self.projection(d.geometry.coordinates) + ")";
                })
                .attr("dy", function (d) {
                    if (d.properties.Name === "San Antonio" || d.properties.Name === "Champaign" || d.properties.Name === "Houston") {
                        return ".9em";
                    } else {
                        return "-.5em"
                    }
                })
                .attr("dx", function (d) {
                    if (d.properties.Name === "Houston" || d.properties.Name === "Reston" || d.properties.Name === "Virginia Beach") {
                        return ".5em";
                    } else {
                        return "-.5em"
                    };
                })
                .text(function (d) {
                    return d.properties.Name;
                })
                .style("text-anchor", function (d) {
                    if (d.properties.Name === "Houston" || d.properties.Name === "Reston" || d.properties.Name === "Virginia Beach") {
                        return "start";
                    } else {
                        return "end"
                    };
                });

            self.labelsOn = function () {

            }

            self.lineG.selectAll(".arc")
                .data(self.links)
                .enter()
                .append("path")
                .attr({
                    "class": "arc"
                })
                .attr({
                    d: self.path
                })
                .style({
                    fill: "none",
                    stroke: "#000",
                    "stroke-width": "3px"
                })
                .attr("stroke-dasharray", function () {
                    return this.getTotalLength() + " " + this.getTotalLength();
                })
                .attr("stroke-dashoffset", function () {
                    return this.getTotalLength()
                })
                .transition()
                .delay(function (d, i) {
                    return i * 500;
                })
                .duration(500)
                .ease("linear")
                .attr("stroke-dashoffset", 0)
                .each("end", self.labelsOn);


        })
        //})

    self.createLinks = function (json) {
        var links = [];

        for (var i = 0, len = json.length - 1; i < len; i++) {
            var xVal = json[i].geometry.coordinates[0];
            var yVal = json[i].geometry.coordinates[1];
            var xVal1 = json[i + 1].geometry.coordinates[0];
            var yVal1 = json[i + 1].geometry.coordinates[1];
            /*                if (xVal < -105) {
                                xVal += 40;
                                yVal +=2.5;
                            }
                            if (xVal1 < -105) {
                                xVal1 += 40;
                                yVal1 +=2.5;
                            }*/
            links.push({
                type: "LineString",
                coordinates: [
                [xVal, yVal],
                [xVal1, yVal1]
                ]
            });
        }
        return links;
    };

});
