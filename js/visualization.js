var units = "Students";
var margin = {top: 10, right: 150, bottom: 10, left: 10},
 width = 760 - margin.left - margin.right,
 height = 600 - margin.top - margin.bottom;
var formatNumber = d3.format(",.0f"),  // zero decimal places
 format = function(d) { return formatNumber(d) + " " + units; };
 //color = d3.scale.category20();
// append the svg canvas to the page
var svg = d3.select("#svg1")//select("#chart").append("svg1")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
.append("g")
 .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

var svgNew = d3.select("#svg2")
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



//parameter for Bar graph
/*var formatPercent = d3.format(".0%");
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
    .range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var svgBar = d3.select("#svg3")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

var chartBar = nv.models.discreteBarChart()
			.options({
                duration: 300,
                useInteractiveGuideline: true
            });


// Set up filters for SVG1

var installFilterAddMenu = function(selectId, group) {
    var select = document.getElementById(selectId)
    var parent = select.parentNode
    parent.replaceChild(group.getFilterAddMenu(), select)
}

var filters = createFilters()
var filterContainer = document.querySelector('.filter-container')
filterContainer.appendChild(filters.getRoot())
var filterApplyButton = document.getElementById('filter-apply-button')
filterApplyButton.onclick = filterGroupVisualize
var filterResetButton1 = document.getElementById('filter-reset-button')
filterResetButton1.onclick = function() {
    filters.reset()
    filterGroupVisualize()
}
installFilterAddMenu('filter-add-1', filters)

// Set up filters for SVG2
var filtersNew = createFilters()
var filterContainerNew = document.querySelector('.filter-container-new')
filterContainerNew.appendChild(filtersNew.getRoot())
var filterApplyButtonNew = document.getElementById('filter-apply-button-new')
filterApplyButtonNew.onclick = filterGroupVisualizeNew
var filterResetButton2 = document.getElementById('filter-reset-button-new')
filterResetButton2.onclick = function() {
    filtersNew.reset()
    filterGroupVisualizeNew()
}
installFilterAddMenu('filter-add-2', filtersNew)

// load the data
var globalData = null
var source = ["Took CSE 142", "Took CSE 143", "Didn't Take CSE 143", "Applied", "Did not apply"];
var target = ["Accept", "Deny", "Soft Deny"];

var dataNew = null
d3.csv("./data/studentDataF.csv", function(error, data) {
    if (error) {
        alert(error)
        return
    }
    globalData = data
    dataNew = data
    renderData(data)
    renderDataNew(data)
});

function filterGroupVisualize() {
    // Apply filters
    var data = []
    var predicate = filters.getPredicate();
    console.log(predicate)
    for (var i = 0; i < globalData.length; i++) {
        var item = globalData[i]
        if (predicate.matches(item)) {
            data.push(item)
        }
    }
    // Continue
    if(data.length) {
      updateDataWithTransition(data)
    } else {
       //**Return an error message or something**
       alert("No students satisfying filter!")
    }
}

function filterGroupVisualizeNew() {
    // Apply filters
    var data = []
    var predicate = filtersNew.getPredicate();
    for (var i = 0; i < dataNew.length; i++) {
        var item = dataNew[i]
        if (predicate.matches(item)) {
            data.push(item)
        }
    }
    // Continue
    if(data.length) {
      updateDataWithTransitionNew(data)
    } else {
       //**Return an error message or something**
       alert("No students satisfying filter!")
    }
}

/**
 * Creates and returns a FilterGroup
 */
