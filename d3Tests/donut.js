var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 90);

var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
        return d.value;
    });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("donut.json", function (error, data) {
    var g = svg.selectAll(".arc")
        .data(pie(data.donut))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            return color(d.value);
        })
        .attr("class", function (d) {
            return d.data.name;
        })
        .transition()
        .ease("bounce")
        .duration(2000)
        .attrTween("d", tweenPie)
        .transition()
        .ease("elastic")
        .delay(function (d, i) {
            return 2000 + i * 50;
        })
        .duration(750)
        .attrTween("d", tweenDonut);

    g.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.age;
        });

});

function tweenPie(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({
        startAngle: 0,
        endAngle: 0
    }, b);
    return function (t) {
        return arc(i(t));
    };
}

function tweenDonut(b) {
    b.innerRadius = radius * .6;
    var i = d3.interpolate({
        innerRadius: 0
    }, b);
    return function (t) {
        return arc(i(t));
    };
}

function tweenArc(b) {
    return function (a, i) {
        var d = b.call(this, a, i),
            i = d3.interpolate(a, d);
        for (var k in d) a[k] = d[k]; // update data
        return function (t) {
            return arc(i(t));
        };
    };
}

$(".makeBig").click(function () {
    d3.select(".loris")
        .transition()
        .ease("bounce")
        .duration(2000)
        .attrTween("d", tweenArc(function (d, i) {
            return {
                innerRadius: radius-10
            };
        }));
});