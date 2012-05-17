function process(milliSeconds,callback)
{
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliSeconds);
	callback(new Date().getTime());
}
exports.process=process;