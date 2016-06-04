var weightDef = 0.01;
var transitionDuration = 1000;
var defMinValue = 10000;

function computeStatistics(d){
	epsilon = 0.000001
	//Student GPA
	gpagradeMean = []	

	//CSE 143 Details
	cse143gradeMean = []

	//CSE 142 Details
	cse142gradeMean = []

	//application scores
	appScoreMean = []

	//stdmath 
	stdmathMean = []

	//stdverbal	
	stdverbalMean = []

	//stdcomb
	stdcombMean = []

	//Q5b 
	Q5bMean = []

	//Q5d 
	Q5dMean = []

	//Q5e 
	Q5eMean = []

	//Q5f 
	Q5fMean = []

	//Q5g 
	Q5gMean = []

	//Q7a 
	Q7aMean = []

	//Q8a 
	Q8aMean = []

	//Q8c 
	Q8cMean = []

	//Q8d 
	Q8dMean = []

	//Q8e 
	Q8eMean = []

	//Q8g 
	Q8gMean = []

	//Q8i 
	Q8iMean = []

	//Q9 
	Q9Mean = []

	//Q10 
	Q10Mean = []

	//Q11 
	Q11Mean = []

	d.forEach(function(data) {
		data.GPA = parseFloat(data.GPA)
		data.cse143grade = parseFloat(data.cse143grade)
		data.cse142grade = parseFloat(data.cse142grade)
		data.appscores = parseFloat(data.appscores)

		data.stdmath = parseFloat(data.stdmath)
		data.Q5b = parseFloat(data.Q5b)
		data.stdverbal = parseFloat(data.stdverbal)
		data.Q5e = parseFloat(data.Q5e)
		data.Q5d = parseFloat(data.Q5d)

		data.Q5f = parseFloat(data.Q5f)
		data.Q5g = parseFloat(data.Q5g)
		data.Q7a = parseFloat(data.Q7a)
		data.stdcomb = parseFloat(data.stdcomb)
		data.Q8a = parseFloat(data.Q8a)
		data.Q8c = parseFloat(data.Q8c)
		data.Q8d = parseFloat(data.Q8d)
		data.Q8e = parseFloat(data.Q8e)
		data.Q8g = parseFloat(data.Q8g)
		data.Q8i = parseFloat(data.Q8i)
		data.Q9 = parseFloat(data.Q9)
		data.Q10 = parseFloat(data.Q10)
		data.Q11 = parseFloat(data.Q11)

		if(typeof(data.stdmath) == "number" && !isNaN(data.stdmath)){
			stdmathMean.push(data.stdmath);
		}

		
		if(typeof(data.Q5b) == "number" && !isNaN(data.Q5b)){
			Q5bMean.push(data.Q5b);
		}

		
		if(typeof(data.Q5d) == "number" && !isNaN(data.Q5d)){
			Q5dMean.push(data.Q5d);
		}

		
		if(typeof(data.Q5e) == "number" && !isNaN(data.Q5e)){
			Q5eMean += data.Q5e;
		}

		if(typeof(data.Q5f) == "number" && !isNaN(data.Q5f)){
			Q5fMean.push(data.Q5f);
		}
		
		if(typeof(data.Q5g) == "number" && !isNaN(data.Q5g)){
			Q5gMean.push(data.Q5g);
		}

		if(typeof(data.Q7a) == "number" && !isNaN(data.Q7a)){
			Q7aMean.push(data.Q7a);
		}
	
		if(typeof(data.stdverbal) == "number" && !isNaN(data.stdverbal)){
			stdverbalMean.push(data.stdverbal);
		}

		
		if(typeof(data.stdcomb) == "number" && !isNaN(data.stdcomb)){
			stdcombMean.push(data.stdcomb);
		}

		if(typeof(data.GPA) == "number" && !isNaN(data.GPA)){
			gpagradeMean.push(data.GPA);
		}

		if(typeof(data.cse143grade) == "number" && !isNaN(data.cse143grade)){
			cse143gradeMean.push(data.cse143grade);
		}
		if(typeof(data.cse142grade) == "number" && !isNaN(data.cse142grade)){
			cse142gradeMean.push(data.cse142grade);
		}
		if(typeof(data.appscores) == "number" && !isNaN(data.appscores)){
			appScoreMean.push(data.appscores);
		}

		if(typeof(data.Q8a) == "number" && !isNaN(data.Q8a)){
			Q8aMean.push(data.Q8a);
		}
		
		if(typeof(data.Q8c) == "number" && !isNaN(data.Q8c)){
			Q8cMean.push(data.Q8c);
		}

		
		if(typeof(data.Q8d) == "number" && !isNaN(data.Q8d)){
			Q8dMean.push(data.Q8d);
		}
		
		if(typeof(data.Q8e) == "number" && !isNaN(data.Q8e)){
			Q8eMean.push(data.Q8e);
		}
		
		if(typeof(data.Q8g) == "number" && !isNaN(data.Q8g)){
			Q8gMean.push(data.Q8g);
		}
		
		if(typeof(data.Q8i) == "number" && !isNaN(data.Q8i)){
			Q8iMean.push(data.Q8i);
		}


		if(typeof(data.Q9) == "number" && !isNaN(data.Q9)){
			Q9Mean.push(data.Q9);
		}

		if(typeof(data.Q10) == "number" && !isNaN(data.Q10)){
			Q10Mean.push(data.Q10);
		}


		if(typeof(data.Q11) == "number" && !isNaN(data.Q11)){
			Q11Mean.push(data.Q11);
		}

	});
	
	//Student GPA
	gpagradeMeanVal= 0
	gpagradeDev = 0
	if(gpagradeMean.length != 0){
		gpagradeMeanVal = d3.mean(gpagradeMean).toFixed(2);
		gpagradeDev = d3.deviation(gpagradeMean).toFixed(2);
	}	

	//CSE 143 Details
	cse143gradeMeanVal= 0
	cse143gradeDev = 0
	if(cse143gradeMean.length != 0){
		cse143gradeMeanVal = d3.mean(cse143gradeMean).toFixed(2);
		cse143gradeDev = d3.deviation(cse143gradeMean).toFixed(2);
	}

	//CSE 142 Details
	cse142gradeMeanVal= 0
	cse142gradeDev = 0
	if(cse142gradeMean.length != 0){
		cse142gradeMeanVal = d3.mean(cse142gradeMean).toFixed(2);
		cse142gradeDev = d3.deviation(cse142gradeMean).toFixed(2);
	}

	//application scores
	appScoreMeanVal= 0
	appScoreDev = 0
	if(appScoreMean.length != 0){
		appScoreMeanVal = d3.mean(appScoreMean).toFixed(2);
		appScoreDev = d3.deviation(appScoreMean).toFixed(2);
	}

	//stdmath 
	stdmathMeanVal= 0
	stdmathDev = 0
	if(stdmathMean.length != 0){
		stdmathMeanVal = d3.mean(stdmathMean).toFixed(2);
		stdmathDev = d3.deviation(stdmathMean).toFixed(2);
	}

	//stdverbal	
	stdverbalMeanVal= 0
	stdverbalDev = 0
	if(stdverbalMean.length != 0){
		stdverbalMeanVal = d3.mean(stdverbalMean).toFixed(2);
		stdverbalDev = d3.deviation(stdverbalMean).toFixed(2);
	}

	//stdcomb
	stdcombMeanVal= 0
	stdcombDev = 0
	if(stdcombMean.length != 0){
		stdcombMeanVal = d3.mean(stdcombMean).toFixed(2);
		stdcombDev = d3.deviation(stdcombMean).toFixed(2);
	}

	//Q5b 
	Q5bMeanVal= 0
	Q5bDev = 0
	if(Q5bMean.length != 0){
		Q5bMeanVal = d3.mean(Q5bMean).toFixed(2);
		Q5bDev = d3.deviation(Q5bMean).toFixed(2);
	}

	//Q5d 
	Q5dMeanVal= 0
	Q5dDev = 0
	if(Q5dMean.length != 0){
		Q5dMeanVal = d3.mean(Q5dMean).toFixed(2);
		Q5dDev = d3.deviation(Q5dMean).toFixed(2);
	}

	//Q5e 
	Q5eMeanVal= 0
	Q5eDev = 0
	if(Q5eMean.length != 0){
		Q5eMeanVal = d3.mean(Q5eMean).toFixed(2);
		Q5eDev = d3.deviation(Q5eMean).toFixed(2);
	}

	//Q5f 
	Q5fMeanVal= 0
	Q5fDev = 0
	if(Q5fMean.length != 0){
		Q5fMeanVal = d3.mean(Q5fMean).toFixed(2);
		Q5fDev = d3.deviation(Q5fMean).toFixed(2);
	}

	//Q5g 
	Q5gMeanVal= 0
	Q5gDev = 0
	if(Q5gMean.length != 0){
		Q5gMeanVal = d3.mean(Q5gMean).toFixed(2);
		Q5gDev = d3.deviation(Q5gMean).toFixed(2);
	}

	//Q7a 
	Q7aMeanVal= 0
	Q7aDev = 0
	if(Q7aMean.length != 0){
		Q7aMeanVal = d3.mean(Q7aMean).toFixed(2);
		Q7aDev = d3.deviation(Q7aMean).toFixed(2);
	}

	//Q8a 
	Q8aMeanVal= 0
	Q8aDev = 0
	if(Q8aMean.length != 0){
		Q8aMeanVal = d3.mean(Q8aMean).toFixed(2);
		Q8aDev = d3.deviation(Q8aMean).toFixed(2);
	}

	//Q8c 
	Q8cMeanVal= 0
	Q8cDev = 0
	if(Q8cMean.length != 0){
		Q8cMeanVal = d3.mean(Q8cMean).toFixed(2);
		Q8cDev = d3.deviation(Q8cMean).toFixed(2);
	}

	//Q8d 
	Q8dMeanVal= 0
	Q8dDev = 0
	if(Q8dMean.length != 0){
		Q8dMeanVal = d3.mean(Q8dMean).toFixed(2);
		Q8dDev = d3.deviation(Q8dMean).toFixed(2);
	}

	//Q8e 
	Q8eMeanVal= 0
	Q8eDev = 0
	if(Q8eMean.length != 0){
		Q8eMeanVal = d3.mean(Q8eMean).toFixed(2);
		Q8eDev = d3.deviation(Q8eMean).toFixed(2);
	}

	//Q8g 
	Q8gMeanVal= 0
	Q8gDev = 0
	if(Q8gMean.length != 0){
		Q8gMeanVal = d3.mean(Q8gMean).toFixed(2);
		Q8gDev = d3.deviation(Q8gMean).toFixed(2);
	}

	//Q8i 
	Q8iMeanVal= 0
	Q8iDev = 0
	if(Q8iMean.length != 0){
		Q8iMeanVal = d3.mean(Q8iMean).toFixed(2);
		Q8iDev = d3.deviation(Q8iMean).toFixed(2);
	}

	//Q9 
	Q9MeanVal= 0
	Q9Dev = 0
	if(Q9Mean.length != 0){
		Q9MeanVal = d3.mean(Q9Mean).toFixed(2);
		Q9Dev = d3.deviation(Q9Mean).toFixed(2);
	}

	//Q10 
	Q10MeanVal= 0
	Q10Dev = 0
	if(Q10Mean.length != 0){
		Q10MeanVal = d3.mean(Q10Mean).toFixed(2);
		Q10Dev = d3.deviation(Q10Mean).toFixed(2);
	}

	//Q11 
	Q11MeanVal= 0
	Q11Dev = 0
	if(Q11Mean.length != 0){
		Q11MeanVal = d3.mean(Q11Mean).toFixed(2);
		Q11Dev = d3.deviation(Q11Mean).toFixed(2);
	}

	var statsName = ["GPA", "Grade (CSE 142)", "Grade (CSE 143)", "Application Score", "Std Math", "Std Verbal", "Std Comb", "Q5b", "Q5d", "Q5e", "Q5f", "Q5g", "Q7a", 
			 "Q8a", "Q8c", "Q8d", "Q8e", "Q8g", "Q8i", "Q9", "Q11"];

	return [{variable:"GPA", mean:gpagradeMeanVal, deviation:gpagradeDev},
		{variable:"Grade (CSE 142)", mean:cse142gradeMeanVal, deviation:cse142gradeDev},
		{variable:"Grade (CSE 143)", mean:cse143gradeMeanVal, deviation:cse143gradeDev},
		{variable:"Application Score", mean:appScoreMeanVal, deviation:appScoreDev},
		{variable:"Std Math", mean:stdmathMeanVal, deviation:stdmathDev},
		{variable:"Std Verbal", mean:stdverbalMeanVal, deviation:stdverbalDev},
		{variable:"Std Comb", mean:stdcombMeanVal, deviation:stdcombDev},
		{variable:"Q5b", mean:Q5bMeanVal, deviation:Q5bDev},
		{variable:"Q5d", mean:Q5dMeanVal, deviation:Q5dDev},
		{variable:"Q5e", mean:Q5eMeanVal, deviation:Q5eDev},
		{variable:"Q5f", mean:Q5fMeanVal, deviation:Q5fDev},
		{variable:"Q5g", mean:Q5gMeanVal, deviation:Q5gDev},
		{variable:"Q7a", mean:Q7aMeanVal, deviation:Q7aDev},
		{variable:"Q8a", mean:Q8aMeanVal, deviation:Q8aDev},
		{variable:"Q8c", mean:Q8cMeanVal, deviation:Q8cDev},
		{variable:"Q8d", mean:Q8dMeanVal, deviation:Q8dDev},
		{variable:"Q8e", mean:Q8eMeanVal, deviation:Q8eDev},
		{variable:"Q8g", mean:Q8gMeanVal, deviation:Q8gDev},
		{variable:"Q8i", mean:Q8iMeanVal, deviation:Q8iDev},
		{variable:"Q9", mean:Q9MeanVal, deviation:Q9Dev},
		{variable:"Q11", mean:Q11MeanVal, deviation:Q11Dev}
];
	
}