function createFilters() {

    var filters = [
        {
            name: 'Gender',
            filter: new StringFilter('gender', ['M', 'F'], 'Gender')
        },
        {
            name: 'Ethnicity',
            filter: new StringFilter('ethnic', ['African American',	'American Indian','Asian','Caucasian','Hawaiian/Pacific Islander','Not Indicated'], 'Ethnicity')
        },
        {
            name: 'Application count',
            filter: new CheckBoxFilter('numAdmApplication', [0, 1, 2, 3, 4], 'Application count')
        },
        {
            name: 'GPA',
            filter: new RangeFilter('GPA', 0.0, 4.0, 0.01, 'GPA')
        },
        {
            name: 'CSE 142 grade',
            filter: new RangeFilter('cse142grade', 0.0, 4.0, 0.01, 'CSE 142 Grade')
        },
        {
            name: 'CSE 143 grade',
            filter: new RangeFilter('cse143grade', 0.0, 4.0, 0.01, 'CSE 143 Grade')
        },
        {
            name: 'SAT math',
            filter: new RangeFilter('stdmath', 200, 800, 20, 'SAT Math')
        },
        {
            name: 'SAT verbal',
            filter: new RangeFilter('stdverbal', 200, 800, 20, 'SAT Verbal')
        },
        {
            name: 'SAT combined',
            filter: new RangeFilter('stdcomb', 400, 1600, 50, 'SAT')
        },
        {
            name: '142 required',
            filter: new CheckBoxFilter('Q5b', ['1','2','3','4'], '142 Required')
        },
        {
            name: 'Programming interest',
            filter: new CheckBoxFilter('Q5d', ['1','2','3','4'], 'Progamming Interest')
        },
        {
            name: 'Friend recommended 142',
            filter: new CheckBoxFilter('Q5e', ['1','2','3','4'], 'Frend Rec. 142')
        },
        {
            name: 'Academic advisor recommended 142',
            filter: new CheckBoxFilter('Q5f', ['1','2','3','4'], 'Acad. Adv. Rec. 142')
        },
        {
            name: 'Interested in major',
            filter: new CheckBoxFilter('Q7a', ['1','2','3','4','5'], 'Interest in Major')
        },
        {
            name: 'Low acceptance rate',
            filter: new CheckBoxFilter('Q8a', ['1','2','3','4','5'], 'Low Acceptance Rate')
        },
        {
            name: 'Students are competitive',
            filter: new CheckBoxFilter('Q8c', ['1','2','3','4','5'], 'Students are Competitive')
        },
        {
            name: 'More than just programming',
            filter: new CheckBoxFilter('Q8d', ['1','2','3','4','5'], 'More than just Programming')
        },
        {
            name: 'Easy to find high pay',
            filter: new CheckBoxFilter('Q8e', ['1','2','3','4','5'], 'Easy to find high pay')
        },
        {
            name: 'Spend all time at computer',
            filter: new CheckBoxFilter('Q8g', ['1','2','3','4','5'], 'Spend all time at computer')
        },
        {
            name: 'Less social',
            filter: new CheckBoxFilter('Q8i', ['1','2','3','4','5'], 'Less Social')
        },
        {
            name: 'Previous programming courses taken',
            filter: new CheckBoxFilter('Q9', ['1','2','3','4','5','6'], '# Prog. Courses Prev. Taken')
        },
        {
            name: 'Previous programming experience',
            filter: new CheckBoxFilter('Q11', ['1','2','3','4','5'], 'Prev. Self Prog. Exp.')
        },
    ]

    var group = new FilterGroup(filters)

    // var gender = new StringFilter('gender', ['M', 'F'], 'Sex')
    // var ethnic = new StringFilter('ethnic', ['African American',	'American Indian','Asian','Caucasian','Hawaiian/Pacific Islander','Not Indicated'], 'Ethnicity')
    // var application_count = new CheckBoxFilter('numAdmApplication', [0, 1, 2, 3, 4], 'Application count')
    // var gpa = new RangeFilter('GPA', 0.0, 4.0, 0.01, 'GPA')
    // //number of cse 142 and cse 143 attempts
    // var cse142Grade = new RangeFilter('cse142grade', 0.0, 4.0, 0.01, 'CSE 142 Grade')
    // var cse143Grade = new RangeFilter('cse143grade', 0.0, 4.0, 0.01, 'CSE 143 Grade')
    // var SATMath = new RangeFilter('stdmath', 200, 800, 20, 'SAT Math')
    // var SATVerbal = new RangeFilter('stdverbal', 200, 800, 20, 'SAT Verbal')
    // var SAT = new RangeFilter('stdcomb', 400, 1600, 50, 'SAT')
    // var survey5b = new CheckBoxFilter('Q5b', ['1','2','3','4'], '142 Required')
    // var survey5d = new CheckBoxFilter('Q5d', ['1','2','3','4'], 'Progamming Interest')
    // var survey5e = new CheckBoxFilter('Q5e', ['1','2','3','4'], 'Frend Rec. 142')
    // var survey5f = new CheckBoxFilter('Q5f', ['1','2','3','4'], 'Acad. Adv. Rec. 142')
    // var survey7a = new CheckBoxFilter('Q7a', ['1','2','3','4','5'], 'Interest in Major')
    // var survey8a = new CheckBoxFilter('Q8a', ['1','2','3','4','5'], 'Low Acceptance Rate')
    // var survey8c = new CheckBoxFilter('Q8c', ['1','2','3','4','5'], 'Students are Competitive')
    // var survey8d = new CheckBoxFilter('Q8d', ['1','2','3','4','5'], 'More than just Programming')
    // var survey8e = new CheckBoxFilter('Q8e', ['1','2','3','4','5'], 'Easy to find high pay')
    // var survey8g = new CheckBoxFilter('Q8g', ['1','2','3','4','5'], 'Spend all time at computer')
    // var survey8i = new CheckBoxFilter('Q8i', ['1','2','3','4','5'], 'Less Social')
    // var survey9 = new CheckBoxFilter('Q9', ['1','2','3','4','5','6'], '# Prog. Courses Prev. Taken')
    // var survey11 = new CheckBoxFilter('Q11', ['1','2','3','4','5'], 'Prev. Self Prog. Exp.')
    // group.addFilter(gender)
    // group.addFilter(ethnic)
    // group.addFilter(application_count)
    // group.addFilter(gpa)
    // group.addFilter(cse142Grade)
    // group.addFilter(cse143Grade)
    // group.addFilter(SATMath)
    // group.addFilter(SATVerbal)
    // group.addFilter(SAT)
    // group.addFilter(survey5b)
    // group.addFilter(survey5d)
    // group.addFilter(survey5e)
    // group.addFilter(survey5f)
    // group.addFilter(survey7a)
    // group.addFilter(survey8a)
    // group.addFilter(survey8c)
    // group.addFilter(survey8d)
    // group.addFilter(survey8e)
    // group.addFilter(survey8g)
    // group.addFilter(survey8i)
    // group.addFilter(survey9)
    // group.addFilter(survey11)
    return group
}
