var diameter = 960,
            format = d3.format(",d");

        var pack = d3.layout.pack()
            .size([diameter - 4, diameter - 4])
            .value(function (d) {
                return d.size;
            });

        var svg = d3.select("body").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .append("g")
            .attr("transform", "translate(2,2)");

        var force = d3.layout.force()
            .size([diameter, diameter])
            .gravity(.02)
            .charge(0)


        d3.json("flare.json", function (error, root) {
            if (error) throw error;
            var nodes = root.children
            var node = svg.datum(root).selectAll(".node")
                .data(pack.nodes)
                .enter().append("g")
                .attr("class", function (d) {
                    return d.children ? "node" : "leaf node";
                })
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            node.append("title")
                .text(function (d) {
                    return d.name + (d.children ? "" : ": " + format(d.size));
                });

            node.append("circle")
                .attr("r", function (d) {
                    return d.r;
                });

            node.filter(function (d) {
                    return !d.children;
                }).append("text")
                .attr("dy", ".3em")
                .style("text-anchor", "middle")
                .text(function (d) {
                    return d.name.substring(0, d.r / 3);
                });

            node.transition()
                .duration(750)
                .delay(function (d, i) {
                    return i * 5;
                })
                .attrTween("r", function (d) {
                    var i = d3.interpolate(0, d.radius);
                    return function (t) {
                        return d.radius = i(t);
                    };
                });

            force
                .nodes(pack.nodes)
                .on("tick", tick)
                .start();

            function tick(e) {
                node
                    .each(collide(.5))
                    .attr("cx", function (d) {
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        return d.y;
                    });
            }

            function cluster(alpha) {
                return function (d) {
                    var cluster = clusters[d.cluster];
                    if (cluster === d) return;
                    var x = d.x - cluster.x,
                        y = d.y - cluster.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + cluster.radius;
                    if (l != r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        cluster.x += x;
                        cluster.y += y;
                    }
                };
            }

            // Resolves collisions between d and all other circles.
            function collide(alpha) {
                var quadtree = d3.geom.quadtree(nodes);
                return function (d) {
                    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
                        nx1 = d.x - r,
                        nx2 = d.x + r,
                        ny1 = d.y - r,
                        ny2 = d.y + r;
                    quadtree.visit(function (quad, x1, y1, x2, y2) {
                        if (quad.point && (quad.point !== d)) {
                            var x = d.x - quad.point.x,
                                y = d.y - quad.point.y,
                                l = Math.sqrt(x * x + y * y),
                                r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
                            if (l < r) {
                                l = (l - r) / l * alpha;
                                d.x -= x *= l;
                                d.y -= y *= l;
                                quad.point.x += x;
                                quad.point.y += y;
                            }
                        }
                        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                    });
                };
            }
        });

        d3.select(self.frameElement).style("height", diameter + "px");