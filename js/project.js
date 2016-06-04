var weightDef = 0.01;
var transitionDuration = 1000;
var defMinValue = 10000;
var statsName = ["GPA", "Grade (CSE 142)", "Grade (CSE 143)", "Application Score", "Std Math", "Std Verbal", "Std Comb", "Q5b", "Q5d", "Q5e", "Q5f", "Q7a", 
		 "Q8a", "Q8c", "Q8d", "Q8e", "Q8g", "Q8i", "Q9", "Q11", "CSE 142 (first class)", "CSE 143 (first class)"];

var groupStats = []
var numberOfDecimalPlaces = 2;

//function to create nodes and links of sankey diagram
function createNodeData(graph, data){
	//filter data for stage 0 (overall stage)
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
	var stage1Stats = [{variable:statsName[0], mean:typeof(dataStage1Var.gpa) != "undefined"? dataStage1Var.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.gpaD) != "undefined"? dataStage1Var.gpaD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[1], mean:typeof(dataStage1Var.cse142grade) != "undefined"? dataStage1Var.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.cse142gradeD) != "undefined"? dataStage1Var.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[20], mean:typeof(dataStage1Var.cse142firstclass) != "undefined"? dataStage1Var.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.cse142firstclassD) != "undefined"? dataStage1Var.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[2], mean:typeof(dataStage1Var.cse143grade) != "undefined"? dataStage1Var.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.cse143gradeD) != "undefined"? dataStage1Var.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[21], mean:typeof(dataStage1Var.cse143firstclass) != "undefined"? dataStage1Var.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.cse143firstclassD) != "undefined"? dataStage1Var.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[3], mean:typeof(dataStage1Var.appscores) != "undefined"? dataStage1Var.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.appscoresD) != "undefined"? dataStage1Var.appscoresD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[4], mean:typeof(dataStage1Var.stdmath) != "undefined"? dataStage1Var.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.stdmathD) != "undefined"? dataStage1Var.stdmathD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[5], mean:typeof(dataStage1Var.stdverbal) != "undefined"? dataStage1Var.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.stdverbalD) != "undefined"? dataStage1Var.stdverbalD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[6], mean:typeof(dataStage1Var.stdcomb) != "undefined"? dataStage1Var.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.stdcombD) != "undefined"? dataStage1Var.stdcombD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[7], mean:typeof(dataStage1Var.Q5b) != "undefined"? dataStage1Var.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q5bD) != "undefined"? dataStage1Var.Q5bD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[8], mean:typeof(dataStage1Var.Q5d) != "undefined"? dataStage1Var.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q5dD) != "undefined"? dataStage1Var.Q5dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[9], mean:typeof(dataStage1Var.Q5e) != "undefined"? dataStage1Var.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q5eD) != "undefined"? dataStage1Var.Q5eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[10], mean:typeof(dataStage1Var.Q5f) != "undefined"? dataStage1Var.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q5fD) != "undefined"? dataStage1Var.Q5fD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[11], mean:typeof(dataStage1Var.Q7a) != "undefined"? dataStage1Var.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q7aD) != "undefined"? dataStage1Var.Q7aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[12], mean:typeof(dataStage1Var.Q8a) != "undefined"? dataStage1Var.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8aD) != "undefined"? dataStage1Var.Q8aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[13], mean:typeof(dataStage1Var.Q8c) != "undefined"? dataStage1Var.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8cD) != "undefined"? dataStage1Var.Q8cD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[14], mean:typeof(dataStage1Var.Q8d) != "undefined"? dataStage1Var.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8dD) != "undefined"? dataStage1Var.Q8dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[15], mean:typeof(dataStage1Var.Q8e) != "undefined"? dataStage1Var.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8eD) != "undefined"? dataStage1Var.Q8eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[16], mean:typeof(dataStage1Var.Q8g) != "undefined"? dataStage1Var.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8gD) != "undefined"? dataStage1Var.Q8gD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[17], mean:typeof(dataStage1Var.Q8i) != "undefined"? dataStage1Var.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8iD) != "undefined"? dataStage1Var.Q8iD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[18], mean:typeof(dataStage1Var.Q9) != "undefined"? dataStage1Var.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q9D) != "undefined"? dataStage1Var.Q9D.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[19], mean:typeof(dataStage1Var.Q11) != "undefined"? dataStage1Var.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q11D) != "undefined"? dataStage1Var.Q11D.toFixed(numberOfDecimalPlaces): "NA"},
								];

	//filter data for stage 1
	var groupedStage2= d3.nest()
		        .key(function(d) { return d.source; })
		        .key(function(d) { return d.target142; })
		        .key(function(d) { return d.target143; })
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
		var stage2StatsCS143 = [{variable:statsName[0], mean:typeof(stage2Data.CSE143.gpa) != "undefined"? stage2Data.CSE143.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.gpaD) != "undefined"? stage2Data.CSE143.gpaD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[1], mean:typeof(stage2Data.CSE143.cse142grade) != "undefined"? stage2Data.CSE143.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.cse142gradeD) != "undefined"? stage2Data.CSE143.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[20], mean:typeof(stage2Data.CSE143.cse142firstclass) != "undefined"? stage2Data.CSE143.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.cse142firstclassD) != "undefined"? stage2Data.CSE143.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[2], mean:typeof(stage2Data.CSE143.cse143grade) != "undefined"? stage2Data.CSE143.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.cse143gradeD) != "undefined"? stage2Data.CSE143.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[21], mean:typeof(stage2Data.CSE143.cse143firstclass) != "undefined"? stage2Data.CSE143.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.cse143firstclassD) != "undefined"? stage2Data.CSE143.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[3], mean:typeof(stage2Data.CSE143.appscores) != "undefined"? stage2Data.CSE143.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.appscoresD) != "undefined"? stage2Data.CSE143.appscoresD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[4], mean:typeof(stage2Data.CSE143.stdmath) != "undefined"? stage2Data.CSE143.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.stdmathD) != "undefined"? stage2Data.CSE143.stdmathD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[5], mean:typeof(stage2Data.CSE143.stdverbal) != "undefined"? stage2Data.CSE143.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.stdverbalD) != "undefined"? stage2Data.CSE143.stdverbalD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[6], mean:typeof(stage2Data.CSE143.stdcomb) != "undefined"? stage2Data.CSE143.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.stdcombD) != "undefined"? stage2Data.CSE143.stdcombD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[7], mean:typeof(stage2Data.CSE143.Q5b) != "undefined"? stage2Data.CSE143.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q5bD) != "undefined"? stage2Data.CSE143.Q5bD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[8], mean:typeof(stage2Data.CSE143.Q5d) != "undefined"? stage2Data.CSE143.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q5dD) != "undefined"? stage2Data.CSE143.Q5dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[9], mean:typeof(stage2Data.CSE143.Q5e) != "undefined"? stage2Data.CSE143.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q5eD) != "undefined"? stage2Data.CSE143.Q5eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[10], mean:typeof(stage2Data.CSE143.Q5f) != "undefined"? stage2Data.CSE143.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q5fD) != "undefined"? stage2Data.CSE143.Q5fD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[11], mean:typeof(stage2Data.CSE143.Q7a) != "undefined"? stage2Data.CSE143.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q7aD) != "undefined"? stage2Data.CSE143.Q7aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[12], mean:typeof(stage2Data.CSE143.Q8a) != "undefined"? stage2Data.CSE143.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8aD) != "undefined"? stage2Data.CSE143.Q8aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[13], mean:typeof(stage2Data.CSE143.Q8c) != "undefined"? stage2Data.CSE143.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8cD) != "undefined"? stage2Data.CSE143.Q8cD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[14], mean:typeof(stage2Data.CSE143.Q8d) != "undefined"? stage2Data.CSE143.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8dD) != "undefined"? stage2Data.CSE143.Q8dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[15], mean:typeof(stage2Data.CSE143.Q8e) != "undefined"? stage2Data.CSE143.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8eD) != "undefined"? stage2Data.CSE143.Q8eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[16], mean:typeof(stage2Data.CSE143.Q8g) != "undefined"? stage2Data.CSE143.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8gD) != "undefined"? stage2Data.CSE143.Q8gD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[17], mean:typeof(stage2Data.CSE143.Q8i) != "undefined"? stage2Data.CSE143.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8iD) != "undefined"? stage2Data.CSE143.Q8iD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[18], mean:typeof(stage2Data.CSE143.Q9) != "undefined"? stage2Data.CSE143.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q9D) != "undefined"? stage2Data.CSE143.Q9D.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[19], mean:typeof(stage2Data.CSE143.Q11) != "undefined"? stage2Data.CSE143.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q11D) != "undefined"? stage2Data.CSE143.Q11D.toFixed(numberOfDecimalPlaces): "NA"},
								];
	}
	var weight2Stage2 = weightDef;
	if(typeof(stage2Data.NA143) != "undefined"){
		weight2Stage2 = stage2Data.NA143.weight;
		
		stage2StatsNA143 = [{variable:statsName[0], mean:typeof(stage2Data.NA143.gpa) != "undefined"? stage2Data.NA143.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.gpaD) != "undefined"? stage2Data.NA143.gpaD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[1], mean:typeof(stage2Data.NA143.cse142grade) != "undefined"? stage2Data.NA143.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.cse142gradeD) != "undefined"? stage2Data.NA143.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[20], mean:typeof(stage2Data.NA143.cse142firstclass) != "undefined"? stage2Data.NA143.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.cse142firstclassD) != "undefined"? stage2Data.NA143.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[2], mean:typeof(stage2Data.NA143.cse143grade) != "undefined"? stage2Data.NA143.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.cse143gradeD) != "undefined"? stage2Data.NA143.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[21], mean:typeof(stage2Data.NA143.cse143firstclass) != "undefined"? stage2Data.NA143.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.cse143firstclassD) != "undefined"? stage2Data.NA143.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[3], mean:typeof(stage2Data.NA143.appscores) != "undefined"? stage2Data.NA143.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.appscoresD) != "undefined"? stage2Data.NA143.appscoresD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[4], mean:typeof(stage2Data.NA143.stdmath) != "undefined"? stage2Data.NA143.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.stdmathD) != "undefined"? stage2Data.NA143.stdmathD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[5], mean:typeof(stage2Data.NA143.stdverbal) != "undefined"? stage2Data.NA143.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.stdverbalD) != "undefined"? stage2Data.NA143.stdverbalD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[6], mean:typeof(stage2Data.NA143.stdcomb) != "undefined"? stage2Data.NA143.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.stdcombD) != "undefined"? stage2Data.NA143.stdcombD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[7], mean:typeof(stage2Data.NA143.Q5b) != "undefined"? stage2Data.NA143.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q5bD) != "undefined"? stage2Data.NA143.Q5bD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[8], mean:typeof(stage2Data.NA143.Q5d) != "undefined"? stage2Data.NA143.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q5dD) != "undefined"? stage2Data.NA143.Q5dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[9], mean:typeof(stage2Data.NA143.Q5e) != "undefined"? stage2Data.NA143.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q5eD) != "undefined"? stage2Data.NA143.Q5eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[10], mean:typeof(stage2Data.NA143.Q5f) != "undefined"? stage2Data.NA143.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q5fD) != "undefined"? stage2Data.NA143.Q5fD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[11], mean:typeof(stage2Data.NA143.Q7a) != "undefined"? stage2Data.NA143.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q7aD) != "undefined"? stage2Data.NA143.Q7aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[12], mean:typeof(stage2Data.NA143.Q8a) != "undefined"? stage2Data.NA143.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8aD) != "undefined"? stage2Data.NA143.Q8aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[13], mean:typeof(stage2Data.NA143.Q8c) != "undefined"? stage2Data.NA143.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8cD) != "undefined"? stage2Data.NA143.Q8cD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[14], mean:typeof(stage2Data.NA143.Q8d) != "undefined"? stage2Data.NA143.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8dD) != "undefined"? stage2Data.NA143.Q8dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[15], mean:typeof(stage2Data.NA143.Q8e) != "undefined"? stage2Data.NA143.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8eD) != "undefined"? stage2Data.NA143.Q8eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[16], mean:typeof(stage2Data.NA143.Q8g) != "undefined"? stage2Data.NA143.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8gD) != "undefined"? stage2Data.NA143.Q8gD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[17], mean:typeof(stage2Data.NA143.Q8i) != "undefined"? stage2Data.NA143.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8iD) != "undefined"? stage2Data.NA143.Q8iD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[18], mean:typeof(stage2Data.NA143.Q9) != "undefined"? stage2Data.NA143.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q9D) != "undefined"? stage2Data.NA143.Q9D.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[19], mean:typeof(stage2Data.NA143.Q11) != "undefined"? stage2Data.NA143.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q11D) != "undefined"? stage2Data.NA143.Q11D.toFixed(numberOfDecimalPlaces): "NA"},
								];



	}
	
	if(typeof(weight1Stage2) =="number"){
		graph.nodes.push({ "name": source[0]});
		graph.nodes.push({ "name": source[1]});
		graph.links.push({ "source": source[0],
		         "target": source[1],
		         "value": +weight1Stage2});
	}
	else{
		graph.nodes.push({ "name": source[0]});
		graph.nodes.push({ "name": source[1]});
		graph.links.push({ "source": source[0],
		         "target": source[1],
		         "value": +weightDef});
	}		

	if(typeof(weight2Stage2) =="number"){
		graph.nodes.push({ "name": source[0]});
		graph.nodes.push({ "name": source[2]});
		graph.links.push({ "source": source[0],
		         "target": source[2],
		         "value": +weight2Stage2});
	}
	else{
		graph.nodes.push({ "name": source[0]});
		graph.nodes.push({ "name": source[2]});
		graph.links.push({ "source": source[0],
		         "target": source[2],
		         "value": +weightDef});
	}

	//filter data for stage 2
	var groupedStage3= d3.nest()
		        .key(function(d) { return d.source; })
		        .key(function(d) { return d.target142; })
		        .key(function(d) { return d.target143; })
		        .key(function(d) { return d.admitStatus; })
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

	var stage3Data = groupedStage3.student.CSE142.CSE143;
	var stage3StatsApply = [];
	var stage3StatsDNA = [];
	
	var weight1Stage3 = weightDef;
	if(typeof(stage3Data.Apply) != "undefined"){
		weight1Stage3 = stage3Data.Apply.weight;
		stage3StatsApply = [{variable:statsName[0], mean:typeof(stage3Data.Apply.gpa) != "undefined"? stage3Data.Apply.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.gpaD) != "undefined"? stage3Data.Apply.gpaD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[1], mean:typeof(stage3Data.Apply.cse142grade) != "undefined"? stage3Data.Apply.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.cse142gradeD) != "undefined"? stage3Data.Apply.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[20], mean:typeof(stage3Data.Apply.cse142firstclass) != "undefined"? stage3Data.Apply.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.cse142firstclassD) != "undefined"? stage3Data.Apply.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[2], mean:typeof(stage3Data.Apply.cse143grade) != "undefined"? stage3Data.Apply.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.cse143gradeD) != "undefined"? stage3Data.Apply.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[21], mean:typeof(stage3Data.Apply.cse143firstclass) != "undefined"? stage3Data.Apply.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.cse143firstclassD) != "undefined"? stage3Data.Apply.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[3], mean:typeof(stage3Data.Apply.appscores) != "undefined"? stage3Data.Apply.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.appscoresD) != "undefined"? stage3Data.Apply.appscoresD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[4], mean:typeof(stage3Data.Apply.stdmath) != "undefined"? stage3Data.Apply.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.stdmathD) != "undefined"? stage3Data.Apply.stdmathD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[5], mean:typeof(stage3Data.Apply.stdverbal) != "undefined"? stage3Data.Apply.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.stdverbalD) != "undefined"? stage3Data.Apply.stdverbalD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[6], mean:typeof(stage3Data.Apply.stdcomb) != "undefined"? stage3Data.Apply.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.stdcombD) != "undefined"? stage3Data.Apply.stdcombD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[7], mean:typeof(stage3Data.Apply.Q5b) != "undefined"? stage3Data.Apply.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q5bD) != "undefined"? stage3Data.Apply.Q5bD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[8], mean:typeof(stage3Data.Apply.Q5d) != "undefined"? stage3Data.Apply.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q5dD) != "undefined"? stage3Data.Apply.Q5dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[9], mean:typeof(stage3Data.Apply.Q5e) != "undefined"? stage3Data.Apply.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q5eD) != "undefined"? stage3Data.Apply.Q5eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[10], mean:typeof(stage3Data.Apply.Q5f) != "undefined"? stage3Data.Apply.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q5fD) != "undefined"? stage3Data.Apply.Q5fD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[11], mean:typeof(stage3Data.Apply.Q7a) != "undefined"? stage3Data.Apply.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q7aD) != "undefined"? stage3Data.Apply.Q7aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[12], mean:typeof(stage3Data.Apply.Q8a) != "undefined"? stage3Data.Apply.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8aD) != "undefined"? stage3Data.Apply.Q8aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[13], mean:typeof(stage3Data.Apply.Q8c) != "undefined"? stage3Data.Apply.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8cD) != "undefined"? stage3Data.Apply.Q8cD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[14], mean:typeof(stage3Data.Apply.Q8d) != "undefined"? stage3Data.Apply.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8dD) != "undefined"? stage3Data.Apply.Q8dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[15], mean:typeof(stage3Data.Apply.Q8e) != "undefined"? stage3Data.Apply.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8eD) != "undefined"? stage3Data.Apply.Q8eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[16], mean:typeof(stage3Data.Apply.Q8g) != "undefined"? stage3Data.Apply.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8gD) != "undefined"? stage3Data.Apply.Q8gD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[17], mean:typeof(stage3Data.Apply.Q8i) != "undefined"? stage3Data.Apply.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8iD) != "undefined"? stage3Data.Apply.Q8iD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[18], mean:typeof(stage3Data.Apply.Q9) != "undefined"? stage3Data.Apply.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q9D) != "undefined"? stage3Data.Apply.Q9D.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[19], mean:typeof(stage3Data.Apply.Q11) != "undefined"? stage3Data.Apply.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q11D) != "undefined"? stage3Data.Apply.Q11D.toFixed(numberOfDecimalPlaces): "NA"},
								];
	}
	
	var weight2Stage3 = weightDef;
	if(typeof(stage3Data.DNA) != "undefined"){
		weight2Stage3 = stage3Data.DNA.weight;
		stage3StatsDNA = [{variable:statsName[0], mean:typeof(stage3Data.DNA.gpa) != "undefined"? stage3Data.DNA.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.gpaD) != "undefined"? stage3Data.DNA.gpaD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[1], mean:typeof(stage3Data.DNA.cse142grade) != "undefined"? stage3Data.DNA.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.cse142gradeD) != "undefined"? stage3Data.DNA.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[20], mean:typeof(stage3Data.DNA.cse142firstclass) != "undefined"? stage3Data.DNA.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.cse142firstclassD) != "undefined"? stage3Data.DNA.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[2], mean:typeof(stage3Data.DNA.cse143grade) != "undefined"? stage3Data.DNA.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.cse143gradeD) != "undefined"? stage3Data.DNA.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[21], mean:typeof(stage3Data.DNA.cse143firstclass) != "undefined"? stage3Data.DNA.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.cse143firstclassD) != "undefined"? stage3Data.DNA.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[3], mean:typeof(stage3Data.DNA.appscores) != "undefined"? stage3Data.DNA.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.appscoresD) != "undefined"? stage3Data.DNA.appscoresD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[4], mean:typeof(stage3Data.DNA.stdmath) != "undefined"? stage3Data.DNA.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.stdmathD) != "undefined"? stage3Data.DNA.stdmathD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[5], mean:typeof(stage3Data.DNA.stdverbal) != "undefined"? stage3Data.DNA.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.stdverbalD) != "undefined"? stage3Data.DNA.stdverbalD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[6], mean:typeof(stage3Data.DNA.stdcomb) != "undefined"? stage3Data.DNA.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.stdcombD) != "undefined"? stage3Data.DNA.stdcombD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[7], mean:typeof(stage3Data.DNA.Q5b) != "undefined"? stage3Data.DNA.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q5bD) != "undefined"? stage3Data.DNA.Q5bD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[8], mean:typeof(stage3Data.DNA.Q5d) != "undefined"? stage3Data.DNA.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q5dD) != "undefined"? stage3Data.DNA.Q5dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[9], mean:typeof(stage3Data.DNA.Q5e) != "undefined"? stage3Data.DNA.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q5eD) != "undefined"? stage3Data.DNA.Q5eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[10], mean:typeof(stage3Data.DNA.Q5f) != "undefined"? stage3Data.DNA.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q5fD) != "undefined"? stage3Data.DNA.Q5fD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[11], mean:typeof(stage3Data.DNA.Q7a) != "undefined"? stage3Data.DNA.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q7aD) != "undefined"? stage3Data.DNA.Q7aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[12], mean:typeof(stage3Data.DNA.Q8a) != "undefined"? stage3Data.DNA.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8aD) != "undefined"? stage3Data.DNA.Q8aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[13], mean:typeof(stage3Data.DNA.Q8c) != "undefined"? stage3Data.DNA.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8cD) != "undefined"? stage3Data.DNA.Q8cD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[14], mean:typeof(stage3Data.DNA.Q8d) != "undefined"? stage3Data.DNA.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8dD) != "undefined"? stage3Data.DNA.Q8dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[15], mean:typeof(stage3Data.DNA.Q8e) != "undefined"? stage3Data.DNA.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8eD) != "undefined"? stage3Data.DNA.Q8eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[16], mean:typeof(stage3Data.DNA.Q8g) != "undefined"? stage3Data.DNA.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8gD) != "undefined"? stage3Data.DNA.Q8gD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[17], mean:typeof(stage3Data.DNA.Q8i) != "undefined"? stage3Data.DNA.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8iD) != "undefined"? stage3Data.DNA.Q8iD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[18], mean:typeof(stage3Data.DNA.Q9) != "undefined"? stage3Data.DNA.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q9D) != "undefined"? stage3Data.DNA.Q9D.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[19], mean:typeof(stage3Data.DNA.Q11) != "undefined"? stage3Data.DNA.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q11D) != "undefined"? stage3Data.DNA.Q11D.toFixed(numberOfDecimalPlaces): "NA"},
								];
	}
	
	if(typeof(weight1Stage3) =="number"){
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[3]});
		graph.links.push({ "source": source[1],
		         "target": source[3],
		         "value": +weight1Stage3});
	}
	else{
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[3]});
		graph.links.push({ "source": source[1],
		         "target": source[3],
		         "value": +weightDef});
	}

	if(typeof(weight2Stage3) =="number"){
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[4]});
		graph.links.push({ "source": source[1],
		         "target": source[4],
		         "value": +weight2Stage3});
	}
	else{
		graph.nodes.push({ "name": source[1]});
		graph.nodes.push({ "name": source[4]});
		graph.links.push({ "source": source[1],
		         "target": source[4],
		         "value": +weightDef});
	}
	
	//stage 4
	var groupedStage4= d3.nest()
		        .key(function(d) { return d.source; })
		        .key(function(d) { return d.target142; })
		        .key(function(d) { return d.target143; })
		        .key(function(d) { return d.admitStatus; })
		        .key(function(d) { return d.admitStatusNew; })
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
	var stage4Data = groupedStage4.student.CSE142.CSE143.Apply;	 
	var stage4StatsAccept = [];
	var stage4StatsDeny = [];
	var stage4StatsSD = [];
	
	var weight1Stage4 = weightDef;
	if(typeof(stage4Data.Accept) != "undefined"){
		weight1Stage4 = stage4Data.Accept.weight;
		stage4StatsAccept = [{variable:statsName[0], mean:typeof(stage4Data.Accept.gpa) != "undefined"? stage4Data.Accept.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.gpaD) != "undefined"? stage4Data.Accept.gpaD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[1], mean:typeof(stage4Data.Accept.cse142grade) != "undefined"? stage4Data.Accept.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.cse142gradeD) != "undefined"? stage4Data.Accept.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[20], mean:typeof(stage4Data.Accept.cse142firstclass) != "undefined"? stage4Data.Accept.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.cse142firstclassD) != "undefined"? stage4Data.Accept.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[2], mean:typeof(stage4Data.Accept.cse143grade) != "undefined"? stage4Data.Accept.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.cse143gradeD) != "undefined"? stage4Data.Accept.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[21], mean:typeof(stage4Data.Accept.cse143firstclass) != "undefined"? stage4Data.Accept.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.cse143firstclassD) != "undefined"? stage4Data.Accept.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[3], mean:typeof(stage4Data.Accept.appscores) != "undefined"? stage4Data.Accept.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.appscoresD) != "undefined"? stage4Data.Accept.appscoresD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[4], mean:typeof(stage4Data.Accept.stdmath) != "undefined"? stage4Data.Accept.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.stdmathD) != "undefined"? stage4Data.Accept.stdmathD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[5], mean:typeof(stage4Data.Accept.stdverbal) != "undefined"? stage4Data.Accept.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.stdverbalD) != "undefined"? stage4Data.Accept.stdverbalD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[6], mean:typeof(stage4Data.Accept.stdcomb) != "undefined"? stage4Data.Accept.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.stdcombD) != "undefined"? stage4Data.Accept.stdcombD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[7], mean:typeof(stage4Data.Accept.Q5b) != "undefined"? stage4Data.Accept.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q5bD) != "undefined"? stage4Data.Accept.Q5bD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[8], mean:typeof(stage4Data.Accept.Q5d) != "undefined"? stage4Data.Accept.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q5dD) != "undefined"? stage4Data.Accept.Q5dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[9], mean:typeof(stage4Data.Accept.Q5e) != "undefined"? stage4Data.Accept.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q5eD) != "undefined"? stage4Data.Accept.Q5eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[10], mean:typeof(stage4Data.Accept.Q5f) != "undefined"? stage4Data.Accept.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q5fD) != "undefined"? stage4Data.Accept.Q5fD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[11], mean:typeof(stage4Data.Accept.Q7a) != "undefined"? stage4Data.Accept.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q7aD) != "undefined"? stage4Data.Accept.Q7aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[12], mean:typeof(stage4Data.Accept.Q8a) != "undefined"? stage4Data.Accept.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8aD) != "undefined"? stage4Data.Accept.Q8aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[13], mean:typeof(stage4Data.Accept.Q8c) != "undefined"? stage4Data.Accept.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8cD) != "undefined"? stage4Data.Accept.Q8cD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[14], mean:typeof(stage4Data.Accept.Q8d) != "undefined"? stage4Data.Accept.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8dD) != "undefined"? stage4Data.Accept.Q8dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[15], mean:typeof(stage4Data.Accept.Q8e) != "undefined"? stage4Data.Accept.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8eD) != "undefined"? stage4Data.Accept.Q8eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[16], mean:typeof(stage4Data.Accept.Q8g) != "undefined"? stage4Data.Accept.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8gD) != "undefined"? stage4Data.Accept.Q8gD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[17], mean:typeof(stage4Data.Accept.Q8i) != "undefined"? stage4Data.Accept.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8iD) != "undefined"? stage4Data.Accept.Q8iD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[18], mean:typeof(stage4Data.Accept.Q9) != "undefined"? stage4Data.Accept.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q9D) != "undefined"? stage4Data.Accept.Q9D.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[19], mean:typeof(stage4Data.Accept.Q11) != "undefined"? stage4Data.Accept.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q11D) != "undefined"? stage4Data.Accept.Q11D.toFixed(numberOfDecimalPlaces): "NA"},
								];
	}
	
	var weight2Stage4 = weightDef;
	if(typeof(stage4Data.Deny) != "undefined"){
		weight2Stage4 = stage4Data.Deny.weight;
		stage4StatsDeny = [{variable:statsName[0], mean:typeof(stage4Data.Deny.gpa) != "undefined"? stage4Data.Deny.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.gpaD) != "undefined"? stage4Data.Deny.gpaD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[1], mean:typeof(stage4Data.Deny.cse142grade) != "undefined"? stage4Data.Deny.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.cse142gradeD) != "undefined"? stage4Data.Deny.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[20], mean:typeof(stage4Data.Deny.cse142firstclass) != "undefined"? stage4Data.Deny.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.cse142firstclassD) != "undefined"? stage4Data.Deny.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[2], mean:typeof(stage4Data.Deny.cse143grade) != "undefined"? stage4Data.Deny.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.cse143gradeD) != "undefined"? stage4Data.Deny.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[21], mean:typeof(stage4Data.Deny.cse143firstclass) != "undefined"? stage4Data.Deny.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.cse143firstclassD) != "undefined"? stage4Data.Deny.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[3], mean:typeof(stage4Data.Deny.appscores) != "undefined"? stage4Data.Deny.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.appscoresD) != "undefined"? stage4Data.Deny.appscoresD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[4], mean:typeof(stage4Data.Deny.stdmath) != "undefined"? stage4Data.Deny.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.stdmathD) != "undefined"? stage4Data.Deny.stdmathD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[5], mean:typeof(stage4Data.Deny.stdverbal) != "undefined"? stage4Data.Deny.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.stdverbalD) != "undefined"? stage4Data.Deny.stdverbalD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[6], mean:typeof(stage4Data.Deny.stdcomb) != "undefined"? stage4Data.Deny.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.stdcombD) != "undefined"? stage4Data.Deny.stdcombD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[7], mean:typeof(stage4Data.Deny.Q5b) != "undefined"? stage4Data.Deny.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q5bD) != "undefined"? stage4Data.Deny.Q5bD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[8], mean:typeof(stage4Data.Deny.Q5d) != "undefined"? stage4Data.Deny.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q5dD) != "undefined"? stage4Data.Deny.Q5dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[9], mean:typeof(stage4Data.Deny.Q5e) != "undefined"? stage4Data.Deny.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q5eD) != "undefined"? stage4Data.Deny.Q5eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[10], mean:typeof(stage4Data.Deny.Q5f) != "undefined"? stage4Data.Deny.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q5fD) != "undefined"? stage4Data.Deny.Q5fD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[11], mean:typeof(stage4Data.Deny.Q7a) != "undefined"? stage4Data.Deny.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q7aD) != "undefined"? stage4Data.Deny.Q7aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[12], mean:typeof(stage4Data.Deny.Q8a) != "undefined"? stage4Data.Deny.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8aD) != "undefined"? stage4Data.Deny.Q8aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[13], mean:typeof(stage4Data.Deny.Q8c) != "undefined"? stage4Data.Deny.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8cD) != "undefined"? stage4Data.Deny.Q8cD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[14], mean:typeof(stage4Data.Deny.Q8d) != "undefined"? stage4Data.Deny.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8dD) != "undefined"? stage4Data.Deny.Q8dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[15], mean:typeof(stage4Data.Deny.Q8e) != "undefined"? stage4Data.Deny.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8eD) != "undefined"? stage4Data.Deny.Q8eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[16], mean:typeof(stage4Data.Deny.Q8g) != "undefined"? stage4Data.Deny.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8gD) != "undefined"? stage4Data.Deny.Q8gD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[17], mean:typeof(stage4Data.Deny.Q8i) != "undefined"? stage4Data.Deny.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8iD) != "undefined"? stage4Data.Deny.Q8iD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[18], mean:typeof(stage4Data.Deny.Q9) != "undefined"? stage4Data.Deny.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q9D) != "undefined"? stage4Data.Deny.Q9D.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[19], mean:typeof(stage4Data.Deny.Q11) != "undefined"? stage4Data.Deny.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q11D) != "undefined"? stage4Data.Deny.Q11D.toFixed(numberOfDecimalPlaces): "NA"},
								];
	}
	
	var weight3Stage4 = weightDef;
	if(typeof(stage4Data.SD) != "undefined"){
		weight3Stage4 = stage4Data.SD.weight;
		stage4StatsSD = [{variable:statsName[0], mean:typeof(stage4Data.SD.gpa) != "undefined"? stage4Data.SD.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.gpaD) != "undefined"? stage4Data.SD.gpaD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[1], mean:typeof(stage4Data.SD.cse142grade) != "undefined"? stage4Data.SD.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.cse142gradeD) != "undefined"? stage4Data.SD.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[20], mean:typeof(stage4Data.SD.cse142firstclass) != "undefined"? stage4Data.SD.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.cse142firstclassD) != "undefined"? stage4Data.SD.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[2], mean:typeof(stage4Data.SD.cse143grade) != "undefined"? stage4Data.SD.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.cse143gradeD) != "undefined"? stage4Data.SD.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[21], mean:typeof(stage4Data.SD.cse143firstclass) != "undefined"? stage4Data.SD.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.cse143firstclassD) != "undefined"? stage4Data.SD.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[3], mean:typeof(stage4Data.SD.appscores) != "undefined"? stage4Data.SD.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.appscoresD) != "undefined"? stage4Data.SD.appscoresD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[4], mean:typeof(stage4Data.SD.stdmath) != "undefined"? stage4Data.SD.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.stdmathD) != "undefined"? stage4Data.SD.stdmathD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[5], mean:typeof(stage4Data.SD.stdverbal) != "undefined"? stage4Data.SD.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.stdverbalD) != "undefined"? stage4Data.SD.stdverbalD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[6], mean:typeof(stage4Data.SD.stdcomb) != "undefined"? stage4Data.SD.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.stdcombD) != "undefined"? stage4Data.SD.stdcombD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[7], mean:typeof(stage4Data.SD.Q5b) != "undefined"? stage4Data.SD.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q5bD) != "undefined"? stage4Data.SD.Q5bD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[8], mean:typeof(stage4Data.SD.Q5d) != "undefined"? stage4Data.SD.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q5dD) != "undefined"? stage4Data.SD.Q5dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[9], mean:typeof(stage4Data.SD.Q5e) != "undefined"? stage4Data.SD.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q5eD) != "undefined"? stage4Data.SD.Q5eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[10], mean:typeof(stage4Data.SD.Q5f) != "undefined"? stage4Data.SD.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q5fD) != "undefined"? stage4Data.SD.Q5fD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[11], mean:typeof(stage4Data.SD.Q7a) != "undefined"? stage4Data.SD.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q7aD) != "undefined"? stage4Data.SD.Q7aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[12], mean:typeof(stage4Data.SD.Q8a) != "undefined"? stage4Data.SD.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8aD) != "undefined"? stage4Data.SD.Q8aD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[13], mean:typeof(stage4Data.SD.Q8c) != "undefined"? stage4Data.SD.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8cD) != "undefined"? stage4Data.SD.Q8cD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[14], mean:typeof(stage4Data.SD.Q8d) != "undefined"? stage4Data.SD.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8dD) != "undefined"? stage4Data.SD.Q8dD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[15], mean:typeof(stage4Data.SD.Q8e) != "undefined"? stage4Data.SD.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8eD) != "undefined"? stage4Data.SD.Q8eD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[16], mean:typeof(stage4Data.SD.Q8g) != "undefined"? stage4Data.SD.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8gD) != "undefined"? stage4Data.SD.Q8gD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[17], mean:typeof(stage4Data.SD.Q8i) != "undefined"? stage4Data.SD.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8iD) != "undefined"? stage4Data.SD.Q8iD.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[18], mean:typeof(stage4Data.SD.Q9) != "undefined"? stage4Data.SD.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q9D) != "undefined"? stage4Data.SD.Q9D.toFixed(numberOfDecimalPlaces): "NA"},
								{variable:statsName[19], mean:typeof(stage4Data.SD.Q11) != "undefined"? stage4Data.SD.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q11D) != "undefined"? stage4Data.SD.Q11D.toFixed(numberOfDecimalPlaces): "NA"},
								];
	}

	if(typeof(weight1Stage4) =="number"){
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[0]});
		graph.links.push({ "source": source[3],
		         "target": target[0],
		         "value": +weight1Stage4});
	}
	else{
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[0]});
		graph.links.push({ "source": source[3],
		         "target": target[0],
		         "value": +weightDef});
	}
	
	if(typeof(weight2Stage4) =="number"){
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[1]});
		graph.links.push({ "source": source[3],
		         "target": target[1],
		         "value": +weight2Stage4});
	}
	else{
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[1]});
		graph.links.push({ "source": source[3],
		         "target": target[1],
		         "value": +weightDef});
	}
	
	if(typeof(weight3Stage4) =="number"){
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[2]});
		graph.links.push({ "source": source[3],
		         "target": target[2],
		         "value": +weight3Stage4});
	}
	else{
		graph.nodes.push({ "name": source[3]});
		graph.nodes.push({ "name": target[2]});
		graph.links.push({ "source": source[3],
		         "target": target[2],
		         "value": +weightDef});
	}
	
	return [stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsApply, stage3StatsDNA, stage4StatsAccept, stage4StatsDeny, stage4StatsSD]
}

