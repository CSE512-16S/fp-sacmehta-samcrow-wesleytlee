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

//tooltip for bar chart
function mod_tooltip (d) {
   var html = ""
   d.series.forEach(function(elem){
	  html += "<b> Variable: </b>"
	 html += "<text style='color:"+elem.color+"'><b> "
			 +elem.key+"</b> <br></text> <b>Z-score:</b> <text style='color:"+elem.color+"'><b> "+(elem.value).toFixed(2)+" </b></text>";
   })
   return html;
 }

//svgBar
function drawBarGraph(data){
	dataMap = [{key:"Z Score", values:data}] 
	chartBar
		  .x(function(d) { return d.variable })    //Specify the data accessors.
		  .y(function(d) { if(typeof(d.zscore) == "number"){ return d.zscore} })
		  .showValues(true)  
		  .tooltip(true);
	
	chartBar.noData("We don't have any data for comparison!");
	
	chartBar.tooltip.contentGenerator(mod_tooltip);

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
