var correct = false;
var Form = false;
var uri;

$(document).ready(function () {
  $("#special").hide(0).delay(5000).show(500);
  $("#Hideable").css("display", "none");
});

//--- 1.
function validateForm() {

  var x1 = document.forms["myForm"]["vardas"].value;
  if (x1 == "") {
    alert("Vardo laukas turi būti užpildytas");
    return false;
  }
  var x2 = document.forms["myForm"]["pavarde"].value;
  if (x2 == "") {
    alert("Pavardės laukas turi būti užpildytas");
    return false;
  }

  var x3 = document.forms["myForm"]["telefonas"].value;
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,}$/;
  if (!re.test(String(x3).toLowerCase()) || x3 == "") {
    alert("Telefono laukas turi būti užpildytas");
    return false;
  }

  var x4 = document.forms["myForm"]["telefonas"].value;
  if (x4 == "") {
    alert("Elektroninio pašto laukas turi būti užpildytas");
    return false;
  }

  var d = document.forms["myForm"]["metai"].value;
  var res = d.split("-");

  var date = new Date();
  date.setFullYear(res[0], res[1] - 1, res[2]);


  if (d == "" || (date.getFullYear() != res[0]) || (date.getMonth() != res[1] - 1) || (date.getDate() != res[2])) {
    alert("Datos laukas turi būti užpildytas teisingai");
    return false;
  }

  var y = document.forms["myForm"]["dalyviųSkaičius"].value;
  if (y < 0 || (y - Math.trunc(y)) != 0 || y == "") {
    alert("Dalyvių skaičius turi būti teigiamas ir sveikas");
    return false;
  }

  Form = true;
  alert("forma užpildyta teisingai! ");
  return false;
}

//--- 2.

function ShowHideFunction() {
  var myNum = document.forms["myForm"]["telefonas"].value;

  if (myNum == "" || myNum.length >= 9) {
    $("#Hideable").css("display", "none");
  }
  else {
    $("#Hideable").css("display", "block");
  }
}

//--- 3
//--- 3.1 change text
function setTextDefault() {
  $('#myText').text('Gyvenamasis adresas: Didlaukio g. 59, Vilnius')
}

function setTextNew() {
  $('#myText').text('Gimtasis adresas: Nemuno g. 44, Panevėžys')
}

//--- 3.2 change style
function setBlack() {
  $("#contacts").attr('style', 'color: #000000');
  $("#contacts").css('font-style', 'italic');
}

//--- 3.3 delete content
function deleteParagraph() {
  var myNum = document.forms["hobbyForm"]["fnumber"].value;
  $('#r' + myNum).remove();

}

function addEnteredData() {
  validateForm();
  if (Form) {
    var name = document.forms["myForm"]["vardas"].value;
    var surname = document.forms["myForm"]["pavarde"].value;
    var phone = document.forms["myForm"]["telefonas"].value;
    var email = document.forms["myForm"]["email"].value;
    var time = document.forms["myForm"]["metai"].value;

    var markup = "<tr><td>" + name +
      "</td><td>" + surname +
      "</td><td>" + phone +
      "</td><td>" + email +
      "</td><td>" + time +
      "</td></tr>";

    $("#editableTable tbody").append(markup);
    return false;
  }
  return false;
}

  //--- 4 GET
function getFormData(){
	$.ajax({
		url: uri,
		type: 'GET',
		error: function () {
			console.error('Error');
		},
		success: function (data) {
			console.log("GET: " + data);
			$('#myTable2').append(
        "<tr><td>" + data.name +
        "</td><td>" + data.surname + 
        "</td><td>" + data.phone + 
        "</td><td>" + data.email + 
        "</td><td>" + data.time + "</td></tr>");
		}
	});
}

//--- 4 POST
function postFormData(){
	if(Form)
	{
		var data = {

      "name": document.forms["myForm"]["vardas"].value,
      "surname": document.forms["myForm"]["pavarde"].value,
      "phone": document.forms["myForm"]["telefonas"].value,
      "email": document.forms["myForm"]["email"].value,
      "time": document.forms["myForm"]["metai"].value
		}

		$.ajax({
			url: "https://api.myjson.com/bins",
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				console.log("POST: " + data.uri);
				uri = data.uri;
			}
		});

		return false;
	}
	else
	{
		alert("Form is incorrect");
	}
}