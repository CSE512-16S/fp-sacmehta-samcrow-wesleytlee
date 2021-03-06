var weightDef = 0.01;
var transitionDuration = 1000;
var defMinValue = 10000;
		 
/*var statsName = ["GPA", "Grade (CSE 142)", "Grade (CSE 143)", "Application Score", "Std Math", "Std Verbal", "Std Comb", "CSE 142 is required", 
			"Interested in programming?", "Is friend recommended 142?", "Is academic advisor recommended 142?", "Interested in CSE Major?", 
		 "Hard to be accepted in CSE Major?", "Are students competitive?", "Is CSE more than programming?", "Leads to high salary jobs?", "Spend all time at computer", "CSE Less Social", 
		 "Num. Programming Courses Prev. Taken", "Self Programming Experience", "CSE 142 (first class)", "CSE 143 (first class)"];*/
var statsName = ["Overall GPA", "Grade in CSE 142", "Grade in CSE 143", "Application Score",  "# of Attempts of CSE 142", "# of Attempts of CSE 143",
      "# of Applications", "Class when First Taking CSE 142", "Class when First Taking CSE 143", "SAT Math Score", "SAT Verbal Score", 
      "Total SAT Score", "CSE 142 is a Requirement", "Interested in Programming?", "A Friend Recommended 142?", 
      "An Academic Advsr Recommended 142?", "Interested in the Major?", "CSE has a Low Acceptance Rate", "Students are Competitive", 
      "CSE is More than Just Programming?", "Leads to High Salary Jobs?", "Students Spend All Time at a Computer", "Students are Less Social", 
      "# of Prog. Courses Prev. Taken", "Prev. Self Prog. Experience"];
     
