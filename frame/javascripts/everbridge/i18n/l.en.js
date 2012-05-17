(function(common){
	common.message.type="en";
	// Validation
	common.message.validation={
			ip			:	"please input a valid ip address",
			domain		:	"please input a valid domain",
			host		:	"please input a valid host",
			mbox		:	"please input a valid email address, use '.' to replace '@', end by '.' ",
			ip_or_domain:	"please input a valid ip or domain name",
			phoneUS		:	"Please specify a valid phone number",
			multi_emails:	"Please input valid emails, one on each line, less than 128 characters per email",
		   multi_phoneUS:	"Please input valid phone numbers, on one each line",
		   pattern 		:	"Please input valid format",
		  jqueryValidate:	{
								required: "This field is required.",
								remote: "Please fix this field.",
								email: "Please enter a valid email address.",
								url: "Please enter a valid URL.",
								date: "Please enter a valid date.",
								dateISO: "Please enter a valid date (ISO).",
								number: "Please enter a valid number.",
								digits: "Please enter only digits.",
								creditcard: "Please enter a valid credit card number.",
								equalTo: "Please enter the same value again.",
								accept: "Please enter a value with a valid extension.",
								maxlength: $.validator.format("Please enter no more than {0} characters."),
								minlength: $.validator.format("Please enter at least {0} characters."),
								rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
								range: $.validator.format("Please enter a value between {0} and {1}."),
								max: $.validator.format("Please enter a value less than or equal to {0}."),
								min: $.validator.format("Please enter a value greater than or equal to {0}.")
							}
	};
	//fild tip
	common.message.tip={
		ip:"pls type IP style",
		userName:"pls type ，1～5 characters",
		repassword:"type password again",
		phoneUS:"phone format:x(xxx)-xxx-xxxx or xxx xxx xxxx or xxx-xxx-xxxx"
	};
	// Common
	common.message.common={
			error0	:"Server is busy or power down",
			error404	:"resource not found!",
			error500	:"Server Error！",
			error10000	:"Session has expired,please login again.",
			error10001	:"You don't have enough permissions"
	}
})(EB_Common);
