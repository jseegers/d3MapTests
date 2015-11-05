var options = {
    pointDot: false,
    scaleShowGridLines: false,
    scaleShowLabels: false
};
var data = {
    labels: ["", "", ""],
    datasets: [
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 40, 40]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 45, 45]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 55, 55]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 65, 65]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 75, 75]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 85, 85]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 50, 50]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 60, 60]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 70, 70]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 80, 80]
        },
        {
            fillColor: "rgba(151,187,205,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [65, 90, 90]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 45, 45]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 55, 55]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 65, 65]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 75, 75]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 85, 85]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 40, 40]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 50, 50]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 60, 60]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 70, 70]
        },
        {
            fillColor: "rgba(220,220,220,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 80, 80]
        },
        {
            fillColor: "rgba(151,187,205,0.0)",
            strokeColor: "rgba(220,220,220,1)",
            data: [35, 90, 90]
        }
    ]
};

var ctx = $("#myChart").get(0).getContext("2d");
// This will get the first returned node in the jQuery collection.
var myLineChart = new Chart(ctx).Line(data, options);