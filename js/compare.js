function differenceStat(data1, data2){
  var diff;
  var sd;
  var zscores = [];
  
  if (data1[0] && data2[0]) {
    for(var i = 0; i < data1.length; i++) {
      if(data1[i]["num"] !=0 && data1[i]["num"] != 0) {
        diff = data1[i]["mean"] - data2[i]["mean"]
        sd = Math.sqrt(Math.pow(data1[i]["deviation"],2)/data1[i]["num"] + Math.pow(data2[i]["deviation"],2)/data2[i]["num"])
        zscores.push({variable:data1[i]['variable'], zscore:diff/sd})
      } else {
        zscores.push({variable:data1[i]['variable'], zscore:NaN})
      }
    }
  }
  
  //Significant if > 3.05
  drawBarGraph(zscores)
}

//svgBar
/*function drawBarGraph1(data){
	height1 = 200;
	x.domain(data.map(function(d) { return d.variable; }));
  	y.domain([0, d3.max(data, function(d) { return d.zscore; })]);

	svgBar.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(xAxis);

	  svgBar.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("ZScore");

	  svgBar.selectAll(".bar")
	      .data(data)
	    .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return x(d.variable); })
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) { return y(d.zscore); })
	      .attr("height", function(d) { return height1 - y(d.zscore); });
	      //.on('mouseover', tip.show)
	      //.on('mouseout', tip.hide)
}*/

function drawBarGraph(data){
	dataMap = [{key:"Z Score", values:data}] 
	chartBar
		  .x(function(d) { return d.variable })    //Specify the data accessors.
		  .y(function(d) { return d.zscore })
		  .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
		  .showValues(true)       //...instead, show the bar value right on top of each bar.
		  .tooltip(true);
	/*chartBar
		.x(function(d) { return d.variable })
        .y(function(d) { return d.zscore })  
		  .margin({top: 30, right: 20, bottom: 50, left: 175})
        .showValues(true)           //Show bar value next to each bar.
        .tooltip(true)             //Show tooltips on hover.
        //.transitionDuration(350)
        .showControls(false);*/
		  
	chartBar.yAxis.axisLabel("Z-Score")
	  
	  d3.select('#chartBar svg')
		  .datum(dataMap)
		  .call(chartBar);

	  nv.utils.windowResize(chartBar.update);

	  return chartBar;
}
