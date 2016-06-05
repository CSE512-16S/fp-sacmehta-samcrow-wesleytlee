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
  console.log(zscores)
}