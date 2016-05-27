var weightDef = 0.01;
var transitionDuration = 1000;

function updateDataWithTransition(data){
	graph.nodes = []
	graph.links = []
	//filter data for stage 1
	var groupedStage1= d3.nest()
		      .key(function(d) { return d.source; })
		      .key(function(d) { return d.target142; })
		      .rollup(function(v) { return d3.sum(v, function(d) { return 1; }); })
		      .map(data);
	
	/*var maxGroupedStage1= d3.nest()
		      	.key(function(d) { return d.source; })
		      	.key(function(d) { return d.target142; })
		      	.rollup(function(v) {return d3.max(v, function(d){return +d.stdmath;});})
		      	.map(data);
	console.log(maxGroupedStage1)*/

	var weightStage1 = groupedStage1.student.CSE142;

	if(typeof(weightStage1) =="number"){
		graph.nodes.push({ "name": source[0]});
		graph.nodes.push({ "name": source[1]});
		graph.links.push({ "source": source[0],
		         "target": source[1],
		         "value": +weightStage1});
	}
	else{
		graph.nodes.push({ "name": source[0]});
		graph.nodes.push({ "name": source[1]});
		graph.links.push({ "source": source[0],
		         "target": source[1],
		         "value": +weightDef});
	}

	//filter data for stage 2
	var groupedStage2= d3.nest()
		        .key(function(d) { return d.source; })
		        .key(function(d) { return d.target142; })
		        .key(function(d) { return d.target143; })
		        .rollup(function(v) { return d3.sum(v, function(d) { return 1; }); })
		        .map(data);

	var weight1Stage2 = groupedStage2.student.CSE142.CSE143;
	var weight2Stage2 = groupedStage2.student.CSE142.NA143;

	if(typeof(weight1Stage2) =="number"){
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[2]});
		graph.links.push({ "source": source[1],
		         "target": source[2],
		         "value": +weight1Stage2});
	}	
	else{
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[2]});
		graph.links.push({ "source": source[1],
		         "target": source[2],
		         "value": +weightDef});
	}	

	if(typeof(weight2Stage2) =="number"){
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[3]});
		graph.links.push({ "source": source[1],
		         "target": source[3],
		         "value": +weight2Stage2});
	}
	else{
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[3]});
		graph.links.push({ "source": source[1],
		         "target": source[3],
		         "value": +weightDef});
	}

	//filter data for stage 3
	var groupedStage3= d3.nest()
		        .key(function(d) { return d.source; })
		        .key(function(d) { return d.target142; })
		        .key(function(d) { return d.target143; })
		        .key(function(d) { return d.admitStatus; })
		        .rollup(function(v) { return d3.sum(v, function(d) { return 1; }); })
		        .map(data);

	var weight1Stage3 = groupedStage3.student.CSE142.CSE143.Enrolled;
	var weight2Stage3 = groupedStage3.student.CSE142.CSE143.DNE;
	var weight3Stage3 = groupedStage3.student.CSE142.CSE143.AV;
	var weight4Stage3 = groupedStage3.student.CSE142.CSE143.Accept;
	var weight5Stage3 = groupedStage3.student.CSE142.CSE143.DNA;
	var weight6Stage3 = groupedStage3.student.CSE142.CSE143.Deny;
	var weight7Stage3 = groupedStage3.student.CSE142.CSE143.SD;


	if(typeof(weight2Stage2) =="number"){
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[4]});
		graph.links.push({ "source": source[3],
		         "target": target[4],
		         "value": +weight2Stage2})
	}
	else{
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[4]});
		graph.links.push({ "source": source[3],
		         "target": target[4],
		         "value": +weightDef})
	}


	if(typeof(weight1Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[0]});
		graph.links.push({ "source": source[2],
			         "target": target[0],
			         "value": +weight1Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[0]});
		graph.links.push({ "source": source[2],
				         "target": target[0],
				         "value": +weightDef});
	}

	if(typeof(weight2Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[1]});
		graph.links.push({ "source": source[2],
		         "target": target[1],
		         "value": +weight2Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[1]});
		graph.links.push({ "source": source[2],
		         "target": target[1],
		         "value": +weightDef});
	}

	if(typeof(weight3Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[2]});
		graph.links.push({ "source": source[2],
		         "target": target[2],
		         "value": +weight3Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[2]});
		graph.links.push({ "source": source[2],
		         "target": target[2],
		         "value": +weightDef});
	}
	if(typeof(weight4Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[3]});
		graph.links.push({ "source": source[2],
		         "target": target[3],
		         "value": +weight4Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[3]});
		graph.links.push({ "source": source[2],
		         "target": target[3],
		         "value": +weightDef});
	}
	if(typeof(weight5Stage3) =="number"){
		 graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[4]});
		graph.links.push({ "source": source[2],
		         "target": target[4],
		         "value": +weight5Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[4]});
		graph.links.push({ "source": source[2],
		         "target": target[4],
		         "value": +weightDef});
	}

	if(typeof(weight6Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[5]});
		graph.links.push({ "source": source[2],
		         "target": target[5],
		         "value": +weight6Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[5]});
		graph.links.push({ "source": source[2],
		         "target": target[5],
		         "value": +weightDef});
	}

	if(typeof(weight7Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[6]});
		graph.links.push({ "source": source[2],
		         "target": target[6],
		         "value": +weight7Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[6]});
		graph.links.push({ "source": source[2],
		         "target": target[6],
		         "value": +weightDef});
	}
	//determine the nodes
	graph.nodes = d3.keys(d3.nest()
	     .key(function (d) { return d.name; })
	     .map(graph.nodes));

	// loop through each link replacing the text with its index from node
	graph.links.forEach(function (d, i) {
		graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
		graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
	});

	//now loop through each nodes to make nodes an array of objects
	// rather than an array of strings
	graph.nodes.forEach(function (d, i) {
		graph.nodes[i] = { "name": d };
	});

	sankey
		.nodes(graph.nodes)
		.links(graph.links)
		.layout(32);


	//interpolate = null;
	var link = svg.selectAll(".link");
	var node = svg.selectAll(".node");


	link.data(graph.links)
		.transition()
		.duration(transitionDuration) 
		.attr("class", "link")
		.attr("d", path)
		.attr("id", function(d,i){ return i;})
		.style("stroke-width", function(d) { return Math.max(0.1, d.dy); })
		.style("stroke", function(d, i){ 
				if(d.value >=1){
					return colorLink(i); 
				}
				else{ return '#ffffff';}
				})
		.style("stroke-opacity", function(d, i){ return linkOpacity(d); })
		.sort(function(a, b) { return (b.dy - a.dy); });


	svg.selectAll(".link>title")
		.data(graph.links)
		.transition()
		.text(function(d) {
			if(d.value >= 1){
				return linkLabels(d);}
			 });

	// add the rectangles for the nodes
	node.data(graph.nodes)
		.transition()
		.duration(transitionDuration)
		.attr("class", "node")
		.attr("transform", function(d) {
		return "translate(" + d.x + "," + d.y + ")";});
		
	  
	var rect = svg.selectAll("rect")
	
	//add node rectangle
	svg.selectAll("rect").data(graph.nodes)
		.transition()
		.duration(transitionDuration)
		.attr("height", function(d) { return d.dy; })
		.attr("width", sankey.nodeWidth())
		.style("fill", function(d) {
		return colorNode(d); })
		.style("stroke-opacity", function(d, i){ 				
				return linkOpacity(d); })
		.style("stroke", function(d) { 
			return '#000000'; });

	//add node title
	svg.selectAll(".node>rect>title")
		.data(graph.nodes)
		.transition()
		.duration(transitionDuration)
		.text(function(d) {
		if (d.value >=1){
			return rectLabel(d);}
		});

	//add rectangle label
	svg.selectAll("text")
		.data(graph.nodes)
		.transition()
		.duration(transitionDuration)
		.attr("x", -6)
		.attr("y", function(d) {
		return d.dy / 2;
		})
		.attr("dy", ".35em")
		.attr("text-anchor", "end")
		.attr("transform", null)
		.text(function(d) {
			if (d.value >=1){
			return nodeText(d);}
			})
		.filter(function(d) {
		return d.x < width / 2;
		})
		.attr("x", 6 + sankey.nodeWidth())
		.attr("text-anchor", "start");
}


