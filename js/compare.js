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
					zscores.push({variable:data1[i]['variable'], score:score, mean_diff:diff})
			}
    }
  }
  //Significant if > 3.05
  drawBarGraph(zscores)
}

//tooltip for bar chart
function mod_tooltip (d) {
   var html = ""
	 html += "<b> Variable: </b>" + d.data.variable + 
   "</b> <br></text> <b>Diff. in Means: "+(d.data.mean_diff).toFixed(2)+" </b></text>" +
   "</b> <br></text> <b>Approx. Score:</b> <text style='color:"+d.color+"'><b> "+(d.data.score).toFixed(2)+" </b></text>";
   return html;
 }

//svgBar
function drawBarGraph(data){
	dataMap = [{key:"Z Score", values:data}]
	chartBar
		  .x(function(d) { return d.variable })    //Specify the data accessors.
		  .y(function(d) { if(typeof(d.score) == "number"){ return d.score} })
		  .showValues(true)
      .forceY([-3,3])
      .color( function(d){ if(Math.abs(d.score) > 3.05){return '#238443'}else{ return '#c2e699'} })
		  .tooltip(true);

	chartBar.noData("We don't have any data to compare!");

	chartBar.tooltip.contentGenerator(mod_tooltip);



	chartBar.yAxis.axisLabel("Approximate Score");
	chartBar.xAxis.rotateLabels(-25);
	  chartBar.height(310);
	  d3.select('#chartBar svg')
		  .datum(dataMap)
		  .call(chartBar);

	  nv.utils.windowResize(chartBar.update);

	  return chartBar;
}