var groupStats = []
var groupStatsNew = []
var groupStatData = []
var groupStatDataNew = []
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
						
						"attempts142": d3.mean(v, function(d) { d.cse142 = parseFloat(d.cse142); if(typeof(d.cse142) == "number"){ return d.cse142; } }),
						"attempts143": d3.mean(v, function(d) { d.cse143 = parseFloat(d.cse143); if(typeof(d.cse143) == "number"){ return d.cse143; } }),
						"attemptsapps": d3.mean(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(typeof(d.numAdmApplication) == "number"){ return d.numAdmApplication; }}),				            
            
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
						"cse143gradeD": d3.deviation(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }}),
						
            "attempts142D": d3.deviation(v, function(d) { d.cse142 = parseFloat(d.cse142); if(typeof(d.cse142) == "number"){ return d.cse142; } }),
						"attempts143D": d3.deviation(v, function(d) { d.cse143 = parseFloat(d.cse143); if(typeof(d.cse143) == "number"){ return d.cse143; } }),
						"attemptsappsD": d3.deviation(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(typeof(d.numAdmApplication) == "number"){ return d.numAdmApplication; }}),				            

            //Number of observations for different statistics						
            "gpaNum":d3.sum(v, function(d) { d.GPA = parseFloat(d.GPA); if(!isNaN(d.GPA)){ return 1; } }), 
						"Q5bNum": d3.sum(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(!isNaN(d.Q5b)){ return 1; } }), 
						"Q5dNum": d3.sum(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(!isNaN(d.Q5d)){ return 1; } }),
						"Q5eNum": d3.sum(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(!isNaN(d.Q5e)){ return 1; } }),
						"Q5fNum": d3.sum(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(!isNaN(d.Q5f)){ return 1; } }),
						
						"Q7aNum": d3.sum(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(!isNaN(d.Q7a)){ return 1; } }),
						"Q8aNum": d3.sum(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(!isNaN(d.Q8a)){ return 1; } }),
						"Q8cNum": d3.sum(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(!isNaN(d.Q8c)){ return 1; } }),
						"Q8dNum": d3.sum(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(!isNaN(d.Q8d)){ return 1; } }),
						"Q8eNum": d3.sum(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(!isNaN(d.Q8e)){ return 1; } }),
						"Q8gNum": d3.sum(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(!isNaN(d.Q8g)){ return 1; } }),
						"Q8iNum": d3.sum(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(!isNaN(d.Q8i)){ return 1; } }),
						"Q9Num": d3.sum(v, function(d) { d.Q9 = parseFloat(d.Q9); if(!isNaN(d.Q9)){ return 1; } }),
						"Q11Num": d3.sum(v, function(d) { d.Q11 = parseFloat(d.Q11); if(!isNaN(d.Q11)){ return 1; } }),
						
						"stdmathNum": d3.sum(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(!isNaN(d.stdmath)){ return 1; } }),
						"stdverbalNum": d3.sum(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(!isNaN(d.stdverbal)){ return 1; } }),
						"stdcombNum": d3.sum(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(!isNaN(d.stdcomb)){ return 1; } }),
						"appscoresNum": d3.sum(v, function(d) { d.appscores = parseFloat(d.appscores); if(!isNaN(d.appscores)){ return 1; } }),
						"cse142firstclassNum": d3.sum(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(!isNaN(d.cse142firstclass)){ return 1; } }),
						"cse142gradeNum": d3.sum(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(!isNaN(d.cse142grade)){ return 1; } }),
						"cse143firstclassNum": d3.sum(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(!isNaN(d.cse143firstclass)){ return 1; } }),
						"cse143gradeNum": d3.sum(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(!isNaN(d.cse143grade)){ return 1; }}),			
             
            "attempts142Num": d3.sum(v, function(d) { d.cse142 = parseFloat(d.cse142); if(!isNaN(d.cse142)){ return 1; } }),
						"attempts143Num": d3.sum(v, function(d) { d.cse143 = parseFloat(d.cse143); if(!isNaN(d.cse143)){ return 1; } }),
						"attemptsappsNum": d3.sum(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(!isNaN(d.numAdmApplication)){ return 1; }})			            
            }
					})
		      .map(data);
	//stage 1 data
	var dataStage1Var = groupedStage1.student.CSE142;
	var weightStage1 = weightDef;
	if(typeof(dataStage1Var) != "undefined"){
		weightStage1 = dataStage1Var.weight;
	}
      
	var stage1Stats = [{variable:statsName[0], mean:typeof(dataStage1Var.gpa) != "undefined"? dataStage1Var.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.gpaD) != "undefined"? dataStage1Var.gpaD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.gpaNum},
								{variable:statsName[1], mean:typeof(dataStage1Var.cse142grade) != "undefined"? dataStage1Var.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.cse142gradeD) != "undefined"? dataStage1Var.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.cse142gradeNum},
								{variable:statsName[2], mean:typeof(dataStage1Var.cse143grade) != "undefined"? dataStage1Var.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.cse143gradeD) != "undefined"? dataStage1Var.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.cse143gradeNum},
								{variable:statsName[3], mean:typeof(dataStage1Var.appscores) != "undefined"? dataStage1Var.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.appscoresD) != "undefined"? dataStage1Var.appscoresD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.appscoresNum},
								{variable:statsName[4], mean:typeof(dataStage1Var.attempts142) != "undefined"? dataStage1Var.attempts142.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.attempts142D) != "undefined"? dataStage1Var.attempts142D.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.attempts142Num},
								{variable:statsName[5], mean:typeof(dataStage1Var.attempts143) != "undefined"? dataStage1Var.attempts143.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.attempts143D) != "undefined"? dataStage1Var.attempts143D.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.attempts143Num},
								{variable:statsName[6], mean:typeof(dataStage1Var.attemptsapps) != "undefined"? dataStage1Var.attemptsapps.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.attemptsappsD) != "undefined"? dataStage1Var.attemptsappsD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.attemptsappsNum},
								{variable:statsName[7], mean:typeof(dataStage1Var.cse142firstclass) != "undefined"? dataStage1Var.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.cse142firstclassD) != "undefined"? dataStage1Var.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.cse142firstclassNum},
								{variable:statsName[8], mean:typeof(dataStage1Var.cse143firstclass) != "undefined"? dataStage1Var.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.cse143firstclassD) != "undefined"? dataStage1Var.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.cse143firstclassNum},
								{variable:statsName[9], mean:typeof(dataStage1Var.stdmath) != "undefined"? dataStage1Var.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.stdmathD) != "undefined"? dataStage1Var.stdmathD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.stdmathNum},
								{variable:statsName[10], mean:typeof(dataStage1Var.stdverbal) != "undefined"? dataStage1Var.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.stdverbalD) != "undefined"? dataStage1Var.stdverbalD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.stdverbalNum},
								{variable:statsName[11], mean:typeof(dataStage1Var.stdcomb) != "undefined"? dataStage1Var.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.stdcombD) != "undefined"? dataStage1Var.stdcombD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.stdcombNum},
								{variable:statsName[12], mean:typeof(dataStage1Var.Q5b) != "undefined"? dataStage1Var.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q5bD) != "undefined"? dataStage1Var.Q5bD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q5bNum},
								{variable:statsName[13], mean:typeof(dataStage1Var.Q5d) != "undefined"? dataStage1Var.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q5dD) != "undefined"? dataStage1Var.Q5dD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q5dNum},
								{variable:statsName[14], mean:typeof(dataStage1Var.Q5e) != "undefined"? dataStage1Var.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q5eD) != "undefined"? dataStage1Var.Q5eD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q5eNum},
								{variable:statsName[15], mean:typeof(dataStage1Var.Q5f) != "undefined"? dataStage1Var.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q5fD) != "undefined"? dataStage1Var.Q5fD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q5fNum},
								{variable:statsName[16], mean:typeof(dataStage1Var.Q7a) != "undefined"? dataStage1Var.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q7aD) != "undefined"? dataStage1Var.Q7aD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q7aNum},
								{variable:statsName[17], mean:typeof(dataStage1Var.Q8a) != "undefined"? dataStage1Var.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8aD) != "undefined"? dataStage1Var.Q8aD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q8aNum},
								{variable:statsName[18], mean:typeof(dataStage1Var.Q8c) != "undefined"? dataStage1Var.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8cD) != "undefined"? dataStage1Var.Q8cD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q8cNum},
								{variable:statsName[19], mean:typeof(dataStage1Var.Q8d) != "undefined"? dataStage1Var.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8dD) != "undefined"? dataStage1Var.Q8dD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q8dNum},
								{variable:statsName[20], mean:typeof(dataStage1Var.Q8e) != "undefined"? dataStage1Var.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8eD) != "undefined"? dataStage1Var.Q8eD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q8eNum},
								{variable:statsName[21], mean:typeof(dataStage1Var.Q8g) != "undefined"? dataStage1Var.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8gD) != "undefined"? dataStage1Var.Q8gD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q8gNum},
								{variable:statsName[22], mean:typeof(dataStage1Var.Q8i) != "undefined"? dataStage1Var.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q8iD) != "undefined"? dataStage1Var.Q8iD.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q8iNum},
								{variable:statsName[23], mean:typeof(dataStage1Var.Q9) != "undefined"? dataStage1Var.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q9D) != "undefined"? dataStage1Var.Q9D.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q9Num},
								{variable:statsName[24], mean:typeof(dataStage1Var.Q11) != "undefined"? dataStage1Var.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(dataStage1Var.Q11D) != "undefined"? dataStage1Var.Q11D.toFixed(numberOfDecimalPlaces): "NA", num:dataStage1Var.Q11Num},
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
						
            "attempts142": d3.mean(v, function(d) { d.cse142 = parseFloat(d.cse142); if(typeof(d.cse142) == "number"){ return d.cse142; } }),
						"attempts143": d3.mean(v, function(d) { d.cse143 = parseFloat(d.cse143); if(typeof(d.cse143) == "number"){ return d.cse143; } }),
						"attemptsapps": d3.mean(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(typeof(d.numAdmApplication) == "number"){ return d.numAdmApplication; }}),				            
            
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
						"cse143gradeD": d3.deviation(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }}),
                        
            "attempts142D": d3.deviation(v, function(d) { d.cse142 = parseFloat(d.cse142); if(typeof(d.cse142) == "number"){ return d.cse142; } }),
						"attempts143D": d3.deviation(v, function(d) { d.cse143 = parseFloat(d.cse143); if(typeof(d.cse143) == "number"){ return d.cse143; } }),
						"attemptsappsD": d3.deviation(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(typeof(d.numAdmApplication) == "number"){ return d.numAdmApplication; }}),				            

            //Number of observations for different statistics						
            "gpaNum":d3.sum(v, function(d) { d.GPA = parseFloat(d.GPA); if(!isNaN(d.GPA)){ return 1; } }), 
						"Q5bNum": d3.sum(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(!isNaN(d.Q5b)){ return 1; } }), 
						"Q5dNum": d3.sum(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(!isNaN(d.Q5d)){ return 1; } }),
						"Q5eNum": d3.sum(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(!isNaN(d.Q5e)){ return 1; } }),
						"Q5fNum": d3.sum(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(!isNaN(d.Q5f)){ return 1; } }),
						
						"Q7aNum": d3.sum(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(!isNaN(d.Q7a)){ return 1; } }),
						"Q8aNum": d3.sum(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(!isNaN(d.Q8a)){ return 1; } }),
						"Q8cNum": d3.sum(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(!isNaN(d.Q8c)){ return 1; } }),
						"Q8dNum": d3.sum(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(!isNaN(d.Q8d)){ return 1; } }),
						"Q8eNum": d3.sum(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(!isNaN(d.Q8e)){ return 1; } }),
						"Q8gNum": d3.sum(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(!isNaN(d.Q8g)){ return 1; } }),
						"Q8iNum": d3.sum(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(!isNaN(d.Q8i)){ return 1; } }),
						"Q9Num": d3.sum(v, function(d) { d.Q9 = parseFloat(d.Q9); if(!isNaN(d.Q9)){ return 1; } }),
						"Q11Num": d3.sum(v, function(d) { d.Q11 = parseFloat(d.Q11); if(!isNaN(d.Q11)){ return 1; } }),
						
						"stdmathNum": d3.sum(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(!isNaN(d.stdmath)){ return 1; } }),
						"stdverbalNum": d3.sum(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(!isNaN(d.stdverbal)){ return 1; } }),
						"stdcombNum": d3.sum(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(!isNaN(d.stdcomb)){ return 1; } }),
						"appscoresNum": d3.sum(v, function(d) { d.appscores = parseFloat(d.appscores); if(!isNaN(d.appscores)){ return 1; } }),
						"cse142firstclassNum": d3.sum(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(!isNaN(d.cse142firstclass)){ return 1; } }),
						"cse142gradeNum": d3.sum(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(!isNaN(d.cse142grade)){ return 1; } }),
						"cse143firstclassNum": d3.sum(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(!isNaN(d.cse143firstclass)){ return 1; } }),
						"cse143gradeNum": d3.sum(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(!isNaN(d.cse143grade)){ return 1; }}),
              
            "attempts142Num": d3.sum(v, function(d) { d.cse142 = parseFloat(d.cse142); if(!isNaN(d.cse142)){ return 1; } }),
						"attempts143Num": d3.sum(v, function(d) { d.cse143 = parseFloat(d.cse143); if(!isNaN(d.cse143)){ return 1; } }),
						"attemptsappsNum": d3.sum(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(!isNaN(d.numAdmApplication)){ return 1; }})				            
						}
					})
		      .map(data);

	var stage2StatsCS143 = [];
	var stage2StatsNA143 = [];
	var stage2Data = [];
	
	if(typeof(groupedStage2) != "undefined"){
		if(typeof(groupedStage2.student.CSE142) != "undefined"){
		stage2Data = groupedStage2.student.CSE142;


		var weight1Stage2 = weightDef;
		if(typeof(stage2Data.CSE143) != "undefined"){
			weight1Stage2 = stage2Data.CSE143.weight;
		stage2StatsCS143 = [{variable:statsName[0], mean:typeof(stage2Data.CSE143.gpa) != "undefined"? stage2Data.CSE143.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.gpaD) != "undefined"? stage2Data.CSE143.gpaD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.gpaNum},
									{variable:statsName[1], mean:typeof(stage2Data.CSE143.cse142grade) != "undefined"? stage2Data.CSE143.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.cse142gradeD) != "undefined"? stage2Data.CSE143.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.cse142gradeNum},
									{variable:statsName[2], mean:typeof(stage2Data.CSE143.cse143grade) != "undefined"? stage2Data.CSE143.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.cse143gradeD) != "undefined"? stage2Data.CSE143.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.cse143gradeNum},
									{variable:statsName[3], mean:typeof(stage2Data.CSE143.appscores) != "undefined"? stage2Data.CSE143.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.appscoresD) != "undefined"? stage2Data.CSE143.appscoresD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.appscoresNum},
                  {variable:statsName[4], mean:typeof(stage2Data.CSE143.attempts142) != "undefined"? stage2Data.CSE143.attempts142.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.attempts142D) != "undefined"? stage2Data.CSE143.attempts142D.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.attempts142Num},
                  {variable:statsName[5], mean:typeof(stage2Data.CSE143.attempts143) != "undefined"? stage2Data.CSE143.attempts143.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.attempts143D) != "undefined"? stage2Data.CSE143.attempts143D.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.attempts143Num},
                  {variable:statsName[6], mean:typeof(stage2Data.CSE143.attemptsapps) != "undefined"? stage2Data.CSE143.attemptsapps.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.attemptsappsD) != "undefined"? stage2Data.CSE143.attemptsappsD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.attemptsappsNum},
									{variable:statsName[7], mean:typeof(stage2Data.CSE143.cse142firstclass) != "undefined"? stage2Data.CSE143.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.cse142firstclassD) != "undefined"? stage2Data.CSE143.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.cse142firstclassNum},
									{variable:statsName[8], mean:typeof(stage2Data.CSE143.cse143firstclass) != "undefined"? stage2Data.CSE143.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.cse143firstclassD) != "undefined"? stage2Data.CSE143.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.cse143firstclassNum},
									{variable:statsName[9], mean:typeof(stage2Data.CSE143.stdmath) != "undefined"? stage2Data.CSE143.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.stdmathD) != "undefined"? stage2Data.CSE143.stdmathD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.stdmathNum},
									{variable:statsName[10], mean:typeof(stage2Data.CSE143.stdverbal) != "undefined"? stage2Data.CSE143.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.stdverbalD) != "undefined"? stage2Data.CSE143.stdverbalD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.stdverbalNum},
									{variable:statsName[11], mean:typeof(stage2Data.CSE143.stdcomb) != "undefined"? stage2Data.CSE143.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.stdcombD) != "undefined"? stage2Data.CSE143.stdcombD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.stdcombNum},
									{variable:statsName[12], mean:typeof(stage2Data.CSE143.Q5b) != "undefined"? stage2Data.CSE143.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q5bD) != "undefined"? stage2Data.CSE143.Q5bD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q5bNum},
									{variable:statsName[13], mean:typeof(stage2Data.CSE143.Q5d) != "undefined"? stage2Data.CSE143.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q5dD) != "undefined"? stage2Data.CSE143.Q5dD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q5dNum},
									{variable:statsName[14], mean:typeof(stage2Data.CSE143.Q5e) != "undefined"? stage2Data.CSE143.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q5eD) != "undefined"? stage2Data.CSE143.Q5eD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q5eNum},
									{variable:statsName[15], mean:typeof(stage2Data.CSE143.Q5f) != "undefined"? stage2Data.CSE143.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q5fD) != "undefined"? stage2Data.CSE143.Q5fD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q5fNum},
									{variable:statsName[16], mean:typeof(stage2Data.CSE143.Q7a) != "undefined"? stage2Data.CSE143.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q7aD) != "undefined"? stage2Data.CSE143.Q7aD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q7aNum},
									{variable:statsName[17], mean:typeof(stage2Data.CSE143.Q8a) != "undefined"? stage2Data.CSE143.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8aD) != "undefined"? stage2Data.CSE143.Q8aD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q8aNum},
									{variable:statsName[18], mean:typeof(stage2Data.CSE143.Q8c) != "undefined"? stage2Data.CSE143.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8cD) != "undefined"? stage2Data.CSE143.Q8cD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q8cNum},
									{variable:statsName[19], mean:typeof(stage2Data.CSE143.Q8d) != "undefined"? stage2Data.CSE143.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8dD) != "undefined"? stage2Data.CSE143.Q8dD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q8dNum},
									{variable:statsName[20], mean:typeof(stage2Data.CSE143.Q8e) != "undefined"? stage2Data.CSE143.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8eD) != "undefined"? stage2Data.CSE143.Q8eD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q8eNum},
									{variable:statsName[21], mean:typeof(stage2Data.CSE143.Q8g) != "undefined"? stage2Data.CSE143.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8gD) != "undefined"? stage2Data.CSE143.Q8gD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q8gNum},
									{variable:statsName[22], mean:typeof(stage2Data.CSE143.Q8i) != "undefined"? stage2Data.CSE143.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q8iD) != "undefined"? stage2Data.CSE143.Q8iD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q8iNum},
									{variable:statsName[23], mean:typeof(stage2Data.CSE143.Q9) != "undefined"? stage2Data.CSE143.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q9D) != "undefined"? stage2Data.CSE143.Q9D.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q9Num},
									{variable:statsName[24], mean:typeof(stage2Data.CSE143.Q11) != "undefined"? stage2Data.CSE143.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.CSE143.Q11D) != "undefined"? stage2Data.CSE143.Q11D.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.CSE143.Q11Num},
									];
		}
		var weight2Stage2 = weightDef;
		if(typeof(stage2Data.NA143) != "undefined"){
			weight2Stage2 = stage2Data.NA143.weight;
			
		stage2StatsNA143 = [{variable:statsName[0], mean:typeof(stage2Data.NA143.gpa) != "undefined"? stage2Data.NA143.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.gpaD) != "undefined"? stage2Data.NA143.gpaD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.gpaNum},
									{variable:statsName[1], mean:typeof(stage2Data.NA143.cse142grade) != "undefined"? stage2Data.NA143.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.cse142gradeD) != "undefined"? stage2Data.NA143.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.cse142gradeNum},
									{variable:statsName[2], mean:typeof(stage2Data.NA143.cse143grade) != "undefined"? stage2Data.NA143.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.cse143gradeD) != "undefined"? stage2Data.NA143.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.cse143gradeNum},
									{variable:statsName[3], mean:typeof(stage2Data.NA143.appscores) != "undefined"? stage2Data.NA143.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.appscoresD) != "undefined"? stage2Data.NA143.appscoresD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.appscoresNum},
                  {variable:statsName[4], mean:typeof(stage2Data.NA143.attempts142) != "undefined"? stage2Data.NA143.attempts142.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.attempts142D) != "undefined"? stage2Data.NA143.attempts142D.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.attempts142Num},
                  {variable:statsName[5], mean:typeof(stage2Data.NA143.attempts143) != "undefined"? stage2Data.NA143.attempts143.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.attempts143D) != "undefined"? stage2Data.NA143.attempts143D.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.attempts143Num},
                  {variable:statsName[6], mean:typeof(stage2Data.NA143.attemptsapps) != "undefined"? stage2Data.NA143.attemptsapps.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.attemptsappsD) != "undefined"? stage2Data.NA143.attemptsappsD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.attemptsappsNum},
									{variable:statsName[7], mean:typeof(stage2Data.NA143.cse142firstclass) != "undefined"? stage2Data.NA143.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.cse142firstclassD) != "undefined"? stage2Data.NA143.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.cse142firstclassNum},
									{variable:statsName[8], mean:typeof(stage2Data.NA143.cse143firstclass) != "undefined"? stage2Data.NA143.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.cse143firstclassD) != "undefined"? stage2Data.NA143.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.cse143firstclassNum},
									{variable:statsName[9], mean:typeof(stage2Data.NA143.stdmath) != "undefined"? stage2Data.NA143.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.stdmathD) != "undefined"? stage2Data.NA143.stdmathD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.stdmathNum},
									{variable:statsName[10], mean:typeof(stage2Data.NA143.stdverbal) != "undefined"? stage2Data.NA143.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.stdverbalD) != "undefined"? stage2Data.NA143.stdverbalD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.stdverbalNum},
									{variable:statsName[11], mean:typeof(stage2Data.NA143.stdcomb) != "undefined"? stage2Data.NA143.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.stdcombD) != "undefined"? stage2Data.NA143.stdcombD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.stdcombNum},
									{variable:statsName[12], mean:typeof(stage2Data.NA143.Q5b) != "undefined"? stage2Data.NA143.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q5bD) != "undefined"? stage2Data.NA143.Q5bD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q5bNum},
									{variable:statsName[13], mean:typeof(stage2Data.NA143.Q5d) != "undefined"? stage2Data.NA143.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q5dD) != "undefined"? stage2Data.NA143.Q5dD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q5dNum},
									{variable:statsName[14], mean:typeof(stage2Data.NA143.Q5e) != "undefined"? stage2Data.NA143.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q5eD) != "undefined"? stage2Data.NA143.Q5eD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q5eNum},
									{variable:statsName[15], mean:typeof(stage2Data.NA143.Q5f) != "undefined"? stage2Data.NA143.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q5fD) != "undefined"? stage2Data.NA143.Q5fD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q5fNum},
									{variable:statsName[16], mean:typeof(stage2Data.NA143.Q7a) != "undefined"? stage2Data.NA143.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q7aD) != "undefined"? stage2Data.NA143.Q7aD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q7aNum},
									{variable:statsName[17], mean:typeof(stage2Data.NA143.Q8a) != "undefined"? stage2Data.NA143.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8aD) != "undefined"? stage2Data.NA143.Q8aD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q8aNum},
									{variable:statsName[18], mean:typeof(stage2Data.NA143.Q8c) != "undefined"? stage2Data.NA143.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8cD) != "undefined"? stage2Data.NA143.Q8cD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q8cNum},
									{variable:statsName[19], mean:typeof(stage2Data.NA143.Q8d) != "undefined"? stage2Data.NA143.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8dD) != "undefined"? stage2Data.NA143.Q8dD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q8dNum},
									{variable:statsName[20], mean:typeof(stage2Data.NA143.Q8e) != "undefined"? stage2Data.NA143.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8eD) != "undefined"? stage2Data.NA143.Q8eD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q8eNum},
									{variable:statsName[21], mean:typeof(stage2Data.NA143.Q8g) != "undefined"? stage2Data.NA143.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8gD) != "undefined"? stage2Data.NA143.Q8gD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q8gNum},
									{variable:statsName[22], mean:typeof(stage2Data.NA143.Q8i) != "undefined"? stage2Data.NA143.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q8iD) != "undefined"? stage2Data.NA143.Q8iD.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q8iNum},
									{variable:statsName[23], mean:typeof(stage2Data.NA143.Q9) != "undefined"? stage2Data.NA143.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q9D) != "undefined"? stage2Data.NA143.Q9D.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q9Num},
									{variable:statsName[24], mean:typeof(stage2Data.NA143.Q11) != "undefined"? stage2Data.NA143.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage2Data.NA143.Q11D) != "undefined"? stage2Data.NA143.Q11D.toFixed(numberOfDecimalPlaces): "NA", num:stage2Data.NA143.Q11Num},
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

              "attempts142": d3.mean(v, function(d) { d.cse142 = parseFloat(d.cse142); if(typeof(d.cse142) == "number"){ return d.cse142; } }),
              "attempts143": d3.mean(v, function(d) { d.cse143 = parseFloat(d.cse143); if(typeof(d.cse143) == "number"){ return d.cse143; } }),
              "attemptsapps": d3.mean(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(typeof(d.numAdmApplication) == "number"){ return d.numAdmApplication; }}),				            

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
							"cse143gradeD": d3.deviation(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }}),

              "attempts142D": d3.deviation(v, function(d) { d.cse142 = parseFloat(d.cse142); if(typeof(d.cse142) == "number"){ return d.cse142; } }),
              "attempts143D": d3.deviation(v, function(d) { d.cse143 = parseFloat(d.cse143); if(typeof(d.cse143) == "number"){ return d.cse143; } }),
              "attemptsappsD": d3.deviation(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(typeof(d.numAdmApplication) == "number"){ return d.numAdmApplication; }}),				            
              
              //Number of observations for different statistics						
              "gpaNum":d3.sum(v, function(d) { d.GPA = parseFloat(d.GPA); if(!isNaN(d.GPA)){ return 1; } }), 
							"Q5bNum": d3.sum(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(!isNaN(d.Q5b)){ return 1; } }), 
							"Q5dNum": d3.sum(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(!isNaN(d.Q5d)){ return 1; } }),
							"Q5eNum": d3.sum(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(!isNaN(d.Q5e)){ return 1; } }),
							"Q5fNum": d3.sum(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(!isNaN(d.Q5f)){ return 1; } }),
							
							"Q7aNum": d3.sum(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(!isNaN(d.Q7a)){ return 1; } }),
							"Q8aNum": d3.sum(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(!isNaN(d.Q8a)){ return 1; } }),
							"Q8cNum": d3.sum(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(!isNaN(d.Q8c)){ return 1; } }),
							"Q8dNum": d3.sum(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(!isNaN(d.Q8d)){ return 1; } }),
							"Q8eNum": d3.sum(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(!isNaN(d.Q8e)){ return 1; } }),
							"Q8gNum": d3.sum(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(!isNaN(d.Q8g)){ return 1; } }),
							"Q8iNum": d3.sum(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(!isNaN(d.Q8i)){ return 1; } }),
							"Q9Num": d3.sum(v, function(d) { d.Q9 = parseFloat(d.Q9); if(!isNaN(d.Q9)){ return 1; } }),
							"Q11Num": d3.sum(v, function(d) { d.Q11 = parseFloat(d.Q11); if(!isNaN(d.Q11)){ return 1; } }),
							
							"stdmathNum": d3.sum(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(!isNaN(d.stdmath)){ return 1; } }),
							"stdverbalNum": d3.sum(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(!isNaN(d.stdverbal)){ return 1; } }),
							"stdcombNum": d3.sum(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(!isNaN(d.stdcomb)){ return 1; } }),
							"appscoresNum": d3.sum(v, function(d) { d.appscores = parseFloat(d.appscores); if(!isNaN(d.appscores)){ return 1; } }),
							"cse142firstclassNum": d3.sum(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(!isNaN(d.cse142firstclass)){ return 1; } }),
							"cse142gradeNum": d3.sum(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(!isNaN(d.cse142grade)){ return 1; } }),
							"cse143firstclassNum": d3.sum(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(!isNaN(d.cse143firstclass)){ return 1; } }),
							"cse143gradeNum": d3.sum(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(!isNaN(d.cse143grade)){ return 1; }}),
                
              "attempts142Num": d3.sum(v, function(d) { d.cse142 = parseFloat(d.cse142); if(!isNaN(d.cse142)){ return 1; } }),
              "attempts143Num": d3.sum(v, function(d) { d.cse143 = parseFloat(d.cse143); if(!isNaN(d.cse143)){ return 1; } }),
              "attemptsappsNum": d3.sum(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(!isNaN(d.numAdmApplication)){ return 1; }})			           
							}
						})
				  .map(data);
	}	      
	}      
	//stage 3
	
	var stage3StatsApply = [];
	var stage3StatsDNA = [];
	var stage3Data = [];
	if(typeof(groupedStage3) != "undefined"){
		if(typeof(groupedStage3.student.CSE142.CSE143) != "undefined"){
		stage3Data = groupedStage3.student.CSE142.CSE143;
		
		
		var weight1Stage3 = weightDef;
		if(typeof(stage3Data.Apply) != "undefined"){
			weight1Stage3 = stage3Data.Apply.weight;
		stage3StatsApply = [{variable:statsName[0], mean:typeof(stage3Data.Apply.gpa) != "undefined"? stage3Data.Apply.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.gpaD) != "undefined"? stage3Data.Apply.gpaD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.gpaNum},
									{variable:statsName[1], mean:typeof(stage3Data.Apply.cse142grade) != "undefined"? stage3Data.Apply.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.cse142gradeD) != "undefined"? stage3Data.Apply.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.cse142gradeNum},
									{variable:statsName[2], mean:typeof(stage3Data.Apply.cse143grade) != "undefined"? stage3Data.Apply.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.cse143gradeD) != "undefined"? stage3Data.Apply.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.cse143gradeNum},
									{variable:statsName[3], mean:typeof(stage3Data.Apply.appscores) != "undefined"? stage3Data.Apply.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.appscoresD) != "undefined"? stage3Data.Apply.appscoresD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.appscoresNum},
                  {variable:statsName[4], mean:typeof(stage3Data.Apply.attempts142) != "undefined"? stage3Data.Apply.attempts142.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.attempts142D) != "undefined"? stage3Data.Apply.attempts142D.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.attempts142Num},
                  {variable:statsName[5], mean:typeof(stage3Data.Apply.attempts143) != "undefined"? stage3Data.Apply.attempts143.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.attempts143D) != "undefined"? stage3Data.Apply.attempts143D.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.attempts143Num},
                  {variable:statsName[6], mean:typeof(stage3Data.Apply.attemptsapps) != "undefined"? stage3Data.Apply.attemptsapps.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.attemptsappsD) != "undefined"? stage3Data.Apply.attemptsappsD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.attemptsappsNum},
									{variable:statsName[7], mean:typeof(stage3Data.Apply.cse142firstclass) != "undefined"? stage3Data.Apply.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.cse142firstclassD) != "undefined"? stage3Data.Apply.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.cse142firstclassNum},
									{variable:statsName[8], mean:typeof(stage3Data.Apply.cse143firstclass) != "undefined"? stage3Data.Apply.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.cse143firstclassD) != "undefined"? stage3Data.Apply.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.cse143firstclassNum},
									{variable:statsName[9], mean:typeof(stage3Data.Apply.stdmath) != "undefined"? stage3Data.Apply.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.stdmathD) != "undefined"? stage3Data.Apply.stdmathD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.stdmathNum},
									{variable:statsName[10], mean:typeof(stage3Data.Apply.stdverbal) != "undefined"? stage3Data.Apply.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.stdverbalD) != "undefined"? stage3Data.Apply.stdverbalD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.stdverbalNum},
									{variable:statsName[11], mean:typeof(stage3Data.Apply.stdcomb) != "undefined"? stage3Data.Apply.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.stdcombD) != "undefined"? stage3Data.Apply.stdcombD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.stdcombNum},
									{variable:statsName[12], mean:typeof(stage3Data.Apply.Q5b) != "undefined"? stage3Data.Apply.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q5bD) != "undefined"? stage3Data.Apply.Q5bD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q5bNum},
									{variable:statsName[13], mean:typeof(stage3Data.Apply.Q5d) != "undefined"? stage3Data.Apply.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q5dD) != "undefined"? stage3Data.Apply.Q5dD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q5dNum},
									{variable:statsName[14], mean:typeof(stage3Data.Apply.Q5e) != "undefined"? stage3Data.Apply.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q5eD) != "undefined"? stage3Data.Apply.Q5eD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q5eNum},
									{variable:statsName[15], mean:typeof(stage3Data.Apply.Q5f) != "undefined"? stage3Data.Apply.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q5fD) != "undefined"? stage3Data.Apply.Q5fD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q5fNum},
									{variable:statsName[16], mean:typeof(stage3Data.Apply.Q7a) != "undefined"? stage3Data.Apply.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q7aD) != "undefined"? stage3Data.Apply.Q7aD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q7aNum},
									{variable:statsName[17], mean:typeof(stage3Data.Apply.Q8a) != "undefined"? stage3Data.Apply.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8aD) != "undefined"? stage3Data.Apply.Q8aD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q8aNum},
									{variable:statsName[18], mean:typeof(stage3Data.Apply.Q8c) != "undefined"? stage3Data.Apply.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8cD) != "undefined"? stage3Data.Apply.Q8cD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q8cNum},
									{variable:statsName[19], mean:typeof(stage3Data.Apply.Q8d) != "undefined"? stage3Data.Apply.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8dD) != "undefined"? stage3Data.Apply.Q8dD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q8dNum},
									{variable:statsName[20], mean:typeof(stage3Data.Apply.Q8e) != "undefined"? stage3Data.Apply.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8eD) != "undefined"? stage3Data.Apply.Q8eD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q8eNum},
									{variable:statsName[21], mean:typeof(stage3Data.Apply.Q8g) != "undefined"? stage3Data.Apply.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8gD) != "undefined"? stage3Data.Apply.Q8gD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q8gNum},
									{variable:statsName[22], mean:typeof(stage3Data.Apply.Q8i) != "undefined"? stage3Data.Apply.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q8iD) != "undefined"? stage3Data.Apply.Q8iD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q8iNum},
									{variable:statsName[23], mean:typeof(stage3Data.Apply.Q9) != "undefined"? stage3Data.Apply.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q9D) != "undefined"? stage3Data.Apply.Q9D.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q9Num},
									{variable:statsName[24], mean:typeof(stage3Data.Apply.Q11) != "undefined"? stage3Data.Apply.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.Apply.Q11D) != "undefined"? stage3Data.Apply.Q11D.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.Apply.Q11Num},
									];
		}
		
		var weight2Stage3 = weightDef;
		if(typeof(stage3Data.DNA) != "undefined"){
			weight2Stage3 = stage3Data.DNA.weight;
		stage3StatsDNA = [{variable:statsName[0], mean:typeof(stage3Data.DNA.gpa) != "undefined"? stage3Data.DNA.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.gpaD) != "undefined"? stage3Data.DNA.gpaD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.gpaNum},
									{variable:statsName[1], mean:typeof(stage3Data.DNA.cse142grade) != "undefined"? stage3Data.DNA.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.cse142gradeD) != "undefined"? stage3Data.DNA.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.cse142gradeNum},
									{variable:statsName[2], mean:typeof(stage3Data.DNA.cse143grade) != "undefined"? stage3Data.DNA.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.cse143gradeD) != "undefined"? stage3Data.DNA.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.cse143gradeNum},
									{variable:statsName[3], mean:typeof(stage3Data.DNA.appscores) != "undefined"? stage3Data.DNA.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.appscoresD) != "undefined"? stage3Data.DNA.appscoresD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.appscoresNum},
                  {variable:statsName[4], mean:typeof(stage3Data.DNA.attempts142) != "undefined"? stage3Data.DNA.attempts142.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.attempts142D) != "undefined"? stage3Data.DNA.attempts142D.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.attempts142Num},
                  {variable:statsName[5], mean:typeof(stage3Data.DNA.attempts143) != "undefined"? stage3Data.DNA.attempts143.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.attempts143D) != "undefined"? stage3Data.DNA.attempts143D.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.attempts143Num},
                  {variable:statsName[6], mean:typeof(stage3Data.DNA.attemptsapps) != "undefined"? stage3Data.DNA.attemptsapps.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.attemptsappsD) != "undefined"? stage3Data.DNA.attemptsappsD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.attemptsappsNum},
									{variable:statsName[7], mean:typeof(stage3Data.DNA.cse142firstclass) != "undefined"? stage3Data.DNA.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.cse142firstclassD) != "undefined"? stage3Data.DNA.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.cse142firstclassNum},
									{variable:statsName[8], mean:typeof(stage3Data.DNA.cse143firstclass) != "undefined"? stage3Data.DNA.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.cse143firstclassD) != "undefined"? stage3Data.DNA.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.cse143firstclassNum},
									{variable:statsName[9], mean:typeof(stage3Data.DNA.stdmath) != "undefined"? stage3Data.DNA.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.stdmathD) != "undefined"? stage3Data.DNA.stdmathD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.stdmathNum},
									{variable:statsName[10], mean:typeof(stage3Data.DNA.stdverbal) != "undefined"? stage3Data.DNA.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.stdverbalD) != "undefined"? stage3Data.DNA.stdverbalD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.stdverbalNum},
									{variable:statsName[11], mean:typeof(stage3Data.DNA.stdcomb) != "undefined"? stage3Data.DNA.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.stdcombD) != "undefined"? stage3Data.DNA.stdcombD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.stdcombNum},
									{variable:statsName[12], mean:typeof(stage3Data.DNA.Q5b) != "undefined"? stage3Data.DNA.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q5bD) != "undefined"? stage3Data.DNA.Q5bD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q5bNum},
									{variable:statsName[13], mean:typeof(stage3Data.DNA.Q5d) != "undefined"? stage3Data.DNA.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q5dD) != "undefined"? stage3Data.DNA.Q5dD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q5dNum},
									{variable:statsName[14], mean:typeof(stage3Data.DNA.Q5e) != "undefined"? stage3Data.DNA.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q5eD) != "undefined"? stage3Data.DNA.Q5eD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q5eNum},
									{variable:statsName[15], mean:typeof(stage3Data.DNA.Q5f) != "undefined"? stage3Data.DNA.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q5fD) != "undefined"? stage3Data.DNA.Q5fD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q5fNum},
									{variable:statsName[16], mean:typeof(stage3Data.DNA.Q7a) != "undefined"? stage3Data.DNA.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q7aD) != "undefined"? stage3Data.DNA.Q7aD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q7aNum},
									{variable:statsName[17], mean:typeof(stage3Data.DNA.Q8a) != "undefined"? stage3Data.DNA.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8aD) != "undefined"? stage3Data.DNA.Q8aD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q8aNum},
									{variable:statsName[18], mean:typeof(stage3Data.DNA.Q8c) != "undefined"? stage3Data.DNA.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8cD) != "undefined"? stage3Data.DNA.Q8cD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q8cNum},
									{variable:statsName[19], mean:typeof(stage3Data.DNA.Q8d) != "undefined"? stage3Data.DNA.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8dD) != "undefined"? stage3Data.DNA.Q8dD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q8dNum},
									{variable:statsName[20], mean:typeof(stage3Data.DNA.Q8e) != "undefined"? stage3Data.DNA.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8eD) != "undefined"? stage3Data.DNA.Q8eD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q8eNum},
									{variable:statsName[21], mean:typeof(stage3Data.DNA.Q8g) != "undefined"? stage3Data.DNA.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8gD) != "undefined"? stage3Data.DNA.Q8gD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q8gNum},
									{variable:statsName[22], mean:typeof(stage3Data.DNA.Q8i) != "undefined"? stage3Data.DNA.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q8iD) != "undefined"? stage3Data.DNA.Q8iD.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q8iNum},
									{variable:statsName[23], mean:typeof(stage3Data.DNA.Q9) != "undefined"? stage3Data.DNA.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q9D) != "undefined"? stage3Data.DNA.Q9D.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q9Num},
									{variable:statsName[24], mean:typeof(stage3Data.DNA.Q11) != "undefined"? stage3Data.DNA.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage3Data.DNA.Q11D) != "undefined"? stage3Data.DNA.Q11D.toFixed(numberOfDecimalPlaces): "NA", num:stage3Data.DNA.Q11Num},
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

              "attempts142": d3.mean(v, function(d) { d.cse142 = parseFloat(d.cse142); if(typeof(d.cse142) == "number"){ return d.cse142; } }),
              "attempts143": d3.mean(v, function(d) { d.cse143 = parseFloat(d.cse143); if(typeof(d.cse143) == "number"){ return d.cse143; } }),
              "attemptsapps": d3.mean(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(typeof(d.numAdmApplication) == "number"){ return d.numAdmApplication; }}),				            

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
							"cse143gradeD": d3.deviation(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(typeof(d.cse143grade) == "number"){ return d.cse143grade; }}),
				
              "attempts142D": d3.deviation(v, function(d) { d.cse142 = parseFloat(d.cse142); if(typeof(d.cse142) == "number"){ return d.cse142; } }),
              "attempts143D": d3.deviation(v, function(d) { d.cse143 = parseFloat(d.cse143); if(typeof(d.cse143) == "number"){ return d.cse143; } }),
              "attemptsappsD": d3.deviation(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(typeof(d.numAdmApplication) == "number"){ return d.numAdmApplication; }}),				            

              //Number of observations for different statistics						
              "gpaNum":d3.sum(v, function(d) { d.GPA = parseFloat(d.GPA); if(!isNaN(d.GPA)){ return 1; } }), 
							"Q5bNum": d3.sum(v, function(d) { d.Q5b = parseFloat(d.Q5b); if(!isNaN(d.Q5b)){ return 1; } }), 
							"Q5dNum": d3.sum(v, function(d) { d.Q5d = parseFloat(d.Q5d); if(!isNaN(d.Q5d)){ return 1; } }),
							"Q5eNum": d3.sum(v, function(d) { d.Q5e = parseFloat(d.Q5e); if(!isNaN(d.Q5e)){ return 1; } }),
							"Q5fNum": d3.sum(v, function(d) { d.Q5f = parseFloat(d.Q5f); if(!isNaN(d.Q5f)){ return 1; } }),
							
							"Q7aNum": d3.sum(v, function(d) { d.Q7a = parseFloat(d.Q7a); if(!isNaN(d.Q7a)){ return 1; } }),
							"Q8aNum": d3.sum(v, function(d) { d.Q8a = parseFloat(d.Q8a); if(!isNaN(d.Q8a)){ return 1; } }),
							"Q8cNum": d3.sum(v, function(d) { d.Q8c = parseFloat(d.Q8c); if(!isNaN(d.Q8c)){ return 1; } }),
							"Q8dNum": d3.sum(v, function(d) { d.Q8d = parseFloat(d.Q8d); if(!isNaN(d.Q8d)){ return 1; } }),
							"Q8eNum": d3.sum(v, function(d) { d.Q8e = parseFloat(d.Q8e); if(!isNaN(d.Q8e)){ return 1; } }),
							"Q8gNum": d3.sum(v, function(d) { d.Q8g = parseFloat(d.Q8g); if(!isNaN(d.Q8g)){ return 1; } }),
							"Q8iNum": d3.sum(v, function(d) { d.Q8i = parseFloat(d.Q8i); if(!isNaN(d.Q8i)){ return 1; } }),
							"Q9Num": d3.sum(v, function(d) { d.Q9 = parseFloat(d.Q9); if(!isNaN(d.Q9)){ return 1; } }),
							"Q11Num": d3.sum(v, function(d) { d.Q11 = parseFloat(d.Q11); if(!isNaN(d.Q11)){ return 1; } }),
							
							"stdmathNum": d3.sum(v, function(d) { d.stdmath = parseFloat(d.stdmath); if(!isNaN(d.stdmath)){ return 1; } }),
							"stdverbalNum": d3.sum(v, function(d) { d.stdverbal = parseFloat(d.stdverbal); if(!isNaN(d.stdverbal)){ return 1; } }),
							"stdcombNum": d3.sum(v, function(d) { d.stdcomb = parseFloat(d.stdcomb); if(!isNaN(d.stdcomb)){ return 1; } }),
							"appscoresNum": d3.sum(v, function(d) { d.appscores = parseFloat(d.appscores); if(!isNaN(d.appscores)){ return 1; } }),
							"cse142firstclassNum": d3.sum(v, function(d) { d.cse142firstclass = parseFloat(d.cse142firstclass); if(!isNaN(d.cse142firstclass)){ return 1; } }),
							"cse142gradeNum": d3.sum(v, function(d) { d.cse142grade = parseFloat(d.cse142grade); if(!isNaN(d.cse142grade)){ return 1; } }),
							"cse143firstclassNum": d3.sum(v, function(d) { d.cse143firstclass = parseFloat(d.cse143firstclass); if(!isNaN(d.cse143firstclass)){ return 1; } }),
							"cse143gradeNum": d3.sum(v, function(d) { d.cse143grade = parseFloat(d.cse143grade); if(!isNaN(d.cse143grade)){ return 1; }}),
							
              "attempts142Num": d3.sum(v, function(d) { d.cse142 = parseFloat(d.cse142); if(!isNaN(d.cse142)){ return 1; } }),
              "attempts143Num": d3.sum(v, function(d) { d.cse143 = parseFloat(d.cse143); if(!isNaN(d.cse143)){ return 1; } }),
              "attemptsappsNum": d3.sum(v, function(d) { d.numAdmApplication = parseFloat(d.numAdmApplication); if(!isNaN(d.numAdmApplication)){ return 1; }})				            
              }
						})
				  .map(data);
	}
	 }    
	//stage 4 
	
	var stage4StatsAccept = [];
	var stage4StatsDeny = [];
	var stage4StatsSD = [];
	var stage4Data = [];
	if(typeof(groupedStage4) != "undefined"){
		if (typeof(groupedStage4.student.CSE142.CSE143.Apply) != "undefined"){
	
		stage4Data = groupedStage4.student.CSE142.CSE143.Apply;	 
		
		
		var weight1Stage4 = weightDef;
		if(typeof(stage4Data.Accept) != "undefined"){
			weight1Stage4 = stage4Data.Accept.weight;
		stage4StatsAccept = [{variable:statsName[0], mean:typeof(stage4Data.Accept.gpa) != "undefined"? stage4Data.Accept.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.gpaD) != "undefined"? stage4Data.Accept.gpaD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.gpaNum},
									{variable:statsName[1], mean:typeof(stage4Data.Accept.cse142grade) != "undefined"? stage4Data.Accept.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.cse142gradeD) != "undefined"? stage4Data.Accept.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.cse142gradeNum},
									{variable:statsName[2], mean:typeof(stage4Data.Accept.cse143grade) != "undefined"? stage4Data.Accept.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.cse143gradeD) != "undefined"? stage4Data.Accept.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.cse143gradeNum},
									{variable:statsName[3], mean:typeof(stage4Data.Accept.appscores) != "undefined"? stage4Data.Accept.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.appscoresD) != "undefined"? stage4Data.Accept.appscoresD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.appscoresNum},
                  {variable:statsName[4], mean:typeof(stage4Data.Accept.attempts142) != "undefined"? stage4Data.Accept.attempts142.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.attempts142D) != "undefined"? stage4Data.Accept.attempts142D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.attempts142Num},
                  {variable:statsName[5], mean:typeof(stage4Data.Accept.attempts143) != "undefined"? stage4Data.Accept.attempts143.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.attempts143D) != "undefined"? stage4Data.Accept.attempts143D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.attempts143Num},
                  {variable:statsName[6], mean:typeof(stage4Data.Accept.attemptsapps) != "undefined"? stage4Data.Accept.attemptsapps.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.attemptsappsD) != "undefined"? stage4Data.Accept.attemptsappsD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.attemptsappsNum},
									{variable:statsName[7], mean:typeof(stage4Data.Accept.cse142firstclass) != "undefined"? stage4Data.Accept.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.cse142firstclassD) != "undefined"? stage4Data.Accept.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.cse142firstclassNum},
									{variable:statsName[8], mean:typeof(stage4Data.Accept.cse143firstclass) != "undefined"? stage4Data.Accept.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.cse143firstclassD) != "undefined"? stage4Data.Accept.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.cse143firstclassNum},
									{variable:statsName[9], mean:typeof(stage4Data.Accept.stdmath) != "undefined"? stage4Data.Accept.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.stdmathD) != "undefined"? stage4Data.Accept.stdmathD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.stdmathNum},
									{variable:statsName[10], mean:typeof(stage4Data.Accept.stdverbal) != "undefined"? stage4Data.Accept.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.stdverbalD) != "undefined"? stage4Data.Accept.stdverbalD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.stdverbalNum},
									{variable:statsName[11], mean:typeof(stage4Data.Accept.stdcomb) != "undefined"? stage4Data.Accept.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.stdcombD) != "undefined"? stage4Data.Accept.stdcombD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.stdcombNum},
									{variable:statsName[12], mean:typeof(stage4Data.Accept.Q5b) != "undefined"? stage4Data.Accept.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q5bD) != "undefined"? stage4Data.Accept.Q5bD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q5bNum},
									{variable:statsName[13], mean:typeof(stage4Data.Accept.Q5d) != "undefined"? stage4Data.Accept.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q5dD) != "undefined"? stage4Data.Accept.Q5dD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q5dNum},
									{variable:statsName[14], mean:typeof(stage4Data.Accept.Q5e) != "undefined"? stage4Data.Accept.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q5eD) != "undefined"? stage4Data.Accept.Q5eD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q5eNum},
									{variable:statsName[15], mean:typeof(stage4Data.Accept.Q5f) != "undefined"? stage4Data.Accept.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q5fD) != "undefined"? stage4Data.Accept.Q5fD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q5fNum},
									{variable:statsName[16], mean:typeof(stage4Data.Accept.Q7a) != "undefined"? stage4Data.Accept.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q7aD) != "undefined"? stage4Data.Accept.Q7aD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q7aNum},
									{variable:statsName[17], mean:typeof(stage4Data.Accept.Q8a) != "undefined"? stage4Data.Accept.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8aD) != "undefined"? stage4Data.Accept.Q8aD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q8aNum},
									{variable:statsName[18], mean:typeof(stage4Data.Accept.Q8c) != "undefined"? stage4Data.Accept.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8cD) != "undefined"? stage4Data.Accept.Q8cD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q8cNum},
									{variable:statsName[19], mean:typeof(stage4Data.Accept.Q8d) != "undefined"? stage4Data.Accept.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8dD) != "undefined"? stage4Data.Accept.Q8dD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q8dNum},
									{variable:statsName[20], mean:typeof(stage4Data.Accept.Q8e) != "undefined"? stage4Data.Accept.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8eD) != "undefined"? stage4Data.Accept.Q8eD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q8eNum},
									{variable:statsName[21], mean:typeof(stage4Data.Accept.Q8g) != "undefined"? stage4Data.Accept.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8gD) != "undefined"? stage4Data.Accept.Q8gD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q8gNum},
									{variable:statsName[22], mean:typeof(stage4Data.Accept.Q8i) != "undefined"? stage4Data.Accept.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q8iD) != "undefined"? stage4Data.Accept.Q8iD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q8iNum},
									{variable:statsName[23], mean:typeof(stage4Data.Accept.Q9) != "undefined"? stage4Data.Accept.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q9D) != "undefined"? stage4Data.Accept.Q9D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q9Num},
									{variable:statsName[24], mean:typeof(stage4Data.Accept.Q11) != "undefined"? stage4Data.Accept.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Accept.Q11D) != "undefined"? stage4Data.Accept.Q11D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Accept.Q11Num},
									];
		}
		
		var weight2Stage4 = weightDef;
		if(typeof(stage4Data.Deny) != "undefined"){
			weight2Stage4 = stage4Data.Deny.weight;
		stage4StatsDeny = [{variable:statsName[0], mean:typeof(stage4Data.Deny.gpa) != "undefined"? stage4Data.Deny.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.gpaD) != "undefined"? stage4Data.Deny.gpaD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.gpaNum},
									{variable:statsName[1], mean:typeof(stage4Data.Deny.cse142grade) != "undefined"? stage4Data.Deny.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.cse142gradeD) != "undefined"? stage4Data.Deny.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.cse142gradeNum},
									{variable:statsName[2], mean:typeof(stage4Data.Deny.cse143grade) != "undefined"? stage4Data.Deny.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.cse143gradeD) != "undefined"? stage4Data.Deny.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.cse143gradeNum},
									{variable:statsName[3], mean:typeof(stage4Data.Deny.appscores) != "undefined"? stage4Data.Deny.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.appscoresD) != "undefined"? stage4Data.Deny.appscoresD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.appscoresNum},
                  {variable:statsName[4], mean:typeof(stage4Data.Deny.attempts142) != "undefined"? stage4Data.Deny.attempts142.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.attempts142D) != "undefined"? stage4Data.Deny.attempts142D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.attempts142Num},
                  {variable:statsName[5], mean:typeof(stage4Data.Deny.attempts143) != "undefined"? stage4Data.Deny.attempts143.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.attempts143D) != "undefined"? stage4Data.Deny.attempts143D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.attempts143Num},
                  {variable:statsName[6], mean:typeof(stage4Data.Deny.attemptsapps) != "undefined"? stage4Data.Deny.attemptsapps.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.attemptsappsD) != "undefined"? stage4Data.Deny.attemptsappsD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.attemptsappsNum},
									{variable:statsName[7], mean:typeof(stage4Data.Deny.cse142firstclass) != "undefined"? stage4Data.Deny.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.cse142firstclassD) != "undefined"? stage4Data.Deny.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.cse142firstclassNum},
									{variable:statsName[8], mean:typeof(stage4Data.Deny.cse143firstclass) != "undefined"? stage4Data.Deny.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.cse143firstclassD) != "undefined"? stage4Data.Deny.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.cse143firstclassNum},
									{variable:statsName[9], mean:typeof(stage4Data.Deny.stdmath) != "undefined"? stage4Data.Deny.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.stdmathD) != "undefined"? stage4Data.Deny.stdmathD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.stdmathNum},
									{variable:statsName[10], mean:typeof(stage4Data.Deny.stdverbal) != "undefined"? stage4Data.Deny.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.stdverbalD) != "undefined"? stage4Data.Deny.stdverbalD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.stdverbalNum},
									{variable:statsName[11], mean:typeof(stage4Data.Deny.stdcomb) != "undefined"? stage4Data.Deny.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.stdcombD) != "undefined"? stage4Data.Deny.stdcombD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.stdcombNum},
									{variable:statsName[12], mean:typeof(stage4Data.Deny.Q5b) != "undefined"? stage4Data.Deny.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q5bD) != "undefined"? stage4Data.Deny.Q5bD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q5bNum},
									{variable:statsName[13], mean:typeof(stage4Data.Deny.Q5d) != "undefined"? stage4Data.Deny.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q5dD) != "undefined"? stage4Data.Deny.Q5dD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q5dNum},
									{variable:statsName[14], mean:typeof(stage4Data.Deny.Q5e) != "undefined"? stage4Data.Deny.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q5eD) != "undefined"? stage4Data.Deny.Q5eD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q5eNum},
									{variable:statsName[15], mean:typeof(stage4Data.Deny.Q5f) != "undefined"? stage4Data.Deny.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q5fD) != "undefined"? stage4Data.Deny.Q5fD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q5fNum},
									{variable:statsName[16], mean:typeof(stage4Data.Deny.Q7a) != "undefined"? stage4Data.Deny.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q7aD) != "undefined"? stage4Data.Deny.Q7aD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q7aNum},
									{variable:statsName[17], mean:typeof(stage4Data.Deny.Q8a) != "undefined"? stage4Data.Deny.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8aD) != "undefined"? stage4Data.Deny.Q8aD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q8aNum},
									{variable:statsName[18], mean:typeof(stage4Data.Deny.Q8c) != "undefined"? stage4Data.Deny.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8cD) != "undefined"? stage4Data.Deny.Q8cD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q8cNum},
									{variable:statsName[19], mean:typeof(stage4Data.Deny.Q8d) != "undefined"? stage4Data.Deny.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8dD) != "undefined"? stage4Data.Deny.Q8dD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q8dNum},
									{variable:statsName[20], mean:typeof(stage4Data.Deny.Q8e) != "undefined"? stage4Data.Deny.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8eD) != "undefined"? stage4Data.Deny.Q8eD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q8eNum},
									{variable:statsName[21], mean:typeof(stage4Data.Deny.Q8g) != "undefined"? stage4Data.Deny.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8gD) != "undefined"? stage4Data.Deny.Q8gD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q8gNum},
									{variable:statsName[22], mean:typeof(stage4Data.Deny.Q8i) != "undefined"? stage4Data.Deny.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q8iD) != "undefined"? stage4Data.Deny.Q8iD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q8iNum},
									{variable:statsName[23], mean:typeof(stage4Data.Deny.Q9) != "undefined"? stage4Data.Deny.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q9D) != "undefined"? stage4Data.Deny.Q9D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q9Num},
									{variable:statsName[24], mean:typeof(stage4Data.Deny.Q11) != "undefined"? stage4Data.Deny.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.Deny.Q11D) != "undefined"? stage4Data.Deny.Q11D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.Deny.Q11Num},
									];
		}
		
		var weight3Stage4 = weightDef;
		if(typeof(stage4Data.SD) != "undefined"){
			weight3Stage4 = stage4Data.SD.weight;
      stage4StatsSD = [{variable:statsName[0], mean:typeof(stage4Data.SD.gpa) != "undefined"? stage4Data.SD.gpa.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.gpaD) != "undefined"? stage4Data.SD.gpaD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.gpaNum},
									{variable:statsName[1], mean:typeof(stage4Data.SD.cse142grade) != "undefined"? stage4Data.SD.cse142grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.cse142gradeD) != "undefined"? stage4Data.SD.cse142gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.cse142gradeNum},
									{variable:statsName[2], mean:typeof(stage4Data.SD.cse143grade) != "undefined"? stage4Data.SD.cse143grade.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.cse143gradeD) != "undefined"? stage4Data.SD.cse143gradeD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.cse143gradeNum},
									{variable:statsName[3], mean:typeof(stage4Data.SD.appscores) != "undefined"? stage4Data.SD.appscores.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.appscoresD) != "undefined"? stage4Data.SD.appscoresD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.appscoresNum},
                  {variable:statsName[4], mean:typeof(stage4Data.SD.attempts142) != "undefined"? stage4Data.SD.attempts142.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.attempts142D) != "undefined"? stage4Data.SD.attempts142D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.attempts142Num},
                  {variable:statsName[5], mean:typeof(stage4Data.SD.attempts143) != "undefined"? stage4Data.SD.attempts143.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.attempts143D) != "undefined"? stage4Data.SD.attempts143D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.attempts143Num},
                  {variable:statsName[6], mean:typeof(stage4Data.SD.attemptsapps) != "undefined"? stage4Data.SD.attemptsapps.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.attemptsappsD) != "undefined"? stage4Data.SD.attemptsappsD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.attemptsappsNum},
									{variable:statsName[7], mean:typeof(stage4Data.SD.cse142firstclass) != "undefined"? stage4Data.SD.cse142firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.cse142firstclassD) != "undefined"? stage4Data.SD.cse142firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.cse142firstclassNum},
									{variable:statsName[8], mean:typeof(stage4Data.SD.cse143firstclass) != "undefined"? stage4Data.SD.cse143firstclass.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.cse143firstclassD) != "undefined"? stage4Data.SD.cse143firstclassD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.cse143firstclassNum},
									{variable:statsName[9], mean:typeof(stage4Data.SD.stdmath) != "undefined"? stage4Data.SD.stdmath.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.stdmathD) != "undefined"? stage4Data.SD.stdmathD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.stdmathNum},
									{variable:statsName[10], mean:typeof(stage4Data.SD.stdverbal) != "undefined"? stage4Data.SD.stdverbal.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.stdverbalD) != "undefined"? stage4Data.SD.stdverbalD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.stdverbalNum},
									{variable:statsName[11], mean:typeof(stage4Data.SD.stdcomb) != "undefined"? stage4Data.SD.stdcomb.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.stdcombD) != "undefined"? stage4Data.SD.stdcombD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.stdcombNum},
									{variable:statsName[12], mean:typeof(stage4Data.SD.Q5b) != "undefined"? stage4Data.SD.Q5b.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q5bD) != "undefined"? stage4Data.SD.Q5bD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q5bNum},
									{variable:statsName[13], mean:typeof(stage4Data.SD.Q5d) != "undefined"? stage4Data.SD.Q5d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q5dD) != "undefined"? stage4Data.SD.Q5dD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q5dNum},
									{variable:statsName[14], mean:typeof(stage4Data.SD.Q5e) != "undefined"? stage4Data.SD.Q5e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q5eD) != "undefined"? stage4Data.SD.Q5eD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q5eNum},
									{variable:statsName[15], mean:typeof(stage4Data.SD.Q5f) != "undefined"? stage4Data.SD.Q5f.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q5fD) != "undefined"? stage4Data.SD.Q5fD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q5fNum},
									{variable:statsName[16], mean:typeof(stage4Data.SD.Q7a) != "undefined"? stage4Data.SD.Q7a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q7aD) != "undefined"? stage4Data.SD.Q7aD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q7aNum},
									{variable:statsName[17], mean:typeof(stage4Data.SD.Q8a) != "undefined"? stage4Data.SD.Q8a.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8aD) != "undefined"? stage4Data.SD.Q8aD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q8aNum},
									{variable:statsName[18], mean:typeof(stage4Data.SD.Q8c) != "undefined"? stage4Data.SD.Q8c.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8cD) != "undefined"? stage4Data.SD.Q8cD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q8cNum},
									{variable:statsName[19], mean:typeof(stage4Data.SD.Q8d) != "undefined"? stage4Data.SD.Q8d.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8dD) != "undefined"? stage4Data.SD.Q8dD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q8dNum},
									{variable:statsName[20], mean:typeof(stage4Data.SD.Q8e) != "undefined"? stage4Data.SD.Q8e.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8eD) != "undefined"? stage4Data.SD.Q8eD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q8eNum},
									{variable:statsName[21], mean:typeof(stage4Data.SD.Q8g) != "undefined"? stage4Data.SD.Q8g.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8gD) != "undefined"? stage4Data.SD.Q8gD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q8gNum},
									{variable:statsName[22], mean:typeof(stage4Data.SD.Q8i) != "undefined"? stage4Data.SD.Q8i.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q8iD) != "undefined"? stage4Data.SD.Q8iD.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q8iNum},
									{variable:statsName[23], mean:typeof(stage4Data.SD.Q9) != "undefined"? stage4Data.SD.Q9.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q9D) != "undefined"? stage4Data.SD.Q9D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q9Num},
									{variable:statsName[24], mean:typeof(stage4Data.SD.Q11) != "undefined"? stage4Data.SD.Q11.toFixed(numberOfDecimalPlaces): "NA", deviation:typeof(stage4Data.SD.Q11D) != "undefined"? stage4Data.SD.Q11D.toFixed(numberOfDecimalPlaces): "NA", num:stage4Data.SD.Q11Num},
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
	}
	}
	return [stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsApply, stage3StatsDNA, stage4StatsAccept, stage4StatsDeny, stage4StatsSD]
}