function updateDataWithTransition(data){

	graph.nodes = []
	graph.links = []
	//filter data for stage 1
	//[stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsAccept, stage3StatsDNA, stage3StatsDeny, stage3StatsSD]
	 groupStats= createNodeData(graph, data);
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
		.style("stroke-opacity", function(d, i){ return 0.7; })
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
				return 0.7; })
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
		.attr("x", 42)
		.attr("y", function(d) {
		return d.dy / 2;
		})
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.attr("transform", null)
		.text(function(d) {
			if (d.value >=1){
			return nodeText(d);}
			})
		.filter(function(d) {
		return d.x < width / 2;
		});

	//render a table
	renderTable()
}


function renderData(data){

//Q5b	Q5d	Q5e	Q5f	Q5g	Q7a	Q8a	Q8c	Q8d	Q8e	Q8g	Q8i	Q9	Q10	Q11	Q12	GPA	admRecCalc	acadSubCalc	pqaSubCalc	stdmath	stdverbal	stdcomb	appscores	cse142firstclass	cse142grade	cse143firstclass	cse143grade


	graph = {"nodes" : [], "links" : []};
	//[stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsAccept, stage3StatsDNA, stage3StatsDeny, stage3StatsSD];
	groupStats = createNodeData(graph, data);
   
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
		.style("stroke-opacity", function(d, i){ return 0.7; })
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
	  .attr("x", 42)
	  .attr("y", function(d) { return d.dy / 2; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", "start")
	  .attr("transform", null)
	  .text(function(d) { 
			if (d.value >=1){ return nodeText(d); }
			})
	.filter(function(d) { return d.x < width / 2; });
   
	//render data on a table
	renderTable()
}

//function to render the data on table
function renderTable(){
	var selectListVal = document.getElementById('stage').selectedOptions[0].value
	var t = d3.table();
	//render the data in table
	//[stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsApply, stage3StatsDNA, stage4StatsAccept, stage4StatsDeny, stage4StatsSD]
	var dataStat = groupStats[0];
	if(selectListVal == "stage1"){
		dataStat = groupStats[0];
	}
	else if(selectListVal == "stage2"){
		dataStat = groupStats[1];
	}
	else if(selectListVal == "stage3"){
		dataStat = groupStats[2];
	}
	else if(selectListVal == "stage4"){
		dataStat = groupStats[3];
	}
	else if(selectListVal == "stage5"){
		dataStat = groupStats[4];
	}
	else if(selectListVal == "stage6"){
		dataStat = groupStats[5];
	}
	else if(selectListVal == "stage7"){
		dataStat = groupStats[6];
	}
	else if(selectListVal == "stage8"){
		dataStat = groupStats[7];
	}
	else{
		dataStat = groupStats[0];
	}
	
	if((dataStat.length) == 0){
		dataStat = [{Row: "No record Found"}]
	}
	
	
	d3.select("body")
    	.datum(dataStat) /// filter on lines
    	.call(t)
}