function updateDataWithTransition(data){

	graph.nodes = []
	graph.links = []
	//filter data for stage 1
	//[stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsAccept, stage3StatsDNA, stage3StatsDeny, stage3StatsSD]
	 var groupStats= createNodeData(graph, data);
	console.log(graph);
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

	//compute data related statistics
	stats = computeStatistics(data);
	//create a table
	var t = d3.table();
	//render the data in table
	d3.select("body")
    	.datum(groupStats[0])
    	.call(t)
}

function createNodeData(graph, data){
	//filter data for stage 1
	var groupedStage1= d3.nest()
		      .key(function(d) { return d.source; })
		      .key(function(d) { return d.target142; })
		      .rollup(function(v) { 
					return {
						"weight": d3.sum(v, function(d) { return 1; }),//edge weight
						//mean of different statistics
						"gpa":d3.mean(v, function(d) { d.GPA = parseFloat(d.GPA); if(typeof(d.GPA) == "number"){ return d.GPA; } }), 
						"Q5b": d3.mean(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(typeof(d.Q5b) == "number"){ return d.Q5b; } }), 
						"Q5d": d3.mean(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(typeof(d.Q5d) == "number"){ return d.Q5d; } }),
						"Q5e": d3.mean(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(typeof(d.Q5e) == "number"){ return d.Q5e; } }),
						"Q5f": d3.mean(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(typeof(d.Q5f) == "number"){ return d.Q5f; } }),
						
						"Q7a": d3.mean(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(typeof(d.Q7a) == "number"){ return d.Q7a; } }),
						"Q8a": d3.mean(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(typeof(d.Q8a) == "number"){ return d.Q8a; } }),
						"Q8c": d3.mean(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(typeof(d.Q8c) == "number"){ return d.Q8c; } }),
						"Q8d": d3.mean(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(typeof(d.Q8d) == "number"){ return d.Q8d; } }),
						"Q8e": d3.mean(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(typeof(d.Q8e) == "number"){ return d.Q8e; } }),
						"Q8g": d3.mean(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(typeof(d.Q8g) == "number"){ return d.Q8g; } }),
						"Q8i": d3.mean(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(typeof(d.Q8i) == "number"){ return d.Q8i; } }),
						"Q9": d3.mean(v, function(d) { d.Q9 = parseFloat(d.Q9); if(typeof(d.Q9) == "number"){ return d.Q9; } }),
						"Q11": d3.mean(v, function(d) { d.Q11 = parseFloat(d.Q11); if(typeof(d.Q11) == "number"){ return d.Q11; } }),

						
						"stdmath": d3.mean(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(typeof(d.stdmath) == "number"){ return d.stdmath; } }),
						"stdverbal": d3.mean(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(typeof(d.stdverbal) == "number"){ return d.stdverbal; } }),
						"stdcomb": d3.mean(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(typeof(d.stdcomb) == "number"){ return d.stdcomb; } }),
						"appscores": d3.mean(v, function(d) { d.appscores = parseFloat(d.appscores); if(typeof(d.appscores) == "number"){ return d.appscores; } }),
						"cse142firstclass": d3.mean(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(typeof(d.cse142firstclass) == "number"){ return d.cse142firstclass; } }),
						"cse142grade": d3.mean(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(typeof(d.cse142grade) == "number"){ return d.cse142grade; } }),
						"cse143firstclass": d3.mean(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(typeof(d.cse143firstclass) == "number"){ return d.cse143firstclass; } }),
						"cse143grade": d3.mean(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }}),				
						//Deviation of different statistics

						"gpaD":d3.deviation(v, function(d) { d.GPA = parseFloat(d.GPA); if(typeof(d.GPA) == "number"){ return d.GPA; } }), 
						"Q5bD": d3.deviation(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(typeof(d.Q5b) == "number"){ return d.Q5b; } }), 
						"Q5dD": d3.deviation(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(typeof(d.Q5d) == "number"){ return d.Q5d; } }),
						"Q5eD": d3.deviation(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(typeof(d.Q5e) == "number"){ return d.Q5e; } }),
						"Q5fD": d3.deviation(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(typeof(d.Q5f) == "number"){ return d.Q5f; } }),
						
						"Q7aD": d3.deviation(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(typeof(d.Q7a) == "number"){ return d.Q7a; } }),
						"Q8aD": d3.deviation(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(typeof(d.Q8a) == "number"){ return d.Q8a; } }),
						"Q8cD": d3.deviation(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(typeof(d.Q8c) == "number"){ return d.Q8c; } }),
						"Q8dD": d3.deviation(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(typeof(d.Q8d) == "number"){ return d.Q8d; } }),
						"Q8eD": d3.deviation(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(typeof(d.Q8e) == "number"){ return d.Q8e; } }),
						"Q8gD": d3.deviation(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(typeof(d.Q8g) == "number"){ return d.Q8g; } }),
						"Q8iD": d3.deviation(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(typeof(d.Q8i) == "number"){ return d.Q8i; } }),
						"Q9D": d3.deviation(v, function(d) { d.Q9 = parseFloat(d.Q9); if(typeof(d.Q9) == "number"){ return d.Q9; } }),
						"Q11D": d3.deviation(v, function(d) { d.Q11 = parseFloat(d.Q11); if(typeof(d.Q11) == "number"){ return d.Q11; } }),

						
						"stdmathD": d3.deviation(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(typeof(d.stdmath) == "number"){ return d.stdmath; } }),
						"stdverbalD": d3.deviation(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(typeof(d.stdverbal) == "number"){ return d.stdverbal; } }),
						"stdcombD": d3.deviation(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(typeof(d.stdcomb) == "number"){ return d.stdcomb; } }),
						"appscoresD": d3.deviation(v, function(d) { d.appscores = parseFloat(d.appscores); if(typeof(d.appscores) == "number"){ return d.appscores; } }),
						"cse142firstclassD": d3.deviation(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(typeof(d.cse142firstclass) == "number"){ return d.cse142firstclass; } }),
						"cse142gradeD": d3.deviation(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(typeof(d.cse142grade) == "number"){ return d.cse142grade; } }),
						"cse143firstclassD": d3.deviation(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(typeof(d.cse143firstclass) == "number"){ return d.cse143firstclass; } }),
						"cse143gradeD": d3.deviation(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }})
						}
					})
		      .map(data);
	//stage 1 data
	var dataStage1Var = groupedStage1.student.CSE142;
	var weightStage1 = weightDef;
	if(typeof(dataStage1Var) != "undefined"){
		weightStage1 = dataStage1Var.weight;
	}

	var statsName = ["GPA", "Grade (CSE 142)", "Grade (CSE 143)", "Application Score", "Std Math", "Std Verbal", "Std Comb", "Q5b", "Q5d", "Q5e", "Q5f", "Q7a", 
			 "Q8a", "Q8c", "Q8d", "Q8e", "Q8g", "Q8i", "Q9", "Q11", "CSE 142 (first class)", "CSE 143 (first class)"];

	
	var stage1Stats = [{variable:statsName[0], mean:dataStage1Var.gpa, deviation:dataStage1Var.gpaD},
		{variable:statsName[1], mean:dataStage1Var.cse142grade, deviation:dataStage1Var.cse142gradeD},
		{variable:statsName[20], mean:dataStage1Var.cse142firstclass, deviation:dataStage1Var.cse142firstclassD},
		{variable:statsName[2], mean:dataStage1Var.cse143grade, deviation:dataStage1Var.cse143gradeD},
		{variable:statsName[21], mean:dataStage1Var.cse143firstclass, deviation:dataStage1Var.cse143firstclassD},
		{variable:statsName[3], mean:dataStage1Var.appscores, deviation:dataStage1Var.appscoresD},
		{variable:statsName[4], mean:dataStage1Var.stdmath, deviation:dataStage1Var.stdmathD},
		{variable:statsName[5], mean:dataStage1Var.stdverbal, deviation:dataStage1Var.stdverbalD},
		{variable:statsName[6], mean:dataStage1Var.stdcomb, deviation:dataStage1Var.stdcombD},

		{variable:statsName[7], mean:dataStage1Var.Q5b, deviation:dataStage1Var.Q5bD},
		{variable:statsName[8], mean:dataStage1Var.Q5d, deviation:dataStage1Var.Q5dD},
		{variable:statsName[9], mean:dataStage1Var.Q5e, deviation:dataStage1Var.Q5eD},
		{variable:statsName[10], mean:dataStage1Var.Q5f, deviation:dataStage1Var.Q5fD},
		{variable:statsName[11], mean:dataStage1Var.Q7a, deviation:dataStage1Var.Q7aD},
		{variable:statsName[12], mean:dataStage1Var.Q8a, deviation:dataStage1Var.Q8aD},
		{variable:statsName[13], mean:dataStage1Var.Q8c, deviation:dataStage1Var.Q8cD},
		{variable:statsName[14], mean:dataStage1Var.Q8d, deviation:dataStage1Var.Q8dD},
		{variable:statsName[15], mean:dataStage1Var.Q8e, deviation:dataStage1Var.Q8eD},
		{variable:statsName[16], mean:dataStage1Var.Q8g, deviation:dataStage1Var.Q8gD},
		{variable:statsName[17], mean:dataStage1Var.Q8i, deviation:dataStage1Var.Q8iD},
		{variable:statsName[18], mean:dataStage1Var.Q9, deviation:dataStage1Var.Q9D},
		{variable:statsName[19], mean:dataStage1Var.Q11, deviation:dataStage1Var.Q11D},
];
	

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
		        //.rollup(function(v) { return d3.sum(v, function(d) { return 1; }); })
		        //.map(data);
			.rollup(function(v) { 
					return {
						"weight": d3.sum(v, function(d) { return 1; }),//edge weight
						//mean of different statistics
						"gpa":d3.mean(v, function(d) { d.GPA = parseFloat(d.GPA); if(typeof(d.GPA) == "number"){ return d.GPA; } }), 
						"Q5b": d3.mean(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(typeof(d.Q5b) == "number"){ return d.Q5b; } }), 
						"Q5d": d3.mean(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(typeof(d.Q5d) == "number"){ return d.Q5d; } }),
						"Q5e": d3.mean(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(typeof(d.Q5e) == "number"){ return d.Q5e; } }),
						"Q5f": d3.mean(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(typeof(d.Q5f) == "number"){ return d.Q5f; } }),
						
						"Q7a": d3.mean(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(typeof(d.Q7a) == "number"){ return d.Q7a; } }),
						"Q8a": d3.mean(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(typeof(d.Q8a) == "number"){ return d.Q8a; } }),
						"Q8c": d3.mean(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(typeof(d.Q8c) == "number"){ return d.Q8c; } }),
						"Q8d": d3.mean(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(typeof(d.Q8d) == "number"){ return d.Q8d; } }),
						"Q8e": d3.mean(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(typeof(d.Q8e) == "number"){ return d.Q8e; } }),
						"Q8g": d3.mean(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(typeof(d.Q8g) == "number"){ return d.Q8g; } }),
						"Q8i": d3.mean(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(typeof(d.Q8i) == "number"){ return d.Q8i; } }),
						"Q9": d3.mean(v, function(d) { d.Q9 = parseFloat(d.Q9); if(typeof(d.Q9) == "number"){ return d.Q9; } }),
						"Q11": d3.mean(v, function(d) { d.Q11 = parseFloat(d.Q11); if(typeof(d.Q11) == "number"){ return d.Q11; } }),

						
						"stdmath": d3.mean(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(typeof(d.stdmath) == "number"){ return d.stdmath; } }),
						"stdverbal": d3.mean(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(typeof(d.stdverbal) == "number"){ return d.stdverbal; } }),
						"stdcomb": d3.mean(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(typeof(d.stdcomb) == "number"){ return d.stdcomb; } }),
						"appscores": d3.mean(v, function(d) { d.appscores = parseFloat(d.appscores); if(typeof(d.appscores) == "number"){ return d.appscores; } }),
						"cse142firstclass": d3.mean(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(typeof(d.cse142firstclass) == "number"){ return d.cse142firstclass; } }),
						"cse142grade": d3.mean(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(typeof(d.cse142grade) == "number"){ return d.cse142grade; } }),
						"cse143firstclass": d3.mean(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(typeof(d.cse143firstclass) == "number"){ return d.cse143firstclass; } }),
						"cse143grade": d3.mean(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }}),				
						//Deviation of different statistics

						"gpaD":d3.deviation(v, function(d) { d.GPA = parseFloat(d.GPA); if(typeof(d.GPA) == "number"){ return d.GPA; } }), 
						"Q5bD": d3.deviation(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(typeof(d.Q5b) == "number"){ return d.Q5b; } }), 
						"Q5dD": d3.deviation(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(typeof(d.Q5d) == "number"){ return d.Q5d; } }),
						"Q5eD": d3.deviation(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(typeof(d.Q5e) == "number"){ return d.Q5e; } }),
						"Q5fD": d3.deviation(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(typeof(d.Q5f) == "number"){ return d.Q5f; } }),
						
						"Q7aD": d3.deviation(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(typeof(d.Q7a) == "number"){ return d.Q7a; } }),
						"Q8aD": d3.deviation(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(typeof(d.Q8a) == "number"){ return d.Q8a; } }),
						"Q8cD": d3.deviation(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(typeof(d.Q8c) == "number"){ return d.Q8c; } }),
						"Q8dD": d3.deviation(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(typeof(d.Q8d) == "number"){ return d.Q8d; } }),
						"Q8eD": d3.deviation(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(typeof(d.Q8e) == "number"){ return d.Q8e; } }),
						"Q8gD": d3.deviation(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(typeof(d.Q8g) == "number"){ return d.Q8g; } }),
						"Q8iD": d3.deviation(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(typeof(d.Q8i) == "number"){ return d.Q8i; } }),
						"Q9D": d3.deviation(v, function(d) { d.Q9 = parseFloat(d.Q9); if(typeof(d.Q9) == "number"){ return d.Q9; } }),
						"Q11D": d3.deviation(v, function(d) { d.Q11 = parseFloat(d.Q11); if(typeof(d.Q11) == "number"){ return d.Q11; } }),

						
						"stdmathD": d3.deviation(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(typeof(d.stdmath) == "number"){ return d.stdmath; } }),
						"stdverbalD": d3.deviation(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(typeof(d.stdverbal) == "number"){ return d.stdverbal; } }),
						"stdcombD": d3.deviation(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(typeof(d.stdcomb) == "number"){ return d.stdcomb; } }),
						"appscoresD": d3.deviation(v, function(d) { d.appscores = parseFloat(d.appscores); if(typeof(d.appscores) == "number"){ return d.appscores; } }),
						"cse142firstclassD": d3.deviation(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(typeof(d.cse142firstclass) == "number"){ return d.cse142firstclass; } }),
						"cse142gradeD": d3.deviation(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(typeof(d.cse142grade) == "number"){ return d.cse142grade; } }),
						"cse143firstclassD": d3.deviation(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(typeof(d.cse143firstclass) == "number"){ return d.cse143firstclass; } }),
						"cse143gradeD": d3.deviation(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }})
						}
					})
		      .map(data);

	var stage2Data = groupedStage2.student.CSE142;

	var stage2StatsCS143 = [];
	var stage2StatsNA143 = [];


	var weight1Stage2 = weightDef;
	if(typeof(stage2Data.CSE143) != "undefined"){
		weight1Stage2 = stage2Data.CSE143.weight;
		stage2StatsCS143  = [{variable:statsName[0], mean:stage2Data.CSE143.gpa, deviation:stage2Data.CSE143.gpaD},
					{variable:statsName[1], mean:stage2Data.CSE143.cse142grade, deviation:stage2Data.CSE143.cse142gradeD},
					{variable:statsName[20], mean:stage2Data.CSE143.cse142firstclass, deviation:stage2Data.CSE143.cse142firstclassD},
					{variable:statsName[2], mean:stage2Data.CSE143.cse143grade, deviation:stage2Data.CSE143.cse143gradeD},
					{variable:statsName[21], mean:stage2Data.CSE143.cse143firstclass, deviation:stage2Data.CSE143.cse143firstclassD},
					{variable:statsName[3], mean:stage2Data.CSE143.appscores, deviation:stage2Data.CSE143.appscoresD},
					{variable:statsName[4], mean:stage2Data.CSE143.stdmath, deviation:stage2Data.CSE143.stdmathD},
					{variable:statsName[5], mean:stage2Data.CSE143.stdverbal, deviation:stage2Data.CSE143.stdverbalD},
					{variable:statsName[6], mean:stage2Data.CSE143.stdcomb, deviation:stage2Data.CSE143.stdcombD},

					{variable:statsName[7], mean:stage2Data.CSE143.Q5b, deviation:stage2Data.CSE143.Q5bD},
					{variable:statsName[8], mean:stage2Data.CSE143.Q5d, deviation:stage2Data.CSE143.Q5dD},
					{variable:statsName[9], mean:stage2Data.CSE143.Q5e, deviation:stage2Data.CSE143.Q5eD},
					{variable:statsName[10], mean:stage2Data.CSE143.Q5f, deviation:stage2Data.CSE143.Q5fD},
					{variable:statsName[11], mean:stage2Data.CSE143.Q7a, deviation:stage2Data.CSE143.Q7aD},
					{variable:statsName[12], mean:stage2Data.CSE143.Q8a, deviation:stage2Data.CSE143.Q8aD},
					{variable:statsName[13], mean:stage2Data.CSE143.Q8c, deviation:stage2Data.CSE143.Q8cD},
					{variable:statsName[14], mean:stage2Data.CSE143.Q8d, deviation:stage2Data.CSE143.Q8dD},
					{variable:statsName[15], mean:stage2Data.CSE143.Q8e, deviation:stage2Data.CSE143.Q8eD},
					{variable:statsName[16], mean:stage2Data.CSE143.Q8g, deviation:stage2Data.CSE143.Q8gD},
					{variable:statsName[17], mean:stage2Data.CSE143.Q8i, deviation:stage2Data.CSE143.Q8iD},
					{variable:statsName[18], mean:stage2Data.CSE143.Q9, deviation:stage2Data.CSE143.Q9D},
					{variable:statsName[19], mean:stage2Data.CSE143.Q11, deviation:stage2Data.CSE143.Q11D},
				];
	}
	var weight2Stage2 = weightDef;
	if(typeof(stage2Data.NA143) != "undefined"){
		weight2Stage2 = stage2Data.NA143.weight;
		stage2StatsNA143 = [{variable:statsName[0], mean:stage2Data.NA143.gpa, deviation:stage2Data.NA143.gpaD},
					{variable:statsName[1], mean:stage2Data.NA143.cse142grade, deviation:stage2Data.NA143.cse142gradeD},
					{variable:statsName[20], mean:stage2Data.NA143.cse142firstclass, deviation:stage2Data.NA143.cse142firstclassD},
					{variable:statsName[2], mean:stage2Data.NA143.cse143grade, deviation:stage2Data.NA143.cse143gradeD},
					{variable:statsName[21], mean:stage2Data.NA143.cse143firstclass, deviation:stage2Data.NA143.cse143firstclassD},
					{variable:statsName[3], mean:stage2Data.NA143.appscores, deviation:stage2Data.NA143.appscoresD},
					{variable:statsName[4], mean:stage2Data.NA143.stdmath, deviation:stage2Data.NA143.stdmathD},
					{variable:statsName[5], mean:stage2Data.NA143.stdverbal, deviation:stage2Data.NA143.stdverbalD},
					{variable:statsName[6], mean:stage2Data.NA143.stdcomb, deviation:stage2Data.NA143.stdcombD},

					{variable:statsName[7], mean:stage2Data.NA143.Q5b, deviation:stage2Data.NA143.Q5bD},
					{variable:statsName[8], mean:stage2Data.NA143.Q5d, deviation:stage2Data.NA143.Q5dD},
					{variable:statsName[9], mean:stage2Data.NA143.Q5e, deviation:stage2Data.NA143.Q5eD},
					{variable:statsName[10], mean:stage2Data.NA143.Q5f, deviation:stage2Data.NA143.Q5fD},
					{variable:statsName[11], mean:stage2Data.NA143.Q7a, deviation:stage2Data.NA143.Q7aD},
					{variable:statsName[12], mean:stage2Data.NA143.Q8a, deviation:stage2Data.NA143.Q8aD},
					{variable:statsName[13], mean:stage2Data.NA143.Q8c, deviation:stage2Data.NA143.Q8cD},
					{variable:statsName[14], mean:stage2Data.NA143.Q8d, deviation:stage2Data.NA143.Q8dD},
					{variable:statsName[15], mean:stage2Data.NA143.Q8e, deviation:stage2Data.NA143.Q8eD},
					{variable:statsName[16], mean:stage2Data.NA143.Q8g, deviation:stage2Data.NA143.Q8gD},
					{variable:statsName[17], mean:stage2Data.NA143.Q8i, deviation:stage2Data.NA143.Q8iD},
					{variable:statsName[18], mean:stage2Data.NA143.Q9, deviation:stage2Data.NA143.Q9D},
					{variable:statsName[19], mean:stage2Data.NA143.Q11, deviation:stage2Data.NA143.Q11D},
				];
	}

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
		        //.rollup(function(v) { return d3.sum(v, function(d) { return 1; }); })
		        //.map(data);
			.rollup(function(v) { 
					return {
						"weight": d3.sum(v, function(d) { return 1; }),//edge weight
						//mean of different statistics
						"gpa":d3.mean(v, function(d) { d.GPA = parseFloat(d.GPA); if(typeof(d.GPA) == "number"){ return d.GPA; } }), 
						"Q5b": d3.mean(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(typeof(d.Q5b) == "number"){ return d.Q5b; } }), 
						"Q5d": d3.mean(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(typeof(d.Q5d) == "number"){ return d.Q5d; } }),
						"Q5e": d3.mean(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(typeof(d.Q5e) == "number"){ return d.Q5e; } }),
						"Q5f": d3.mean(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(typeof(d.Q5f) == "number"){ return d.Q5f; } }),
						"Q7a": d3.mean(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(typeof(d.Q7a) == "number"){ return d.Q7a; } }),
						"Q8a": d3.mean(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(typeof(d.Q8a) == "number"){ return d.Q8a; } }),
						"Q8c": d3.mean(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(typeof(d.Q8c) == "number"){ return d.Q8c; } }),
						"Q8d": d3.mean(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(typeof(d.Q8d) == "number"){ return d.Q8d; } }),
						"Q8e": d3.mean(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(typeof(d.Q8e) == "number"){ return d.Q8e; } }),
						"Q8g": d3.mean(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(typeof(d.Q8g) == "number"){ return d.Q8g; } }),
						"Q8i": d3.mean(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(typeof(d.Q8i) == "number"){ return d.Q8i; } }),
						"Q9": d3.mean(v, function(d) { d.Q9 = parseFloat(d.Q9); if(typeof(d.Q9) == "number"){ return d.Q9; } }),
						"Q11": d3.mean(v, function(d) { d.Q11 = parseFloat(d.Q11); if(typeof(d.Q11) == "number"){ return d.Q11; } }),

						
						"stdmath": d3.mean(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(typeof(d.stdmath) == "number"){ return d.stdmath; } }),
						"stdverbal": d3.mean(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(typeof(d.stdverbal) == "number"){ return d.stdverbal; } }),
						"stdcomb": d3.mean(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(typeof(d.stdcomb) == "number"){ return d.stdcomb; } }),
						"appscores": d3.mean(v, function(d) { d.appscores = parseFloat(d.appscores); if(typeof(d.appscores) == "number"){ return d.appscores; } }),
						"cse142firstclass": d3.mean(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(typeof(d.cse142firstclass) == "number"){ return d.cse142firstclass; } }),
						"cse142grade": d3.mean(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(typeof(d.cse142grade) == "number"){ return d.cse142grade; } }),
						"cse143firstclass": d3.mean(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(typeof(d.cse143firstclass) == "number"){ return d.cse143firstclass; } }),
						"cse143grade": d3.mean(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }}),				
						//Deviation of different statistics

						"gpaD":d3.deviation(v, function(d) { d.GPA = parseFloat(d.GPA); if(typeof(d.GPA) == "number"){ return d.GPA; } }), 
						"Q5bD": d3.deviation(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(typeof(d.Q5b) == "number"){ return d.Q5b; } }), 
						"Q5dD": d3.deviation(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(typeof(d.Q5d) == "number"){ return d.Q5d; } }),
						"Q5eD": d3.deviation(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(typeof(d.Q5e) == "number"){ return d.Q5e; } }),
						"Q5fD": d3.deviation(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(typeof(d.Q5f) == "number"){ return d.Q5f; } }),
						"Q7aD": d3.deviation(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(typeof(d.Q7a) == "number"){ return d.Q7a; } }),
						"Q8aD": d3.deviation(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(typeof(d.Q8a) == "number"){ return d.Q8a; } }),
						"Q8cD": d3.deviation(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(typeof(d.Q8c) == "number"){ return d.Q8c; } }),
						"Q8dD": d3.deviation(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(typeof(d.Q8d) == "number"){ return d.Q8d; } }),
						"Q8eD": d3.deviation(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(typeof(d.Q8e) == "number"){ return d.Q8e; } }),
						"Q8gD": d3.deviation(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(typeof(d.Q8g) == "number"){ return d.Q8g; } }),
						"Q8iD": d3.deviation(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(typeof(d.Q8i) == "number"){ return d.Q8i; } }),
						"Q9D": d3.deviation(v, function(d) { d.Q9 = parseFloat(d.Q9); if(typeof(d.Q9) == "number"){ return d.Q9; } }),
						"Q11D": d3.deviation(v, function(d) { d.Q11 = parseFloat(d.Q11); if(typeof(d.Q11) == "number"){ return d.Q11; } }),

						
						"stdmathD": d3.deviation(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(typeof(d.stdmath) == "number"){ return d.stdmath; } }),
						"stdverbalD": d3.deviation(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(typeof(d.stdverbal) == "number"){ return d.stdverbal; } }),
						"stdcombD": d3.deviation(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(typeof(d.stdcomb) == "number"){ return d.stdcomb; } }),
						"appscoresD": d3.deviation(v, function(d) { d.appscores = parseFloat(d.appscores); if(typeof(d.appscores) == "number"){ return d.appscores; } }),
						"cse142firstclassD": d3.deviation(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(typeof(d.cse142firstclass) == "number"){ return d.cse142firstclass; } }),
						"cse142gradeD": d3.deviation(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(typeof(d.cse142grade) == "number"){ return d.cse142grade; } }),
						"cse143firstclassD": d3.deviation(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(typeof(d.cse143firstclass) == "number"){ return d.cse143firstclass; } }),
						"cse143gradeD": d3.deviation(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }})
						}
					})
		      .map(data);


	//var weight1Stage3 = groupedStage3.student.CSE142.CSE143.Enrolled;
	//var weight2Stage3 = groupedStage3.student.CSE142.CSE143.DNE;
	//var weight3Stage3 = groupedStage3.student.CSE142.CSE143.AV;

	var stage3Data = groupedStage3.student.CSE142.CSE143;

	var stage3StatsAccept = [];
	var stage3StatsDNA = [];
	var stage3StatsDeny = [];
	var stage3StatsSD = [];

	var weight4Stage3 = weightDef;
	if(typeof(stage3Data.Accept) != "undefined"){
		weight4Stage3 = stage3Data.Accept.weight;
		stage3StatsAccept = [{variable:statsName[0], mean:stage3Data.Accept.gpa, deviation:stage3Data.Accept.gpaD},
					{variable:statsName[1], mean:stage3Data.Accept.cse142grade, deviation:stage3Data.Accept.cse142gradeD},
					{variable:statsName[20], mean:stage3Data.Accept.cse142firstclass, deviation:stage3Data.Accept.cse142firstclassD},
					{variable:statsName[2], mean:stage3Data.Accept.cse143grade, deviation:stage3Data.Accept.cse143gradeD},
					{variable:statsName[21], mean:stage3Data.Accept.cse143firstclass, deviation:stage3Data.Accept.cse143firstclassD},
					{variable:statsName[3], mean:stage3Data.Accept.appscores, deviation:stage3Data.Accept.appscoresD},
					{variable:statsName[4], mean:stage3Data.Accept.stdmath, deviation:stage3Data.Accept.stdmathD},
					{variable:statsName[5], mean:stage3Data.Accept.stdverbal, deviation:stage3Data.Accept.stdverbalD},
					{variable:statsName[6], mean:stage3Data.Accept.stdcomb, deviation:stage3Data.Accept.stdcombD},

					{variable:statsName[7], mean:stage3Data.Accept.Q5b, deviation:stage3Data.Accept.Q5bD},
					{variable:statsName[8], mean:stage3Data.Accept.Q5d, deviation:stage3Data.Accept.Q5dD},
					{variable:statsName[9], mean:stage3Data.Accept.Q5e, deviation:stage3Data.Accept.Q5eD},
					{variable:statsName[10], mean:stage3Data.Accept.Q5f, deviation:stage3Data.Accept.Q5fD},
					{variable:statsName[11], mean:stage3Data.Accept.Q7a, deviation:stage3Data.Accept.Q7aD},
					{variable:statsName[12], mean:stage3Data.Accept.Q8a, deviation:stage3Data.Accept.Q8aD},
					{variable:statsName[13], mean:stage3Data.Accept.Q8c, deviation:stage3Data.Accept.Q8cD},
					{variable:statsName[14], mean:stage3Data.Accept.Q8d, deviation:stage3Data.Accept.Q8dD},
					{variable:statsName[15], mean:stage3Data.Accept.Q8e, deviation:stage3Data.Accept.Q8eD},
					{variable:statsName[16], mean:stage3Data.Accept.Q8g, deviation:stage3Data.Accept.Q8gD},
					{variable:statsName[17], mean:stage3Data.Accept.Q8i, deviation:stage3Data.Accept.Q8iD},
					{variable:statsName[18], mean:stage3Data.Accept.Q9, deviation:stage3Data.Accept.Q9D},
					{variable:statsName[19], mean:stage3Data.Accept.Q11, deviation:stage3Data.Accept.Q11D},
				];
	}

	var weight5Stage3 = weightDef;
	if(typeof(stage3Data.DNA) != "undefined"){
		weight5Stage3 = stage3Data.DNA.weight;
		stage3StatsDNA = [{variable:statsName[0], mean:stage3Data.DNA.gpa, deviation:stage3Data.DNA.gpaD},
					{variable:statsName[1], mean:stage3Data.DNA.cse142grade, deviation:stage3Data.DNA.cse142gradeD},
					{variable:statsName[20], mean:stage3Data.DNA.cse142firstclass, deviation:stage3Data.DNA.cse142firstclassD},
					{variable:statsName[2], mean:stage3Data.DNA.cse143grade, deviation:stage3Data.DNA.cse143gradeD},
					{variable:statsName[21], mean:stage3Data.DNA.cse143firstclass, deviation:stage3Data.DNA.cse143firstclassD},
					{variable:statsName[3], mean:stage3Data.DNA.appscores, deviation:stage3Data.DNA.appscoresD},
					{variable:statsName[4], mean:stage3Data.DNA.stdmath, deviation:stage3Data.DNA.stdmathD},
					{variable:statsName[5], mean:stage3Data.DNA.stdverbal, deviation:stage3Data.DNA.stdverbalD},
					{variable:statsName[6], mean:stage3Data.DNA.stdcomb, deviation:stage3Data.DNA.stdcombD},

					{variable:statsName[7], mean:stage3Data.DNA.Q5b, deviation:stage3Data.DNA.Q5bD},
					{variable:statsName[8], mean:stage3Data.DNA.Q5d, deviation:stage3Data.DNA.Q5dD},
					{variable:statsName[9], mean:stage3Data.DNA.Q5e, deviation:stage3Data.DNA.Q5eD},
					{variable:statsName[10], mean:stage3Data.DNA.Q5f, deviation:stage3Data.DNA.Q5fD},
					{variable:statsName[11], mean:stage3Data.DNA.Q7a, deviation:stage3Data.DNA.Q7aD},
					{variable:statsName[12], mean:stage3Data.DNA.Q8a, deviation:stage3Data.DNA.Q8aD},
					{variable:statsName[13], mean:stage3Data.DNA.Q8c, deviation:stage3Data.DNA.Q8cD},
					{variable:statsName[14], mean:stage3Data.DNA.Q8d, deviation:stage3Data.DNA.Q8dD},
					{variable:statsName[15], mean:stage3Data.DNA.Q8e, deviation:stage3Data.DNA.Q8eD},
					{variable:statsName[16], mean:stage3Data.DNA.Q8g, deviation:stage3Data.DNA.Q8gD},
					{variable:statsName[17], mean:stage3Data.DNA.Q8i, deviation:stage3Data.DNA.Q8iD},
					{variable:statsName[18], mean:stage3Data.DNA.Q9, deviation:stage3Data.DNA.Q9D},
					{variable:statsName[19], mean:stage3Data.DNA.Q11, deviation:stage3Data.DNA.Q11D},
				];
	}
	var weight6Stage3 = weightDef;
	if(typeof(stage3Data.Deny) != "undefined"){
		weight6Stage3 = stage3Data.Deny.weight;
		stage3StatsDeny = [{variable:statsName[0], mean:stage3Data.Deny.gpa, deviation:stage3Data.Deny.gpaD},
					{variable:statsName[1], mean:stage3Data.Deny.cse142grade, deviation:stage3Data.Deny.cse142gradeD},
					{variable:statsName[20], mean:stage3Data.Deny.cse142firstclass, deviation:stage3Data.Deny.cse142firstclassD},
					{variable:statsName[2], mean:stage3Data.Deny.cse143grade, deviation:stage3Data.Deny.cse143gradeD},
					{variable:statsName[21], mean:stage3Data.Deny.cse143firstclass, deviation:stage3Data.Deny.cse143firstclassD},
					{variable:statsName[3], mean:stage3Data.Deny.appscores, deviation:stage3Data.Deny.appscoresD},
					{variable:statsName[4], mean:stage3Data.Deny.stdmath, deviation:stage3Data.Deny.stdmathD},
					{variable:statsName[5], mean:stage3Data.Deny.stdverbal, deviation:stage3Data.Deny.stdverbalD},
					{variable:statsName[6], mean:stage3Data.Deny.stdcomb, deviation:stage3Data.Deny.stdcombD},

					{variable:statsName[7], mean:stage3Data.Deny.Q5b, deviation:stage3Data.Deny.Q5bD},
					{variable:statsName[8], mean:stage3Data.Deny.Q5d, deviation:stage3Data.Deny.Q5dD},
					{variable:statsName[9], mean:stage3Data.Deny.Q5e, deviation:stage3Data.Deny.Q5eD},
					{variable:statsName[10], mean:stage3Data.Deny.Q5f, deviation:stage3Data.Deny.Q5fD},
					{variable:statsName[11], mean:stage3Data.Deny.Q7a, deviation:stage3Data.Deny.Q7aD},
					{variable:statsName[12], mean:stage3Data.Deny.Q8a, deviation:stage3Data.Deny.Q8aD},
					{variable:statsName[13], mean:stage3Data.Deny.Q8c, deviation:stage3Data.Deny.Q8cD},
					{variable:statsName[14], mean:stage3Data.Deny.Q8d, deviation:stage3Data.Deny.Q8dD},
					{variable:statsName[15], mean:stage3Data.Deny.Q8e, deviation:stage3Data.Deny.Q8eD},
					{variable:statsName[16], mean:stage3Data.Deny.Q8g, deviation:stage3Data.Deny.Q8gD},
					{variable:statsName[17], mean:stage3Data.Deny.Q8i, deviation:stage3Data.Deny.Q8iD},
					{variable:statsName[18], mean:stage3Data.Deny.Q9, deviation:stage3Data.Deny.Q9D},
					{variable:statsName[19], mean:stage3Data.Deny.Q11, deviation:stage3Data.Deny.Q11D},
				];
	}
	
	var weight7Stage3 = weightDef;
	if(typeof(stage3Data.SD) != "undefined"){
		weight7Stage3 = stage3Data.SD.weight;
		stage3StatsSD = [{variable:statsName[0], mean:stage3Data.SD.gpa, deviation:stage3Data.SD.gpaD},
					{variable:statsName[1], mean:stage3Data.SD.cse142grade, deviation:stage3Data.SD.cse142gradeD},
					{variable:statsName[20], mean:stage3Data.SD.cse142firstclass, deviation:stage3Data.SD.cse142firstclassD},
					{variable:statsName[2], mean:stage3Data.SD.cse143grade, deviation:stage3Data.SD.cse143gradeD},
					{variable:statsName[21], mean:stage3Data.SD.cse143firstclass, deviation:stage3Data.SD.cse143firstclassD},
					{variable:statsName[3], mean:stage3Data.SD.appscores, deviation:stage3Data.SD.appscoresD},
					{variable:statsName[4], mean:stage3Data.SD.stdmath, deviation:stage3Data.SD.stdmathD},
					{variable:statsName[5], mean:stage3Data.SD.stdverbal, deviation:stage3Data.SD.stdverbalD},
					{variable:statsName[6], mean:stage3Data.SD.stdcomb, deviation:stage3Data.SD.stdcombD},

					{variable:statsName[7], mean:stage3Data.SD.Q5b, deviation:stage3Data.SD.Q5bD},
					{variable:statsName[8], mean:stage3Data.SD.Q5d, deviation:stage3Data.SD.Q5dD},
					{variable:statsName[9], mean:stage3Data.SD.Q5e, deviation:stage3Data.SD.Q5eD},
					{variable:statsName[10], mean:stage3Data.SD.Q5f, deviation:stage3Data.SD.Q5fD},
					{variable:statsName[11], mean:stage3Data.SD.Q7a, deviation:stage3Data.SD.Q7aD},
					{variable:statsName[12], mean:stage3Data.SD.Q8a, deviation:stage3Data.SD.Q8aD},
					{variable:statsName[13], mean:stage3Data.SD.Q8c, deviation:stage3Data.SD.Q8cD},
					{variable:statsName[14], mean:stage3Data.SD.Q8d, deviation:stage3Data.SD.Q8dD},
					{variable:statsName[15], mean:stage3Data.SD.Q8e, deviation:stage3Data.SD.Q8eD},
					{variable:statsName[16], mean:stage3Data.SD.Q8g, deviation:stage3Data.SD.Q8gD},
					{variable:statsName[17], mean:stage3Data.SD.Q8i, deviation:stage3Data.SD.Q8iD},
					{variable:statsName[18], mean:stage3Data.SD.Q9, deviation:stage3Data.SD.Q9D},
					{variable:statsName[19], mean:stage3Data.SD.Q11, deviation:stage3Data.SD.Q11D},
				];
	}

	/*if(typeof(weight2Stage2) =="number"){
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
	}*/


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
	return [stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsAccept, stage3StatsDNA, stage3StatsDeny, stage3StatsSD]
}


function renderData(data){

//Q5b	Q5d	Q5e	Q5f	Q5g	Q7a	Q8a	Q8c	Q8d	Q8e	Q8g	Q8i	Q9	Q10	Q11	Q12	GPA	admRecCalc	acadSubCalc	pqaSubCalc	stdmath	stdverbal	stdcomb	appscores	cse142firstclass	cse142grade	cse143firstclass	cse143grade


	graph = {"nodes" : [], "links" : []};
	//[stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsAccept, stage3StatsDNA, stage3StatsDeny, stage3StatsSD];
	var groupStats = createNodeData(graph, data);
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

	//compute the data statistics
	//stats = computeStatistics(data);

	//create a table
	//stage 1 stats are the same as summary table
	var t = d3.table();
	//render the data in table
	d3.select("body")
    	.datum(groupStats[0]) /// filter on lines
    	.call(t)
}
