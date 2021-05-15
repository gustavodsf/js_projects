for (i = 0; i < 7; i++) { 
	idApontElem = "ApontID"+i
	fatherElem =  document.getElementById(idApontElem)
	weekDay = fatherElem.getElementsByClassName("weekDayTextSize bold width100")[1].innerText
	lastSlot = fatherElem.getElementsByClassName("LastSlot")[0]
	
	if(weekDay === "sábado" || weekDay == "domingo" ){
		continue;
	}
	
	hour = Math.floor(Math.random() * 2) + 8
	minutes = Math.floor(Math.random() * 60) + 1
	minutes =  minutes >=1 & minutes <=9 ? "0"+minutes : minutes  
	lastSlot.getElementsByClassName("timeInput hasDatepicker")[0].value = hour+":"+minutes
	emptySlot = fatherElem.getElementsByClassName("emptySlot")[0]
	
	
	var newdiv = document.createElement("span");

	$(newdiv).css("margin-left", "6px");
	
	idApontElem = "#"+idApontElem
	if ($(idApontElem + " .emptySlot").prev().children().hasClass("TimeIN")) {
	  newdiv.className = "TimeOUT";
	} else {
	  newdiv.className = "TimeIN";
	}

	var newInput = document.createElement("input");
	newInput.className = "timeInput";
	newInput.type = "text";

	$(newInput).mousedown(function() {

	  var newEmptyDiv = document.createElement("div");
	  newEmptyDiv.className = "emptySlot";

	  $(this).parent().parent().before(newEmptyDiv.cloneNode(true))
		.after(newEmptyDiv.cloneNode(true));

	  var parent = $(this).parent().parent().parent();

	  if (((parent.find(".TimeIN").size() + parent.find(".TimeOUT").size()) < 16)) {
		parent.find(".emptySlot").mouseenter(addInput)
		  .mouseleave(function() {
			if ($(this).find("input").val() == "") {
			  $(this).html("");
			}
		  });
	  } else {
		parent.find(".emptySlot").unbind("mouseenter")
		  .unbind("mouseleave");
	  }

	  var ins = $(this).parent().parent().nextAll().children(".TimeIN");
	  var outs = $(this).parent().parent().nextAll().children(".TimeOUT");

	  ins.removeClass("TimeIN")
		.addClass("TimeOUT");
	  outs.removeClass("TimeOUT")
		.addClass("TimeIN");
	  $(this).unbind('mousedown')
		.val("00:00");

	  $(this).change(function() {
		if ($(this).val() == "") {
		  ins = $(this).parent().parent().nextAll().children(".TimeIN");
		  outs = $(this).parent().parent().nextAll().children(".TimeOUT");

		  ins.removeClass("TimeIN")
			.addClass("TimeOUT");
		  outs.removeClass("TimeOUT")
			.addClass("TimeIN");

		  parent.find(".emptySlot").mouseenter(addInput)
			.mouseleave(function() {
			  if ($(this).find("input").val() == "") {
				$(this).html("");
			  }
			});
		  $(this).parent().parent().prev().remove(); //remove elements
		  $(this).parent().parent().remove();
		}
	  });
	});

	$(newInput).mask("99:99")
	  .timepicker({
		'minTime': '0:00am',
		'maxTime': '12:00pm',
	  });

	$(idApontElem + " .emptySlot").append($(newdiv).append($(newInput)));
	hour = hour + 9
	emptySlot.getElementsByClassName("timeInput hasDatepicker")[0].value =  hour+":"+minutes
}
$( "#ButtonSalvarApontamentos" ).click()
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
sleep(2000).then(() => { 
	//$("#JustificativaAll").val("Barg Chupador de Rola!");
	$("#JustificativaSelect").val("Esqueceu de marcar")
	$("#MainJustificativa div input")[1].click()
	$("#SaveHorarios").click()
});
