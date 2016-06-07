function differenceStat(data1, data2){
  var diff;
  var sd;
  var zscores = [];
  
  
    for(var i = 0; i < data1.length; i++) {
		if (data1[i] && data2[i]) {
			diff = data1[i]["mean"] - data2[i]["mean"]
			sd = Math.sqrt(Math.pow(data1[i]["deviation"],2)/data1[i]["num"] + Math.pow(data2[i]["deviation"],2)/data2[i]["num"])
			var score = diff/sd;
			if (typeof(score) == "number" && !isNaN(score)){
					zscores.push({variable:data1[i]['variable'], zscore:score})
			}
    }
  }
  //Significant if > 3.05
  drawBarGraph(zscores)
}

//svgBar
function drawBarGraph(data){
	dataMap = [{key:"Z Score", values:data}] 
	chartBar
		  .x(function(d) { return d.variable })    //Specify the data accessors.
		  .y(function(d) { if(typeof(d.zscore) == "number"){ return d.zscore} })
		  //.staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
		  .showValues(true)       //...instead, show the bar value right on top of each bar.
		  .tooltip(true);

	chartBar.color( function(d){ if(Math.abs(d.zscore) > 3.05){return '#238443'}else{ return '#c2e699'} })

		  
	chartBar.yAxis.axisLabel("Z-Score");
	chartBar.xAxis.rotateLabels(-25);
	  chartBar.height(310);
	  d3.select('#chartBar svg')
		  .datum(dataMap)
		  .call(chartBar);

	  nv.utils.windowResize(chartBar.update);

	  return chartBar;
}
