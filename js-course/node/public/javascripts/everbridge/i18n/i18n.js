(function(common){
	if(!common.message)
		common.message={};
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
        pattern		:	"Please input valid format",
        less_equal   :   "{1} value should be less or equal {2} value.",
        phone_length_nanp :   "Please enter a valid NANP phone number with 10 digits",
        phone_length_other :   "Please enter a valid phone number with + or digits, length is 4~20",
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
    // table grid
    common.message.grid={
        defaults : {
            recordtext: "View {0} - {1} of {2}",
            emptyrecords: "No records to view",
            loadtext: "Loading...",
            pgtext : "Page {0} of {1}"
        },
        search : {
            caption: "Search...",
            Find: "Find",
            Reset: "Reset",
            odata : ['equal', 'not equal', 'less', 'less or equal','greater','greater or equal', 'begins with','does not begin with','is in','is not in','ends with','does not end with','contains','does not contain'],
            groupOps: [	{ op: "AND", text: "all" },	{ op: "OR",  text: "any" }	],
            matchText: " match",
            rulesText: " rules"
        },
        edit : {
            addCaption: "Add Record",
            editCaption: "Edit Record",
            bSubmit: "Submit",
            bCancel: "Cancel",
            bClose: "Close",
            saveData: "Data has been changed! Save changes?",
            bYes : "Yes",
            bNo : "No",
            bExit : "Cancel",
            msg: {
                required:"Field is required",
                number:"Please, enter valid number",
                minValue:"value must be greater than or equal to ",
                maxValue:"value must be less than or equal to",
                email: "is not a valid e-mail",
                integer: "Please, enter valid integer value",
                date: "Please, enter valid date value",
                url: "is not a valid URL. Prefix required ('http://' or 'https://')",
                nodefined : " is not defined!",
                novalue : " return value is required!",
                customarray : "Custom function should return array!",
                customfcheck : "Custom function should be present in case of custom checking!"

            }
        },
        view : {
            caption: "View Record",
            bClose: "Close"
        },
        del : {
            caption: "Delete",
            msg: "Delete selected record(s)?",
            bSubmit: "Delete",
            bCancel: "Cancel"
        },
        nav : {
            edittext: "",
            edittitle: "Edit selected row",
            addtext:"",
            addtitle: "Add new row",
            deltext: "",
            deltitle: "Delete selected row",
            searchtext: "",
            searchtitle: "Find records",
            refreshtext: "",
            refreshtitle: "Reload Grid",
            alertcap: "Warning",
            alerttext: "Please, select row",
            viewtext: "",
            viewtitle: "View selected row"
        },
        col : {
            caption: "Select columns",
            bSubmit: "Ok",
            bCancel: "Cancel"
        },
        errors : {
            errcap : "Error",
            nourl : "No url is set",
            norecords: "No records to process",
            model : "Length of colNames <> colModel!"
        },
        formatter : {
            integer : {thousandsSeparator: " ", defaultValue: '0'},
            number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
            currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
            date : {
                dayNames:   [
                    "Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
                    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                ],
                monthNames: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                ],
                AmPm : ["am","pm","AM","PM"],
                S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
                srcformat: 'Y-m-d',
                newformat: 'd/m/Y',
                masks : {
                    ISO8601Long:"Y-m-d H:i:s",
                    ISO8601Short:"Y-m-d",
                    ShortDate: "n/j/Y",
                    LongDate: "l, F d, Y",
                    FullDateTime: "l, F d, Y g:i:s A",
                    MonthDay: "F d",
                    ShortTime: "g:i A",
                    LongTime: "g:i:s A",
                    SortableDateTime: "Y-m-d\\TH:i:s",
                    UniversalSortableDateTime: "Y-m-d H:i:sO",
                    YearMonth: "F, Y"
                },
                reformatAfterEdit : false
            },
            baseLinkUrl: '',
            showAction: '',
            target: '',
            checkbox : {disabled:true},
            idName : 'id'
        }
    }
    // Common
    common.message.common={
        error0	:"Server is busy or power down",
        error404	:"resource not found!",
        error500	:"Server Error！",
        error10000	:"Session has expired,please login again.",
        error10001	:"You don't have enough permissions"
    }
    function extendMessage(){
        $.extend($.validator.messages, common.message.validation.jqueryValidate);
        $.jgrid = $.jgrid || {};
        $.extend($.jgrid,common.message.grid);
    }
	extendMessage();
})(EB_Common);