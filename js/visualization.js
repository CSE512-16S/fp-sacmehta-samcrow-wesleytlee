var units = "Students";
var margin = {top: 10, right: 150, bottom: 10, left: 10},
 width = 760 - margin.left - margin.right,
 height = 400 - margin.top - margin.bottom;
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
 .nodePadding(30)
 .size([width, height]);
var path = sankey.link();

//parameter for Bar graph
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
var source = ["Took CSE 142", "Took CSE 143", "Didn't Take CSE 143", "Applied", "Did Not Apply"];
var target = ["Accepted", "Denied", "Soft Denied"];

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
    if(data.length > 1) {
        try {
            updateDataWithTransition(data)
        } catch (e) {
            alert('None of the students in the selection applied to the CSE major')
        }
    } else {
        alert('Not enough students satisfying filter')
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
    if(data.length > 1) {
        try {
            updateDataWithTransitionNew(data)
        } catch (e) {
            alert('None of the students in the selection applied to the CSE major')
        }
    } else {
        alert('Not enough students satisfying filter')
    }
}

/**
 * Creates and returns a FilterGroup
 */
function createFilters() {

    var filters = [
        {
            name: 'Sex',
            filter: new StringFilter('gender', ['M', 'F'], 'Sex')
        },
        {
            name: 'Ethnicity',
            filter: new StringFilter('ethnic', ['African American',	'American Indian','Asian','Caucasian','Hawaiian/Pacific Islander','Not Indicated'], 'Ethnicity')
        },
        {
            name: 'Overall GPA',
            filter: new RangeFilter('GPA', 0.0, 4.0, 0.01, 'Overall GPA')
        },
        {
            name: 'Grade in CSE 142',
            filter: new RangeFilter('cse142grade', 0.0, 4.0, 0.01, 'Grade in CSE 142')
        },
        {
            name: 'Grade in CSE 143',
            filter: new RangeFilter('cse143grade', 0.0, 4.0, 0.01, 'Grade in CSE 143')
        },
        {
            name: 'Application Score',
            filter: new RangeFilter('appscores', 1.0, 5.0, 0.1, 'Application Score')
        },        
        {
            name: '# Attempts of CSE 142',
            filter: new CheckBoxFilter('cse142', [1, 2, 3, 4], '# Attempts of CSE 142')
        },
        {
            name: '# Attempts of CSE 143',
            filter: new CheckBoxFilter('cse143', [1, 2, 3, 4], '# Attempts of CSE 143')
        },
        {
            name: '# of Applications',
            filter: new CheckBoxFilter('numAdmApplication', [1, 2, 3, 4], '# of Applications')
        },
                {
            name: 'Class when First Taking CSE 142',
            filter: new CheckBoxFilter('cse142firstclass', [1, 2, 3, 4], 'Class when First Taking CSE 142')
        },
        {
            name: 'Class when First Taking CSE 143',
            filter: new CheckBoxFilter('cse143firstclass', [1, 2, 3, 4], 'Class when First Taking CSE 143')
        },
        {
            name: 'SAT Math Score',
            filter: new RangeFilter('stdmath', 200, 800, 20, 'SAT Math Score')
        },
        {
            name: 'SAT Verbal Score',
            filter: new RangeFilter('stdverbal', 200, 800, 20, 'SAT Verbal Score')
        },
        {
            name: 'Total SAT Score',
            filter: new RangeFilter('stdcomb', 400, 1600, 50, 'Total SAT Score')
        },
        {
            name: 'CSE 142 is a Requirement?',
            filter: new CheckBoxFilter('Q5b', ['1','2','3','4'], 'CSE 142 is a Requirement (Likert)')
        },
        {
            name: 'Interested in Progamming?',
            filter: new CheckBoxFilter('Q5d', ['1','2','3','4'], 'Interested in Progamming? (Likert)')
        },
        {
            name: 'A Friend Recommended 142',
            filter: new CheckBoxFilter('Q5e', ['1','2','3','4'], 'A Friend Recommended 142 (Likert)')
        },
        {
            name: 'An Academic Advsr Recommended 142',
            filter: new CheckBoxFilter('Q5f', ['1','2','3','4'], 'An Academic Advsr Recommended 142 (Likert)')
        },
        {
            name: 'Interested in the Major?',
            filter: new CheckBoxFilter('Q7a', ['1','2','3','4','5'], 'Interested in Major? (Likert)')
        },
        {
            name: 'CSE has a Low Acceptance Rate',
            filter: new CheckBoxFilter('Q8a', ['1','2','3','4','5'], 'CSE has a Low Acceptance Rate (Likert)')
        },
        {
            name: 'Students are Competitive',
            filter: new CheckBoxFilter('Q8c', ['1','2','3','4','5'], 'Students are Competitive (Likert)')
        },
        {
            name: 'CSE is More than Just Programming',
            filter: new CheckBoxFilter('Q8d', ['1','2','3','4','5'], 'CSE is more than just Programming (Likert)')
        },
        {
            name: 'Leads to High Salary Jobs?',
            filter: new CheckBoxFilter('Q8e', ['1','2','3','4','5'], 'Leads to High Salary Jobs? (Likert)')
        },
        {
            name: 'Students Spend All Time at a Computer',
            filter: new CheckBoxFilter('Q8g', ['1','2','3','4','5'], 'Students Spend all Time at Computer (Likert)')
        },
        {
            name: 'Students are Less Social',
            filter: new CheckBoxFilter('Q8i', ['1','2','3','4','5'], 'Students are Less Social (Likert)')
        },
        {
            name: '# of Prog. Courses Prev. Taken',
            filter: new CheckBoxFilter('Q9', ['1','2','3','4','5','6'], '# of Prog. Courses Prev. Taken')
        },
        {
            name: 'Prev. Self Prog. Experience',
            filter: new CheckBoxFilter('Q11', ['1','2','3','4','5'], 'Prev. Self Prog. Experience (Likert)')
        },
    ]

    var group = new FilterGroup(filters)
    
    return group
}
