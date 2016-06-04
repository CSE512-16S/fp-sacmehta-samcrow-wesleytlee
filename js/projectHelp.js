//function to render the data on table
function renderTableNew(){
	var selectListVal = document.getElementById('stageNew').selectedOptions[0].value
	var t = d3.table1();
	//render the data in table
	//[stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsApply, stage3StatsDNA, stage4StatsAccept, stage4StatsDeny, stage4StatsSD]
	var dataStat = groupStatsNew[0];
	if(selectListVal == "stage1"){
		dataStat = groupStatsNew[0];
	}
	else if(selectListVal == "stage2"){
		dataStat = groupStatsNew[1];
	}
	else if(selectListVal == "stage3"){
		dataStat = groupStatsNew[2];
	}
	else if(selectListVal == "stage4"){
		dataStat = groupStatsNew[3];
	}
	else if(selectListVal == "stage5"){
		dataStat = groupStatsNew[4];
	}
	else if(selectListVal == "stage6"){
		dataStat = groupStatsNew[5];
	}
	else if(selectListVal == "stage7"){
		dataStat = groupStatsNew[6];
	}
	else if(selectListVal == "stage8"){
		dataStat = groupStatsNew[7];
	}
	else{
		dataStat = groupStatsNew[0];
	}
	
	if((dataStat.length) == 0){
		dataStat = [{Row: "No record Found"}]
	}
	
	console.log(JSON.stringify(dataStat))
	d3.select("body")
    	.datum(dataStat) /// filter on lines
    	.call(t)
}

function renderDataNew(data){

//Q5b	Q5d	Q5e	Q5f	Q5g	Q7a	Q8a	Q8c	Q8d	Q8e	Q8g	Q8i	Q9	Q10	Q11	Q12	GPA	admRecCalc	acadSubCalc	pqaSubCalc	stdmath	stdverbal	stdcomb	appscores	cse142firstclass	cse142grade	cse143firstclass	cse143grade


	graph = {"nodes" : [], "links" : []};
	//[stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsAccept, stage3StatsDNA, stage3StatsDeny, stage3StatsSD];
	groupStatsNew = createNodeData(graph, data);
   
   graph.nodes = d3.keys(d3.nest()
	       .key(function (d) { return d.name; })
	       .map(graph.nodes));

   temp = graph.nodes[6]
   graph.nodes[6] = graph.nodes[7];
   graph.nodes[7] = temp;
          
	// loop through each link replacing the text with its index from node
	graph.links.forEach(function (d, i) {
	 	graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
	 	graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
	});

	//now loop through each nodes to make nodes an array of objects
	// rather than an array of strings
	graph.nodes.forEach(function (d, i) {
      if(i == 3) {
         graph.nodes[i] = { "name": d, "xPos": 2};
      }
      else {
         graph.nodes[i] = { "name": d};
      }
	});

	sankey  
	  .nodes(graph.nodes)  
	  .links(graph.links)  
	  .layout(32);

	// add in the links  
	var link = svgNew.append("g").selectAll(".link")  
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
	var node = svgNew.append("g").selectAll(".node")
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

	//render data on a table
	renderTableNew()
}

function updateDataWithTransitionNew(data){

	graph.nodes = []
	graph.links = []
	//filter data for stage 1
	//[stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsAccept, stage3StatsDNA, stage3StatsDeny, stage3StatsSD]
	 groupStatsNew= createNodeData(graph, data);
	//determine the nodes
	graph.nodes = d3.keys(d3.nest()
	     .key(function (d) { return d.name; })
	     .map(graph.nodes));
   
   temp = graph.nodes[6]
   graph.nodes[6] = graph.nodes[7];
   graph.nodes[7] = temp;

	// loop through each link replacing the text with its index from node
	graph.links.forEach(function (d, i) {
		graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
		graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
	});

	//now loop through each nodes to make nodes an array of objects
	// rather than an array of strings
	graph.nodes.forEach(function (d, i) {
      if(i == 3) {
         graph.nodes[i] = { "name": d, "xPos": 2};
      }
      else {
         graph.nodes[i] = { "name": d};
      }
	});

	sankey
		.nodes(graph.nodes)
		.links(graph.links)
		.layout(32);


	//interpolate = null;
	var link = svgNew.selectAll(".link");
	var node = svgNew.selectAll(".node");


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


	svgNew.selectAll(".link>title")
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
		
	  
	var rect = svgNew.selectAll("rect")
	
	//add node rectangle
	svgNew.selectAll("rect").data(graph.nodes)
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
	svgNew.selectAll(".node>rect>title")
		.data(graph.nodes)
		.transition()
		.duration(transitionDuration)
		.text(function(d) {
		if (d.value >=1){
			return rectLabel(d);}
		});

	//add rectangle label
	svgNew.selectAll("text")
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

	//render a table
	renderTableNew()
}
