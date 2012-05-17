var express = require("express");
var util = require("util");
var app = express.createServer();
var csv=require("ya-csv");
var reader = csv.createCsvFileReader('international-rates.csv', { columnsFromHeader: true });
var start=false;
var datas=[];
var ignored_vendors=["west"];
var numbers=["86106985691","33662569854","33603698545","1250555985685","186798564122","1684285685255","3627245723452"];
reader.addListener('data', function(data) {
	datas.push(data);
});
reader.addListener("end",function(){
})

getVendor_numbers = function(contry_phone_vendors,ignored_vendors,numbers) {
	var vendor_numbers={"default_vendor":[]};
	for(var i = 0 ; i<numbers.length;i++)
	{
		var num=numbers[i];
		var match_cpv=[];
		for(var j=0;j<contry_phone_vendors.length;j++){
			var cpv=contry_phone_vendors[j];
			var iphoneNumbers=(cpv["PhoneNumbers"]+"").split(" ");
			for(var k=0;k<iphoneNumbers.length;k++){
				var iphoneNumber=iphoneNumbers[k];
				var reg = new  RegExp("^("+iphoneNumber+")\\d+");
				if(reg.test(num)){
					match_cpv.push(cpv);
					break;
				}
			}
		}
		if(match_cpv.length==0){
			vendor_numbers["default_vendor"].push(num);
		}else{
			var minPrice=0;
			var vendor=null;
			for(var n=0;n<match_cpv.length;n++){
				var cpv=match_cpv[n];
				for(var c in cpv){
					if(c!="Name" && c!="PhoneNumbers"){
						var ignored=false;
						for(var nn=0;nn<ignored_vendors.length;nn++){
							if(ignored_vendors[nn]==c){
								ignored=true;
								break;
							}
						}
						if(!ignored){
							if(!minPrice){
								vendor=c;
								minPrice=parseFloat(cpv[c]);
							}else{
								if(parseFloat(cpv[c])<minPrice){
									vendor=c;
									minPrice=parseFloat(cpv[c]);
								}
							}
						}
					}
				}
			}
			if(vendor!=null){
				if(!vendor_numbers[vendor]){
					vendor_numbers[vendor]=[num];
				}else{
					vendor_numbers[vendor].push(num);
				}
			}else{
				vendor_numbers["default_vendor"].push(num);
			}
		}
	}
	return vendor_numbers;
};

app.get("/",function(req,res){
	var v_n=getVendor_numbers(datas,ignored_vendors,numbers);
	console.log(util.inspect(v_n));
	res.send("over\n");
});
app.listen(9001);