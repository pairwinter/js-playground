var csv=require("ya-csv");
var reader = csv.createCsvFileReader('international-rates.csv', { columnsFromHeader: true });
var start=false;
var datas=[];
reader.addListener('data', function(data) {
	var line=[];
	for(var d in data)
	{
		line.push(data[d]);
	}
	datas.push(line.join("     "));
});
reader.addListener("end",function(){
	console.log(datas.join("\n"));
	console.log("*************************end************************* \n");
})
