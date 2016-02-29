/*
 *The following js methods intend to append place holder(:nbsp;) 
 *to the grid list header if the number of field of list header is less than required.
 */
function autoAppendPlaceHolder(input, inputCount){
	var count = 0;
	if(input != null && input.length > 0){
		count = checkNumberOfField(input);
		if(count != inputCount){
			for(var i = 0; i < (inputCount - count); i++)
				input = appandPlaceHolder(input);
		}
	}
	//alert("ActNmbrOfField="+count +" ReqNmbrOfField="+inputCount);
	return input;
}

function checkNumberOfField(input){
	var count = 0;
	var str =(input||"").split(",");
	if(str != null)
		count = str.length;
	return count;
}

function appandPlaceHolder( input){
	input = input +",?";
	return input;
}

function autoApplyRequiredStyle(input){
	if(input != null && input.length > 0){
		input = input.replace(/\*/g,'<span class="required">*</span>');
	}
	return input;
}
/* --- End  ---*/

//creates accordion using 1 table for header and 1 for detail.
//active and collapsible are optional
function createAccordionWithTableFormat(accordionId, collapseId, childId, childHide, show, hide, active, collapsible){
	show = typeof show !== 'undefined' ? show : "+ More Info";
	hide = typeof hide !== 'undefined' ? hide : "- Less Info";
	active = typeof active !== 'undefined' ? active : false;
	collapsible = typeof collapsible !== 'undefined' ? collapsible : true;
	var child = typeof childId !== 'undefined' ? true : false;
	var ecId = accordionId+collapseId+"1z";
	$('<div id="'+ecId+'">start</div>').hide().appendTo("body");

 $( "a#"+collapseId ).on( "click", function() {
 	if($(this).text() === show){
		$(this).text(hide);
	}	
	else{
		$(this).text(show);
		if (child && $("#"+childId).text() === childHide) $("#"+childId).trigger("click");
	}
	if ($("#"+ecId).text()=="start") {
		$("#"+ecId).text("");
	} else {
		$("#"+ecId).text("continue");
	}
  }).eq(0).trigger("click");
	
 $( "div#"+accordionId ).accordion({
     active: active,
     collapsible: collapsible
   });

 $( "div#"+accordionId+" > table > thead > tr > td" ).on( "click", function(event) {
	 if($("#"+ecId).text()=="continue") {
		 $("#"+ecId).text("");
		 return;
 	}
 	if (window.attachEvent && !window.addEventListener) {
 		event.cancelBubble = true; //IE8
 		event.returnValue = false; //IE8
 	} else {
 		event.preventDefault();
 		event.stopPropagation();
 	}
  });
}

function correctDollarIndentation(amount){
	if(amount<"0"){
		amount = amount.replace("-","-$");
	}else{
		amount = "$"+amount;
	}
	return amount;
}

function getDecimalMark(str) {
	return str.substr(str.length-3,1);
}

function splitDecimal(str){
	var splitMark = getDecimalMark(str);
	var strArr = str.split(splitMark);
	return strArr;
}