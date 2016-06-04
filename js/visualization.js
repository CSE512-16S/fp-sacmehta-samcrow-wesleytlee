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
var source = ["Took CSE 142", "Took CSE 143", "Didn't Take CSE 143", "Applied for Major", "Didn't applied for Major"];
var target = ["Accept", "Deny", "Soft Deny"];

d3.csv("./data/studentDataF.csv", function(error, data) {
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
    if(data.length) {
      updateDataWithTransition(data)
    } else {
       //**Return an error message or something**
       alert("\nNo students satisfying filter!\n ")
    }
}

/**
 * Creates and returns a FilterGroup
 */
function createFilters() {
    var group = new FilterGroup()

    var gender = new StringFilter('gender', ['M', 'F'], 'Sex')
    var ethnic = new StringFilter('ethnic', ['African American',	'American Indian','Asian','Caucasian','Hawaiian/Pacific Islander','Not Indicated'], 'Ethnicity')
    var application_count = new CheckBoxFilter('numAdmApplication', [0, 1, 2, 3, 4], 'Application count')
    var gpa = new RangeFilter('GPA', 0.0, 4.0, 0.01, 'GPA')
    //number of cse 142 and cse 143 attempts
/*  var cse142Grade = new RangeFilter('cse142grade', 0.0, 4.0, 0.01, 'CSE 142 Grade')
    var cse143Grade = new RangeFilter('cse143grade', 0.0, 4.0, 0.01, 'CSE 143 Grade')
    var SATMath = new RangeFilter('stdmath', 200, 800, 20, 'SAT Math')
    var SATVerbal = new RangeFilter('stdverbal', 200, 800, 20, 'SAT Verbal')
    var SAT = new RangeFilter('stdcomb', 400, 1600, 50, 'SAT')
    var survey5b = new CheckBoxFilter('Q5b', ['1','2','3','4'], '142 Required')
    var survey5d = new CheckBoxFilter('Q5d', ['1','2','3','4'], 'Progamming Interest')
    var survey5e = new CheckBoxFilter('Q5e', ['1','2','3','4'], 'Frend Rec. 142')
    var survey5f = new CheckBoxFilter('Q5f', ['1','2','3','4'], 'Acad. Adv. Rec. 142')
    var survey7a = new CheckBoxFilter('Q7a', ['1','2','3','4','5'], 'Interest in Major')
    var survey8a = new CheckBoxFilter('Q8a', ['1','2','3','4','5'], 'Low Acceptance Rate')
    var survey8c = new CheckBoxFilter('Q8c', ['1','2','3','4','5'], 'Students are Competitive')
    var survey8d = new CheckBoxFilter('Q8d', ['1','2','3','4','5'], 'More than just Programming')
    var survey8e = new CheckBoxFilter('Q8e', ['1','2','3','4','5'], 'Easy to find high pay')
    var survey8g = new CheckBoxFilter('Q8g', ['1','2','3','4','5'], 'Spend all time at computer')
    var survey8i = new CheckBoxFilter('Q8i', ['1','2','3','4','5'], 'Less Social')
    var survey9 = new CheckBoxFilter('Q9', ['1','2','3','4','5','6'], '# Prog. Courses Prev. Taken')
    var survey11 = new CheckBoxFilter('Q11', ['1','2','3','4','5'], 'Prev. Self Prog. Exp.') */
    group.addFilter(gender)
    group.addFilter(ethnic)
    group.addFilter(application_count)
    group.addFilter(gpa)
    /*group.addFilter(cse142Grade)
    group.addFilter(cse143Grade)
    group.addFilter(SATMath)
    group.addFilter(SATVerbal)
    group.addFilter(SAT)
    group.addFilter(survey5b)
    group.addFilter(survey5d)
    group.addFilter(survey5e)
    group.addFilter(survey5f)
    group.addFilter(survey7a)
    group.addFilter(survey8a)
    group.addFilter(survey8c)
    group.addFilter(survey8d)
    group.addFilter(survey8e)
    group.addFilter(survey8g)
    group.addFilter(survey8i)
    group.addFilter(survey9)
    group.addFilter(survey11)*/
    return group
}
