// The table generation function
d3.table = function(config) {
	var columns = [];//["Mean", "Maximum", "Minimum"];

	var tbl = function(selection) {
	if (columns.length == 0){
		columns = d3.keys(selection.data()[0][0])
	}; 
	var index = columns.indexOf("num");
	if(index > -1){
		columns.splice(index, 1);
	}
	// Creating the table
	selection.selectAll('table').data([0]).enter().append('table1');
	var table = selection.select('#table1');

	table.selectAll('thead').data([0]).enter().append('thead');
	var thead = table.select('thead');

	table.selectAll('tbody').data([0]).enter().append('tbody');
	var tbody = table.select('tbody');

	// appending the header row
	var th = thead.selectAll("th")
		.data(columns)

	th.enter().append("th");
	    th.text(function(d) { return d });
	th.exit().remove()

	// creating a row for each object in the data
	var rows = tbody.selectAll('tr')
	    .data(function(d) { return d; })

	rows.enter().append("tr");
	rows.attr('data-row',function(d,i){return i});
	rows.exit().remove();   

	// creating a cell for each column in the rows
	var cells = rows.selectAll("td")
		.data(function(row) {
	    return columns.map(function(key) {
		        return {key:key, value:row[key]};
	    });
		})

	cells.enter().append("td");
	cells.text(function(d) { return d.value; })
	    .attr('data-col',function(d,i){return i})
	    .attr('data-key',function(d,i){return d.key});

	cells.exit().remove();

	return tbl;
	};

	tbl.columns = function(_) {
	if (!arguments.length) return columns;
		columns = _;
		return this;
	};

	return tbl;
};


d3.table1 = function(config) {
	var columns = [];//["Mean", "Maximum", "Minimum"];

	var tbl = function(selection) {
	if (columns.length == 0) columns = d3.keys(selection.data()[0][0]); 

	var index = columns.indexOf("num");
	if(index > -1){
		columns.splice(index, 1);
	}

	// Creating the table
	selection.selectAll('table').data([0]).enter().append('table2');
	var table = selection.select('#table2');

	table.selectAll('thead').data([0]).enter().append('thead');
	var thead = table.select('thead');

	table.selectAll('tbody').data([0]).enter().append('tbody');
	var tbody = table.select('tbody');

	// appending the header row
	var th = thead.selectAll("th")
		.data(columns)

	th.enter().append("th");
	    th.text(function(d) { return d });
	th.exit().remove()

	// creating a row for each object in the data
	var rows = tbody.selectAll('tr')
	    .data(function(d) { return d; })

	rows.enter().append("tr");
	rows.attr('data-row',function(d,i){return i});
	rows.exit().remove();   

	// creating a cell for each column in the rows
	var cells = rows.selectAll("td")
		.data(function(row) {
	    return columns.map(function(key) {
		        return {key:key, value:row[key]};
	    });
		})

	cells.enter().append("td");
	cells.text(function(d) { return d.value; })
	    .attr('data-col',function(d,i){return i})
	    .attr('data-key',function(d,i){return d.key});

	cells.exit().remove();

	return tbl;
	};

	tbl.columns = function(_) {
	if (!arguments.length) return columns;
		columns = _;
		return this;
	};

	return tbl;
};

function highlight_node_links(node, i) {
    var remainingNodes = [],
        nextNodes = [];

    var stroke_opacity = 0.9;

    var traverse = [{
        linkType: "sourceLinks",
        nodeType: "target"
    }, {
        linkType: "targetLinks",
        nodeType: "source"
    }];

    traverse.forEach(function(step) {
        node[step.linkType].forEach(function(link) {
            remainingNodes.push(link[step.nodeType]);
            highlight_link(link.id, stroke_opacity);
        });

        while (remainingNodes.length) {
            nextNodes = [];
            remainingNodes.forEach(function(node) {
                node[step.linkType].forEach(function(link) {
                    nextNodes.push(link[step.nodeType]);
                    highlight_link(link.id, stroke_opacity);
                });
            });
            remainingNodes = nextNodes;
        }
    });
}

function highlight_node_links_mouseout(node, i) {
    //console.log("De-emphasize");
    var remainingNodes = [],
        nextNodes = [];

    var stroke_opacity = 0.2;
    var traverse = [{
        linkType: "sourceLinks",
        nodeType: "target"
    }, {
        linkType: "targetLinks",
        nodeType: "source"
    }];

    traverse.forEach(function(step) {
        node[step.linkType].forEach(function(link) {
            remainingNodes.push(link[step.nodeType]);
            highlight_link(link.id, stroke_opacity);
        });

        while (remainingNodes.length) {
            nextNodes = [];
            remainingNodes.forEach(function(node) {
                node[step.linkType].forEach(function(link) {
                    nextNodes.push(link[step.nodeType]);
                    highlight_link(link.id, stroke_opacity);
                });
            });
            remainingNodes = nextNodes;
        }
    });
}

function highlight_link(id, opacity) {
    d3.select("#link-" + id).style("stroke-opacity", opacity);
}


function colorNode(node) {
	if(node.value < 1){
		return '#ffffff';	
	}

    var id = node.name;
    if (id == source[0]) {
        return '#2c7bb6';
    } else if (id == source[1]) {
        return '#2c7bb6';
    } else if (id == source[2]) {
        return '#d7191c';
    } else if (id == source[3]) {
        return '#2c7bb6';
    } else if (id == source[4]) {
        return '#d7191c';
    } else if (id == target[0]) {
        return '#2c7bb6';
    } else if (id == target[2]) {
        return '#ffff2a';
    } else if (id == target[1]) {
        return '#d7191c';
    } else {
        return '#ffffff';//'#ffed6f'
    }
}

function colorLink(node) {
    var id = node;
    if (id == 0) {
        return '#abd9e9';
    } else if (id == 1) {
        return '#fdae61';
    } else if (id == 2) {
        return '#abd9e9';
    } else if (id == 3) {
        return '#fdae61';
    } else if (id == 4) {
        return '#abd9e9';
    } else if (id == 5) {
        return '#fdae61';
    } else if (id == 6) {
        return '#ffffbf';
    } else {
        return '#ffffff';
    }
}

function linkOpacity(node) {
	var id = node.value;
	if (id < 1){
		return 0;	
	} else {
      return 0.7;
   }
}

//displayed when link is highlighted
function linkLabels(d){
	console.log(d.target.value, d.source.value)
	return   "Link Details"+ "\n" + d.source.name + " → " + d.target.name + "\n" + 
		"No. of students = " + d.value + "\n" + "Percentage ~ " + (((Math.round(d.target.value)/Math.round(d.source.value)) * 100)).toFixed(2) +"%";
}

//displayed when node is highlighted
function rectLabel(d){
	return "Node Name: "+ d.name; 
}

function nodeText(d){
	return d.name + "\n (" + Math.round(d.value) + ")";
}