function renderData(data){

	graph = {"nodes" : [], "links" : []};
	//filter data for stage 1
	var groupedStage1= d3.nest()
		        .key(function(d) { return d.source; })
		        .key(function(d) { return d.target142; })
		        .rollup(function(v) { return d3.sum(v, function(d) { return 1; }); })
		        .map(data);

	var weightStage1 = groupedStage1.student.CSE142;

	if(typeof(weightStage1) =="number"){
		graph.nodes.push({ "name": source[0]});
		graph.nodes.push({ "name": source[1]});
		graph.links.push({ "source": source[0],
		         "target": source[1],
		         "value": +weightStage1});
	}
	else{
		graph.nodes.push({ "name": source[0]});
		graph.nodes.push({ "name": source[1]});
		graph.links.push({ "source": source[0],
		         "target": source[1],
		         "value": +weightDef});
	}

	//filter data for stage 2
	var groupedStage2= d3.nest()
		        .key(function(d) { return d.source; })
		        .key(function(d) { return d.target142; })
		        .key(function(d) { return d.target143; })
		        .rollup(function(v) { return d3.sum(v, function(d) { return 1; }); })
		        .map(data);
	var weight1Stage2 = groupedStage2.student.CSE142.CSE143;
	var weight2Stage2 = groupedStage2.student.CSE142.NA143;

	if(typeof(weight1Stage2) =="number"){
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[2]});
		graph.links.push({ "source": source[1],
		         "target": source[2],
		         "value": +weight1Stage2});
	}
	else{
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[2]});
		graph.links.push({ "source": source[1],
		         "target": source[2],
		         "value": +weightDef});
	}		

	if(typeof(weight2Stage2) =="number"){
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[3]});
		graph.links.push({ "source": source[1],
		         "target": source[3],
		         "value": +weight2Stage2});
	}
	else{
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[3]});
		graph.links.push({ "source": source[1],
		         "target": source[3],
		         "value": +weightDef});
	}

	//filter data for stage 3
	var groupedStage3= d3.nest()
		        .key(function(d) { return d.source; })
		        .key(function(d) { return d.target142; })
		        .key(function(d) { return d.target143; })
		        .key(function(d) { return d.admitStatus; })
		        .rollup(function(v) { return d3.sum(v, function(d) { return 1; }); })
		        .map(data);
	var weight1Stage3 = groupedStage3.student.CSE142.CSE143.Enrolled;
	var weight2Stage3 = groupedStage3.student.CSE142.CSE143.DNE;
	var weight3Stage3 = groupedStage3.student.CSE142.CSE143.AV;
	var weight4Stage3 = groupedStage3.student.CSE142.CSE143.Accept;
	var weight5Stage3 = groupedStage3.student.CSE142.CSE143.DNA;
	var weight6Stage3 = groupedStage3.student.CSE142.CSE143.Deny;
	var weight7Stage3 = groupedStage3.student.CSE142.CSE143.SD;

	if(typeof(weight2Stage2) =="number"){
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[4]});
		graph.links.push({ "source": source[3],
		         "target": target[4],
		         "value": +weight2Stage2})
	}
	else{
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[4]});
		graph.links.push({ "source": source[3],
		         "target": target[4],
		         "value": +weightDef})
	}


	if(typeof(weight1Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[0]});
		graph.links.push({ "source": source[2],
				         "target": target[0],
				         "value": +weight1Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[0]});
		graph.links.push({ "source": source[2],
				         "target": target[0],
				         "value": +weightDef});
	}

	if(typeof(weight2Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[1]});
		graph.links.push({ "source": source[2],
		         "target": target[1],
		         "value": +weight2Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[1]});
		graph.links.push({ "source": source[2],
		         "target": target[1],
		         "value": +weightDef});
	}

	if(typeof(weight3Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[2]});
		graph.links.push({ "source": source[2],
		         "target": target[2],
		         "value": +weight3Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[2]});
		graph.links.push({ "source": source[2],
		         "target": target[2],
		         "value": +weightDef});
	}


	if(typeof(weight4Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[3]});
		graph.links.push({ "source": source[2],
		         "target": target[3],
		         "value": +weight4Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[3]});
		graph.links.push({ "source": source[2],
		         "target": target[3],
		         "value": +weightDef});
	}

	if(typeof(weight5Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[4]});
		graph.links.push({ "source": source[2],
		         "target": target[4],
		         "value": +weight5Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[4]});
		graph.links.push({ "source": source[2],
		         "target": target[4],
		         "value": +weightDef});
	}

	if(typeof(weight6Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[5]});
		graph.links.push({ "source": source[2],
		         "target": target[5],
		         "value": +weight6Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[5]});
		graph.links.push({ "source": source[2],
		         "target": target[5],
		         "value": +weightDef});
	}

	if(typeof(weight7Stage3) =="number"){
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[6]});
		graph.links.push({ "source": source[2],
		         "target": target[6],
		         "value": +weight7Stage3});
	}
	else{
		graph.nodes.push({ "name": source[2]});
		graph.nodes.push({ "name": target[6]});
		graph.links.push({ "source": source[2],
		         "target": target[6],
		         "value": +weightDef});
	}

	graph.nodes = d3.keys(d3.nest()
	       .key(function (d) { return d.name; })
	       .map(graph.nodes));

	// loop through each link replacing the text with its index from node
	graph.links.forEach(function (d, i) {
	 	graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
	 	graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
	});

	//now loop through each nodes to make nodes an array of objects
	// rather than an array of strings
	graph.nodes.forEach(function (d, i) {
	 	graph.nodes[i] = { "name": d };
	});

	sankey  
	  .nodes(graph.nodes)  
	  .links(graph.links)  
	  .layout(32);

	// add in the links  
	var link = svg.append("g").selectAll(".link")  
		.data(graph.links)
		.enter()
		.append("path")  
		.attr("class", "link")  
		.attr("d", path)
		.attr("id", function(d,i){
		    return i;
		  })
		.style("stroke-width", function(d) { return Math.max(0.1, d.dy); })  //
		.style("stroke", function(d, i){ 
				if(d.value >=1){
					return colorLink(i); 
				}
				else{ return '#ffffff';}
				})
		.style("stroke-opacity", function(d, i){ return linkOpacity(d); })
		.sort(function(a, b) { return (b.dy - a.dy); });


	// add the link titles
	link.append("title")
	    .text(function(d) {
		if(d.value >= 1){
	    		return linkLabels(d);
		} });

	// add in the nodes
	var node = svg.append("g").selectAll(".node")
				.data(graph.nodes)
				.enter().append("g")
				.attr("class", "node")
				.attr("id", function(d,i){
					return d.name;
				})
				.attr("transform", function(d) { 
				return "translate(" + d.x + "," + d.y + ")"; });
				//.on("mouseover", highlight_node_links)
				//.on("mouseout", highlight_node_links_mouseout);

	// add the rectangles for the nodes
	node.append("rect")
		.attr("height", function(d) { return d.dy; })
		.attr("width", sankey.nodeWidth())
		.style("fill", function(d) { 
			return colorNode(d); })
		.style("stroke", function(d) { 
			return '#000000'; })
		.style("stroke-opacity", function(d, i){ 				
				return linkOpacity(d); })
		.append("title")
		.text(function(d) { 
			if (d.value >=1){
				return rectLabel(d);
			}});

	// add in the title for the nodes
	node.append("text")
	  .attr("x", -6)
	  .attr("y", function(d) { return d.dy / 2; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", "end")
	  .attr("transform", null)
	  .text(function(d) { 
			if (d.value >=1){ return nodeText(d); }
			})
	.filter(function(d) { return d.x < width / 2; })
	  .attr("x", 6 + sankey.nodeWidth())
	  .attr("text-anchor", "start");
}
