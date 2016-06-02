var units = "Students";
       var margin = {top: 10, right: 10, bottom: 10, left: 10},
         width = 800 - margin.left - margin.right,
         height = 600 - margin.top - margin.bottom;
       var formatNumber = d3.format(",.0f"),  // zero decimal places
         format = function(d) { return formatNumber(d) + " " + units; };
         //color = d3.scale.category20();
       // append the svg canvas to the page
       var svg = d3.select("#chart").append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
        .append("g")
         .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
       // Set the sankey diagram properties
       var sankey = d3.sankey()
         .nodeWidth(36)
         .nodePadding(10)
         .size([width, height]);
       var path = sankey.link();

// Set up filters
var filters = createFilters()
var filterContainer = document.querySelector('.filter-container')
filterContainer.appendChild(filters.getRoot())
var filterApplyButton = document.getElementById('filter-apply-button')
filterApplyButton.onclick = filterGroupVisualize

// load the data
var globalData = null
var source = ["Students", "CSE 142", "CSE 143", "CSE 143 - Not applied"];
var target = ["Enrolled", "Did not enroll", "Application Verified", "Accept", "Did not Apply", "Deny", "Soft Deny"];

d3.csv("./data/studentDataE.csv", function(error, data) {
    if (error) {
        alert(error)
        return
    }
    globalData = data
    renderData(data)
});

function filterGroupVisualize() {
    // Apply filters
    var data = []
    var predicate = filters.getPredicate();
    for (var i = 0; i < globalData.length; i++) {
        var item = globalData[i]
        if (predicate.matches(item)) {
            data.push(item)
        }
    }
    // Continue
    updateDataWithTransition(data)
}

/**
 * Creates and returns a FilterGroup
 */
function createFilters() {
    var group = new FilterGroup()

    var gender = new StringFilter('gender', ['M', 'F'], 'gender')
    var ethnic = new StringFilter('ethnic', ['AFRO-AM',	'AMER-IND','ASIAN','CAUCASN','HAW/PAC','NOT IND'], 'ethnic')
    var application_count = new CheckBoxFilter('numAdmApplication', [1, 2, 3, 4, 5, 6], 'Application count')
    group.addFilter(gender)
    group.addFilter(ethnic)
    group.addFilter(application_count)
    return group
}
