var weightDef = 0.01;
var transitionDuration = 1000;
var defMinValue = 10000;

/*function computeStatistics(d){
	epsilon = 0.000001
	//Student GPA
	gpagradeMean = 0
	gpagradeMax = 0
	gpagradeMin = defMinValue
	countgpa = 0	

	//CSE 143 Details
	cse143gradeMean = 0
	cse143gradeMax = 0
	cse143gradeMin = defMinValue
	countCSE143 = 0

	//CSE 142 Details
	cse142gradeMean = 0
	cse142gradeMax = 0
	cse142gradeMin = defMinValue
	countCSE142 = 0

	//application scores
	appScoreMean = 0
	appScoreMax = 0
	appScoreMin = defMinValue
	countappScore = 0

	//stdmath 
	stdmathMean = 0
	stdmathMax = 0
	stdmathMin = defMinValue
	countstdmath = 0
	//stdverbal	
	stdverbalMean = 0
	stdverbalMax = 0
	stdverbalMin = defMinValue
	countstdverbal = 0
	//stdcomb
	stdcombMean = 0
	stdcombMax = 0
	stdcombMin = defMinValue
	countstdcomb = 0

	//Q5b 
	Q5bMean = 0
	Q5bMax = 0
	Q5bMin = defMinValue
	countQ5b = 0

	//Q5d 
	Q5dMean = 0
	Q5dMax = 0
	Q5dMin = defMinValue
	countQ5d = 0

	//Q5e 
	Q5eMean = 0
	Q5eMax = 0
	Q5eMin = defMinValue
	countQ5e = 0

	//Q5f 
	Q5fMean = 0
	Q5fMax = 0
	Q5fMin = defMinValue
	countQ5f = 0

	//Q5g 
	Q5gMean = 0
	Q5gMax = 0
	Q5gMin = defMinValue
	countQ5g = 0

	//Q7a 
	Q7aMean = 0
	Q7aMax = 0
	Q7aMin = defMinValue
	countQ7a = 0

	//Q8a 
	Q8aMean = 0
	Q8aMax = 0
	Q8aMin = defMinValue
	countQ8a = 0

	//Q8c 
	Q8cMean = 0
	Q8cMax = 0
	Q8cMin = defMinValue
	countQ8c = 0

	//Q8d 
	Q8dMean = 0
	Q8dMax = 0
	Q8dMin = defMinValue
	countQ8d = 0

	//Q8e 
	Q8eMean = 0
	Q8eMax = 0
	Q8eMin = defMinValue
	countQ8e = 0

	//Q8g 
	Q8gMean = 0
	Q8gMax = 0
	Q8gMin = defMinValue
	countQ8g = 0

	//Q8i 
	Q8iMean = 0
	Q8iMax = 0
	Q8iMin = defMinValue
	countQ8i = 0

	//Q9 
	Q9Mean = 0
	Q9Max = 0
	Q9Min = defMinValue
	countQ9 = 0

	//Q10 
	Q10Mean = 0
	Q10Max = 0
	Q10Min = defMinValue
	countQ10 = 0

	//Q11 
	Q11Mean = 0
	Q11Max = 0
	Q11Min = defMinValue
	countQ11 = 0

	d.forEach(function(data) {
		data.GPA = parseFloat(data.GPA)
		data.cse143grade = parseFloat(data.cse143grade)
		data.cse142grade = parseFloat(data.cse142grade)
		data.appscores = parseFloat(data.appscores)

		data.stdmath = parseFloat(data.stdmath)
		data.Q5b = parseFloat(data.Q5b)
		data.stdverbal = parseFloat(data.stdverbal)
		if(typeof(data.stdmath) == "number" && !isNaN(data.stdmath)){
			stdmathMean += data.stdmath;
			countstdmath += 1
			if (data.stdmath > stdmathMax){
				stdmathMax = data.stdmath;
			}
			if (data.stdmath < stdmathMin){
				stdmathMin = data.stdmath;
			}
		}

		
		if(typeof(data.Q5b) == "number" && !isNaN(data.Q5b)){
			Q5bMean += data.Q5b;
			countQ5b += 1
			if (data.Q5b > Q5bMax){
				Q5bMax = data.Q5b;
			}
			if (data.Q5b < Q5bMin){
				Q5bMin = data.Q5b;
			}
		}

		data.Q5d = parseFloat(data.Q5d)
		if(typeof(data.Q5d) == "number" && !isNaN(data.Q5d)){
			Q5dMean += data.Q5d;
			countQ5d += 1
			if (data.Q5d > Q5dMax){
				Q5dMax = data.Q5d;
			}
			if (data.Q5d < Q5dMin){
				Q5dMin = data.Q5d;
			}
		}

		data.Q5e = parseFloat(data.Q5e)
		if(typeof(data.Q5e) == "number" && !isNaN(data.Q5e)){
			Q5eMean += data.Q5e;
			countQ5e += 1
			if (data.Q5e > Q5eMax){
				Q5eMax = data.Q5e;
			}
			if (data.Q5e < Q5eMin){
				Q5eMin = data.Q5e;
			}
		}

		data.Q5f = parseFloat(data.Q5f)
		if(typeof(data.Q5f) == "number" && !isNaN(data.Q5f)){
			Q5fMean += data.Q5f;
			countQ5f += 1
			if (data.Q5f > Q5fMax){
				Q5fMax = data.Q5f;
			}
			if (data.Q5f < Q5fMin){
				Q5fMin = data.Q5f;
			}
		}

		data.Q5g = parseFloat(data.Q5g)
		if(typeof(data.Q5g) == "number" && !isNaN(data.Q5g)){
			Q5gMean += data.Q5g;
			countQ5g += 1
			if (data.Q5g > Q5gMax){
				Q5gMax = data.Q5g;
			}
			if (data.Q5g < Q5gMin){
				Q5gMin = data.Q5g;
			}
		}

		data.Q7a = parseFloat(data.Q7a)
		if(typeof(data.Q7a) == "number" && !isNaN(data.Q7a)){
			Q7aMean += data.Q7a;
			countQ7a += 1
			if (data.Q7a > Q7aMax){
				Q7aMax = data.Q7a;
			}
			if (data.Q7a < Q7aMin){
				Q7aMin = data.Q7a;
			}
		}
	

		
		if(typeof(data.stdverbal) == "number" && !isNaN(data.stdverbal)){
			stdverbalMean += data.stdverbal;
			countstdverbal += 1
			if (data.stdverbal > stdverbalMax){
				stdverbalMax = data.stdverbal;
			}
			if (data.stdverbal < stdverbalMin){
				stdverbalMin = data.stdverbal;
			}
		}

		data.stdcomb = parseFloat(data.stdcomb)
		if(typeof(data.stdcomb) == "number" && !isNaN(data.stdcomb)){
			stdcombMean += data.stdcomb;
			countstdcomb += 1
			if (data.stdcomb > stdcombMax){
				stdcombMax = data.stdcomb;
			}
			if (data.stdcomb < stdcombMin){
				stdcombMin = data.stdcomb;
			}
		}

		if(typeof(data.GPA) == "number" && !isNaN(data.GPA)){
			gpagradeMean += data.GPA;
			countgpa += 1
			if (data.GPA > gpagradeMax){
				gpagradeMax = data.GPA;
			}
			if (data.GPA < gpagradeMin){
				gpagradeMin = data.GPA;
			}
		}

		if(typeof(data.cse143grade) == "number" && !isNaN(data.cse143grade)){
			cse143gradeMean += data.cse143grade;
			countCSE143 += 1
			if (data.cse143grade > cse143gradeMax){
				cse143gradeMax = data.cse143grade;
			}
			if (data.cse143grade < cse143gradeMin){
				cse143gradeMin = data.cse143grade;
			}
		}
		if(typeof(data.cse142grade) == "number" && !isNaN(data.cse142grade)){
			cse142gradeMean += data.cse142grade;
			countCSE142 += 1
			if (data.cse142grade > cse142gradeMax){
				cse142gradeMax = data.cse142grade;
			}
			if (data.cse142grade < cse142gradeMin){
				cse142gradeMin = data.cse142grade;
			}
		}
		if(typeof(data.appscores) == "number" && !isNaN(data.appscores)){
			appScoreMean += data.appscores;
			countappScore += 1
			if (data.appscores > appScoreMax){
				appScoreMax = data.appscores;
			}
			if (data.appscores < appScoreMin){
				appScoreMin = data.appscores;
			}
		}

		data.Q8a = parseFloat(data.Q8a)
		if(typeof(data.Q8a) == "number" && !isNaN(data.Q8a)){
			Q8aMean += data.Q8a;
			countQ8a += 1
			if (data.Q8a > Q8aMax){
				Q8aMax = data.Q8a;
			}
			if (data.Q8a < Q8aMin){
				Q8aMin = data.Q8a;
			}
		}

		data.Q8c = parseFloat(data.Q8c)
		if(typeof(data.Q8c) == "number" && !isNaN(data.Q8c)){
			Q8cMean += data.Q8c;
			countQ8c += 1
			if (data.Q8c > Q8cMax){
				Q8cMax = data.Q8c;
			}
			if (data.Q8c < Q8cMin){
				Q8cMin = data.Q8c;
			}
		}

		data.Q8d = parseFloat(data.Q8d)
		if(typeof(data.Q8d) == "number" && !isNaN(data.Q8d)){
			Q8dMean += data.Q8d;
			countQ8d += 1
			if (data.Q8d > Q8dMax){
				Q8dMax = data.Q8d;
			}
			if (data.Q8d < Q8dMin){
				Q8dMin = data.Q8d;
			}
		}

		data.Q8e = parseFloat(data.Q8e)
		if(typeof(data.Q8e) == "number" && !isNaN(data.Q8e)){
			Q8eMean += data.Q8e;
			countQ8e += 1
			if (data.Q8e > Q8eMax){
				Q8eMax = data.Q8e;
			}
			if (data.Q8e < Q8eMin){
				Q8eMin = data.Q8e;
			}
		}

		data.Q8g = parseFloat(data.Q8g)
		if(typeof(data.Q8g) == "number" && !isNaN(data.Q8g)){
			Q8gMean += data.Q8g;
			countQ8g += 1
			if (data.Q8g > Q8gMax){
				Q8gMax = data.Q8g;
			}
			if (data.Q8g < Q8gMin){
				Q8gMin = data.Q8g;
			}
		}

		data.Q8i = parseFloat(data.Q8i)
		if(typeof(data.Q8i) == "number" && !isNaN(data.Q8i)){
			Q8iMean += data.Q8i;
			countQ8i += 1
			if (data.Q8i > Q8iMax){
				Q8iMax = data.Q8i;
			}
			if (data.Q8i < Q8iMin){
				Q8iMin = data.Q8i;
			}
		}

		data.Q9 = parseFloat(data.Q9)
		if(typeof(data.Q9) == "number" && !isNaN(data.Q9)){
			Q9Mean += data.Q9;
			countQ9 += 1
			if (data.Q9 > Q9Max){
				Q9Max = data.Q9;
			}
			if (data.Q9 < Q9Min){
				Q9Min = data.Q9;
			}
		}

		data.Q10 = parseFloat(data.Q10)
		if(typeof(data.Q10) == "number" && !isNaN(data.Q10)){
			Q10Mean += data.Q10;
			countQ10 += 1
			if (data.Q10 > Q10Max){
				Q10Max = data.Q10;
			}
			if (data.Q10 < Q10Min){
				Q10Min = data.Q10;
			}
		}

		data.Q11 = parseFloat(data.Q11)
		if(typeof(data.Q11) == "number" && !isNaN(data.Q11)){
			Q11Mean += data.Q11;
			countQ11 += 1
			if (data.Q11 > Q11Max){
				Q11Max = data.Q11;
			}
			if (data.Q11 < Q11Min){
				Q11Min = data.Q11;
			}
		}

	});
	cse143gradeMean = cse143gradeMean/(countCSE143 + epsilon)
	cse143gradeMean = cse143gradeMean.toFixed(2)

	cse142gradeMean = cse142gradeMean/(countCSE142 + epsilon)
	cse142gradeMean = cse142gradeMean.toFixed(2)

	appScoreMean = appScoreMean/(countappScore + epsilon)
	appScoreMean = appScoreMean.toFixed(2)

	gpagradeMean = gpagradeMean/(countgpa + epsilon)
	gpagradeMean = gpagradeMean.toFixed(2)

	stdcombMean = stdcombMean/(countstdcomb + epsilon)
	stdcombMean = stdcombMean.toFixed(2)

	stdverbalMean = stdverbalMean/(countstdverbal + epsilon)
	stdverbalMean = stdverbalMean.toFixed(2)

	
	stdmathMean = stdmathMean/(countstdmath + epsilon)
	stdmathMean = stdmathMean.toFixed(2)

	if(gpagradeMin == defMinValue){
		gpagradeMin = 0
	}
	if(cse142gradeMin == defMinValue){
		cse142gradeMin = 0
	}
	if(cse143gradeMin == defMinValue){
		cse143gradeMin = 0
	}
	if(appScoreMin == defMinValue){
		appScoreMin = 0
	}
	if(stdcombMin == defMinValue){
		stdcombMin = 0
	}
	if(stdverbalMin == defMinValue){
		stdverbalMin = 0
	}
	if(stdmathMin == defMinValue){
		stdmathMin = 0
	}

	Q5bMean = Q5bMean/(countQ5b + epsilon)
	Q5bMean = Q5bMean.toFixed(2)

	if(Q5bMin == defMinValue){
		Q5bMin = 0
	}

	Q5dMean = Q5dMean/(countQ5d + epsilon)
	Q5dMean = Q5dMean.toFixed(2)

	if(Q5dMin == defMinValue){
		Q5dMin = 0
	}

	Q5eMean = Q5eMean/(countQ5e + epsilon)
	Q5eMean = Q5eMean.toFixed(2)

	if(Q5eMin == defMinValue){
		Q5eMin = 0
	}

	Q5fMean = Q5fMean/(countQ5f + epsilon)
	Q5fMean = Q5fMean.toFixed(2)

	if(Q5fMin == defMinValue){
		Q5fMin = 0
	}

	Q5gMean = Q5gMean/(countQ5g + epsilon)
	Q5gMean = Q5gMean.toFixed(2)

	if(Q5gMin == defMinValue){
		Q5gMin = 0
	}

	Q7aMean = Q7aMean/(countQ7a + epsilon)
	Q7aMean = Q7aMean.toFixed(2)

	if(Q7aMin == defMinValue){
		Q7aMin = 0
	}

	Q8aMean = Q8aMean/(countQ8a + epsilon)
	Q8aMean = Q8aMean.toFixed(2)

	if(Q8aMin == defMinValue){
		Q8aMin = 0
	}

	Q8cMean = Q8cMean/(countQ8c + epsilon)
	Q8cMean = Q8cMean.toFixed(2)

	if(Q8cMin == defMinValue){
		Q8cMin = 0
	}

	Q8dMean = Q8dMean/(countQ8d + epsilon)
	Q8dMean = Q8dMean.toFixed(2)

	if(Q8dMin == defMinValue){
		Q8dMin = 0
	}

	Q8eMean = Q8eMean/(countQ8e + epsilon)
	Q8eMean = Q8eMean.toFixed(2)

	if(Q8eMin == defMinValue){
		Q8eMin = 0
	}

	Q8gMean = Q8gMean/(countQ8g + epsilon)
	Q8gMean = Q8gMean.toFixed(2)

	if(Q8gMin == defMinValue){
		Q8gMin = 0
	}

	Q8iMean = Q8iMean/(countQ8i + epsilon)
	Q8iMean = Q8iMean.toFixed(2)

	if(Q8iMin == defMinValue){
		Q8iMin = 0
	}

	Q9Mean = Q9Mean/(countQ9 + epsilon)
	Q9Mean = Q9Mean.toFixed(2)

	if(Q9Min == defMinValue){
		Q9Min = 0
	}

	Q10Mean = Q10Mean/(countQ10 + epsilon)
	Q10Mean = Q10Mean.toFixed(2)

	if(Q10Min == defMinValue){
		Q10Min = 0
	}

	Q11Mean = Q11Mean/(countQ11 + epsilon)
	Q11Mean = Q11Mean.toFixed(2)

	if(Q11Min == defMinValue){
		Q11Min = 0
	}



	return [{variable:"GPA", mean:gpagradeMean, maximum:gpagradeMax, minimum:gpagradeMin},
		{variable:"Grade (CSE 142)", mean:cse142gradeMean, maximum:cse142gradeMax, minimum:cse142gradeMin},
		{variable:"Grade (CSE 143)", mean:cse143gradeMean, maximum:cse143gradeMax, minimum:cse143gradeMin},		
		{variable:"Application Score", mean:appScoreMean, maximum:appScoreMax, minimum:appScoreMin},
		{variable:"Std Math", mean:stdmathMean, maximum:stdmathMax, minimum:stdmathMin},
		{variable:"Std Verbal", mean:stdverbalMean, maximum:stdverbalMax, minimum:stdverbalMin},
		{variable:"Std Comb", mean:stdcombMean, maximum:stdcombMax, minimum:stdcombMin},
		{variable:"Q5b", mean:Q5bMean, maximum:Q5bMax, minimum:Q5bMin},
		{variable:"Q5d", mean:Q5dMean, maximum:Q5dMax, minimum:Q5dMin},
		{variable:"Q5e", mean:Q5eMean, maximum:Q5eMax, minimum:Q5eMin},
		{variable:"Q5f", mean:Q5fMean, maximum:Q5fMax, minimum:Q5fMin},
		{variable:"Q5g", mean:Q5gMean, maximum:Q5gMax, minimum:Q5gMin},
		{variable:"Q7a", mean:Q7aMean, maximum:Q7aMax, minimum:Q7aMin},
		{variable:"Q8a", mean:Q8aMean, maximum:Q8aMax, minimum:Q8aMin},
		{variable:"Q8c", mean:Q8cMean, maximum:Q8cMax, minimum:Q8cMin},
		{variable:"Q8d", mean:Q8dMean, maximum:Q8dMax, minimum:Q8dMin},
		{variable:"Q8e", mean:Q8eMean, maximum:Q8eMax, minimum:Q8eMin},
		{variable:"Q8g", mean:Q8gMean, maximum:Q8gMax, minimum:Q8gMin},
		{variable:"Q8i", mean:Q8iMean, maximum:Q8iMax, minimum:Q8iMin},
		{variable:"Q9", mean:Q9Mean, maximum:Q9Max, minimum:Q9Min},
		{variable:"Q11", mean:Q11Mean, maximum:Q11Max, minimum:Q11Min}
];
	
}*/

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
    	.datum(stats)
    	.call(t)
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

	//compute the data statistics
	stats = computeStatistics(data);
	//create a table
	var t = d3.table();
	//render the data in table
	d3.select("body")
    	.datum(stats) /// filter on lines
    	.call(t)
}