function updateDataWithTransition(data){

	graph.nodes = []
	graph.links = []
	//filter data for stage 1
	//[stage1Stats, stage2StatsCS143, stage2StatsNA143, stage3StatsAccept, stage3StatsDNA, stage3StatsDeny, stage3StatsSD]
	 groupStats = createNodeData(graph, data);
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
		.style("stroke-opacity", function(d, i){ return linkOpacity; })
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
	var nodeText = svg.selectAll("text")
					.data(graph.nodes);
					
				nodeText
				.select("#span1")
				.attr("x", 42)
				  .attr("y", function(d) { return d.dy / 2; })
				  .attr("dy", ".35em")
				  .attr("text-anchor", "start")
				  .attr("transform", null)
				.text(function(d) {
					if (d.value >=1){
					return d.name;}
					})
				.transition()
				.duration(transitionDuration);
				
				nodeText
				.select("#span2")
				.attr("x", 42)
				  .attr("y", function(d) { return d.dy / 2 + 20; })
				  .attr("dy", ".35em")
				  .attr("text-anchor", "start")
				  .attr("transform", null)
				.text(function(d) {
					if (d.value >=1){
						return "(" + Math.round(d.value) + ")";}
					})
				.transition()
				.duration(transitionDuration);

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
	
	//add rectangle label
	var nodeText = node.append("text");
				  
	
		//nodeText.append("tspan")
		//nodeText
		
		var span1 = nodeText
					.append("tspan")
					.attr("x", 42)
				  .attr("y", function(d) { return d.dy / 2; })
				  .attr("dy", ".35em")
				  .attr("text-anchor", "start")
				  .attr("transform", null)
				  .attr("id", "span1");
		var span2 = nodeText
				.append("tspan")
				.attr("x", 42)
				  .attr("y", function(d) { return d.dy / 2 + 20; })
				  .attr("dy", ".35em")
				  .attr("text-anchor", "start")
				  .attr("transform", null)
				  .attr("id", "span2");
		span1.text(function(d) {
			if (d.value >=1){
			return d.name;}
			});
		span2.text(function(d) {
			if (d.value >=1){
			return "(" + Math.round(d.value) + ")";}
			});
	

   
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
	groupStatData = dataStat
	differenceStat(groupStatData, groupStatDataNew)
   
	d3.select("body")
    	.datum(dataStat) /// filter on lines
    	.call(t)
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
  console.log(text)
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
