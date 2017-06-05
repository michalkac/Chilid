
//Arrays with json data.
var jsonData;
var filteredjsonData;

//Default sort directions.
var idSortDir = "asc"
var firstNameSortDir = "desc"
var lastNameSortDir = "desc"
var dateOfBirthSortDir = "desc"
var functionSortDir = "desc"
var experienceSortDir = "desc"

//Default filtering input values.
var idMINInput = "";
var idMAXInput = "";
var firstNameInput = "";
var lastNameInput = "";
var dateOfBirthMINInput = "";
var dateOfBirthMAXInput = "";
var functionInput = "";
var experienceMINInput = "";
var experienceMAXInput = "";


//Loading page.
$.getJSON('sluzba.json',function(json){//Loading json data from file.
      jsonData = json;//Copying to jsonData.
      normalisedate(jsonData);//Bring dateOfBirth to common format.
      filteredjsonData = jsonData;//Copying sorted data to filteredjsonData;
      paging(filteredjsonData);//Generating page Table.
      createFirstTwoRows();//Creating first two rows of dataTable with  names and filtering input fields.
      sortBy(jsonData,"id","asc");//Default sorting.
      refillTable(filteredjsonData,0);//Filling the rest of table with data.

});


//This function eliminates diffrences between various dateOfBirth input formats.
function normalisedate(input){
  for (var i= 0; i < input.length; i++){
    if (1 == input[i].dateOfBirth.indexOf(".")) input[i].dateOfBirth = "0" + input[i].dateOfBirth;
    var dot1 = input[i].dateOfBirth.indexOf(".")+1;
    if (4 == input[i].dateOfBirth.indexOf(".",dot1+1)) input[i].dateOfBirth = input[i].dateOfBirth.substring(0,3) + "0" +input[i].dateOfBirth.substring(3);
    if (15 == input[i].dateOfBirth.length) input[i].dateOfBirth = input[i].dateOfBirth.substring(0,11) + "0" +input[i].dateOfBirth.substring(11);
  }
}


//DISPLAYING CONTENT START//

//Datepicker for dateOfBirth filtering input fields.
$('body').on('focus',".datepicker", function(){
    $(this).datepicker({
               changeMonth:true,
               changeYear:true,
               changeHour:true,
               yearRange: "-100:+0",
               dateFormat: 'dd.mm.yy'
            });
});


//This function creates rows with parameter names and input fields for data filtering.
function createFirstTwoRows(){
  var table = document.getElementById("dataTable");
  var row = table.insertRow(0);
  row.className = "greenStyle";
  var id = row.insertCell(0);

  //Mouse input for first row.
  id.onclick = function() {
        if (idSortDir == "desc"){//Checking last sorting direction.
          sortBy(jsonData,"id","asc");//Sorting.
          idSortDir = "asc";//Setting new sorting direction;
        }else{
          sortBy(jsonData,"id","desc");
          idSortDir = "desc";
        }
        filter(jsonData,0);//Filtering includes displaying new data.

        };
  var firstName = row.insertCell(1);
  firstName.onclick = function() {
        if (firstNameSortDir == "desc"){
          sortBy(jsonData,"firstName","asc");
          firstNameSortDir = "asc";
        }else{
          sortBy(jsonData,"firstName","desc");
          firstNameSortDir = "desc";
        }
        filter(jsonData,0);

      };

  var lastName = row.insertCell(2);
  lastName.onclick = function() {
        if (lastNameSortDir == "desc"){
          sortBy(jsonData,"lastName","asc");
          lastNameSortDir = "asc";
        }else{
          sortBy(jsonData,"lastName","desc");
          lastNameSortDir = "desc";
        }
        filter(jsonData,0);

      };
  var dateOfBirth = row.insertCell(3);
  dateOfBirth.onclick = function() {
        if (dateOfBirthSortDir == "desc"){
          sortBy(jsonData,"dateOfBirth","asc");
          dateOfBirthSortDir = "asc";
        }else{
          sortBy(jsonData,"dateOfBirth","desc");
          dateOfBirthSortDir = "desc";
        }
        filter(jsonData,0);

      };
  var function1 = row.insertCell(4);
  function1.onclick = function() {
        if (functionSortDir == "desc"){
          sortBy(jsonData,"function","asc");
          functionSortDir = "asc";
        }else{
          sortBy(jsonData,"function","desc");
          functionSortDir = "desc";
        }
        filter(jsonData,0);

      };
  var experience = row.insertCell(5);
  experience.onclick = function() {
        if (experienceSortDir == "desc"){
          sortBy(jsonData,"experience","asc");
          experienceSortDir = "asc";
        }else{
          sortBy(jsonData,"experience","desc");
          experienceSortDir = "desc";
        }
        filter(jsonData,0);

      };
  //First row, contains parameter names and sorting arrows.
  id.innerHTML = 'Numer Pracownika<img src="asc.png" id="idAscArrow" width="8px" height="15px" align="right"><img src="desc.png" id="idDescArrow" width="8px" height="15px" align="right">';
  firstName.innerHTML = 'Imię<img src="asc.png" id="firstNameAscArrow" width="8px" height="15px" align="right"><img src="desc.png" id="firstNameDescArrow" width="8px" height="15px" align="right">';
  lastName.innerHTML = 'Nazwisko<img src="asc.png" id="lastNameAscArrow" width="8px" height="15px" align="right"><img src="desc.png" id="lastNameDescArrow" width="8px" height="15px" align="right">';
  dateOfBirth.innerHTML = 'Data Urodzenia<img src="asc.png" id="dateOfBirthAscArrow" width="8px" height="15px" align="right"><img src="desc.png" id="dateOfBirthDescArrow" width="8px" height="15px" align="right">';
  function1.innerHTML = 'Pełniona Funkcja<img src="asc.png" id="functionAscArrow" width="8px" height="15px" align="right"><img src="desc.png" id="functionDescArrow" width="8px" height="15px" align="right">';
  experience.innerHTML = 'Doświadczenie<img src="asc.png" id="experienceAscArrow" width="8px" height="15px" align="right"><img src="desc.png" id="experienceDescArrow" width="8px" height="15px" align="right">';

  var row = table.insertRow(1);

  var id = row.insertCell(0);
  var firstName = row.insertCell(1);
  var lastName = row.insertCell(2);
  var dateOfBirth = row.insertCell(3);
  var function1 = row.insertCell(4);
  var experience = row.insertCell(5);
  //Second row, contains filtering inputs and filtering button.
  id.innerHTML = '<input type="text" id="idMINInput" value="Od" size="1">&nbsp;:&nbsp;<input type="text" id="idMAXInput" value="Do" size="1">';
  firstName.innerHTML = '<input type="text" id="firstNameInput" value="Imię" size="7">';
  lastName.innerHTML = '<input type="text" id="lastNameInput" value="Nazwisko" size="7">';
  dateOfBirth.innerHTML = '<p><input type="text" id="dateOfBirthMINInput" value="Od" size="15" class="datepicker"/>&nbsp;:&nbsp;<input type="text" id="dateOfBirthMAXInput" value="Do" size="15" class="datepicker"/></p>';
  function1.innerHTML = '<input type="text" id="functionInput" value="Funkcja" size="7">';
  //Last cell with filtering button.
  experience.innerHTML = '<input type="text" id="experienceMINInput" value="Od" size="1">&nbsp;:&nbsp;<input type="text" id="experienceMAXInput" value="Do" size="1"><button style="float: right;" onclick="filter(jsonData,1)">Filtruj</button>';
  var row = table.insertRow(2);

}

//Function that fills data table with provided array.
function refillTable(input,page){

  var startindex = (page)*5;
  if (page == pagecount) var tablerows = (input.length)-(5*(pagecount));
  else var tablerows = 5;
  var table = document.getElementById("dataTable");
  //deleting all rows exept rows 0 and 1.
  while(table.rows.length > 2)  table.deleteRow(2);
  //No data to display case.
  if (input.length == 0) {
    var row = table.insertRow(2);
    var nodata = row.insertCell(0);
    nodata.innerHTML = "Brak wyników do wyświetlania.";
    return 0;
  }
  //Filling table with data loop.
  for (var j = 0; j < tablerows; j++) {

      var row = table.insertRow(j+2);
      var id = row.insertCell(0);
      var firstName = row.insertCell(1);
      var lastName = row.insertCell(2);
      var dateOfBirth = row.insertCell(3);
      var function1 = row.insertCell(4);
      var experience = row.insertCell(5);

      id.innerHTML = input[startindex+j].id;
      firstName.innerHTML = input[startindex+j].firstName;
      lastName.innerHTML = input[startindex+j].lastName;
      dateOfBirth.innerHTML = input[startindex+j].dateOfBirth;
      function1.innerHTML = input[startindex+j].function;
      experience.innerHTML = input[startindex+j].experience;
  }
}

//Function that creates table with page numbers.
function paging(input){

  pagecount=Math.floor(((input.length-1)/5));//Calculating how many pages it will be needed.

  var pageTable = document.getElementById("pageTable");
  while(pageTable.rows.length > 0) pageTable.deleteRow(0);//Deleting first row of page table if it exists.

  var pageTableRow =pageTable.insertRow(0);
  var pageCell = pageTableRow.insertCell(0);
  pageCell.innerHTML = "Strona:";
  pageCell.className = "greenStyle";
  if (input.length > 0){
    for (var f = 0; f <= pagecount;f++){
      var pageCell = pageTableRow.insertCell(f+1);
        pageCell.onclick =function(page) {//Displaying page content by click on page number.
              return function() {
                refillTable(filteredjsonData,page);//Renew data table with content for specific page number.
                colorPage(page);//Coloring page number.
                ;
              }
          }(f);
        pageCell.innerHTML = f+1;

      }
    colorPage(0);//Default coloring first page cell of page Table.
    }
}

//Function that sets background color of pageTable cell .
function colorPage(page){
  if (page >= 0){
    for (s = 1; s<document.getElementById("pageTable").rows[0].cells.length;s++) document.getElementById("pageTable").rows[0].cells[s].className = "";
    document.getElementById("pageTable").rows[0].cells[page+1].className = "greenStyle";
  }
}



//Function that displays sorting arrow.
function showArrow(parameter,dir) {

  //Hiding all arrows.
  var img = document.getElementById('idAscArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('idDescArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('firstNameAscArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('firstNameDescArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('lastNameAscArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('lastNameDescArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('dateOfBirthAscArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('dateOfBirthDescArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('functionAscArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('functionDescArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('experienceAscArrow');
  img.style.visibility = 'hidden';
  var img = document.getElementById('experienceDescArrow');
  img.style.visibility = 'hidden';
//Displaying desired arrow.
  switch (parameter) {
    case "id":
      if (dir == "asc"){
      var img = document.getElementById('idAscArrow');
      img.style.visibility = 'visible';
      } else {
      var img = document.getElementById('idDescArrow');
      img.style.visibility = 'visible';
      }
      break;
    case "firstName":
      if (dir == "asc"){
      var img = document.getElementById('firstNameAscArrow');
      img.style.visibility = 'visible';
      } else {
      var img = document.getElementById('firstNameDescArrow');
      img.style.visibility = 'visible';
      }
      break;
    case "lastName":
      if (dir == "asc"){
      var img = document.getElementById('lastNameAscArrow');
      img.style.visibility = 'visible';
      } else {
      var img = document.getElementById('lastNameDescArrow');
      img.style.visibility = 'visible';
      }
      break;
    case "dateOfBirth":
      if (dir == "asc"){
      var img = document.getElementById('dateOfBirthAscArrow');
      img.style.visibility = 'visible';
      } else {
      var img = document.getElementById('dateOfBirthDescArrow');
      img.style.visibility = 'visible';
      }
      break;
    case "function":
      if (dir == "asc"){
      var img = document.getElementById('functionAscArrow');
      img.style.visibility = 'visible';
      } else {
      var img = document.getElementById('functionDescArrow');
      img.style.visibility = 'visible';
      }
      break;
    case "experience":
      if (dir == "asc"){
      var img = document.getElementById('experienceAscArrow');
      img.style.visibility = 'visible';
      } else {
      var img = document.getElementById('experienceDescArrow');
      img.style.visibility = 'visible';
      }
      break;
    default:
    break;
  }

}

//DISPLAYING PAGE CONTENT ENDS HERE//


//SORTING STARTS HERE//

//Main sorting function
function sortBy(input,parameter,dir){

  switch (parameter) {

    case "id":
        input.sort(sortid);
        break;
    case "firstName":
        input.sort(sortFirstName);
        break;
    case "lastName":
        input.sort(sortLastName);
        break;
    case "dateOfBirth":
        input.sort(sortDateOfBirth);
        break;
    case "function":
        input.sort(sortFunction);
        break;
    case "experience":
        input.sort(sortExperience);
        break;
    default:
    console.log("Unknown sorting parameter");
    break;
  }
  if (dir == "desc") input.reverse();//Reversing array if sorting direction is descending.
  showArrow(parameter,dir);//Displays sorting arrow.

}


//Compare functions for sorting by parameters.
function sortid(a, b){
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

function sortFirstName(a, b){
  if (a.firstName < b.firstName) return -1;
  if (a.firstName > b.firstName) return 1;
  return 0;
}

function sortLastName(a, b){
  if (a.lastName < b.lastName) return -1;
  if (a.lastName > b.lastName) return 1;
  return 0;
}

function sortDateOfBirth(a, b){
//Converting to format yyyymmddHHMM to compare date
  var tempA = Number(a.dateOfBirth.substring(6,10) + a.dateOfBirth.substring(3,5) + a.dateOfBirth.substring(0,2) + a.dateOfBirth.substring(11,13) + a.dateOfBirth.substring(14))
  var tempB = Number(b.dateOfBirth.substring(6,10) + b.dateOfBirth.substring(3,5) + b.dateOfBirth.substring(0,2) + b.dateOfBirth.substring(11,13) + b.dateOfBirth.substring(14))
  if (tempA < tempB) return -1;
  if (tempA > tempB) return 1;
  return 0;
}

function sortFunction(a, b){
  if (a.function < b.function) return -1;
  if (a.function > b.function) return 1;
  return 0;
}

function sortExperience(a, b){
  if (a.experience < b.experience) return -1;
  if (a.experience > b.experience) return 1;
  return 0;
}
//SORTING ENDS HERE//





//DATA FILTERING STARTS HERE//

//Main filtering function.
function filter(data,updateFilterParameters){
  if (updateFilterParameters == 0) filterChain(data);//Filtering values are updated with input text fields values only if filtering button is pressed.
  else {
    //Updating filtering values with text input fields values.
    idMINInput = document.getElementById("idMINInput").value;
    idMAXInput = document.getElementById("idMAXInput").value;
    firstNameInput = document.getElementById("firstNameInput").value.charAt(0).toUpperCase() + document.getElementById("firstNameInput").value.slice(1);//Preventing upper-lower letter problems.
    lastNameInput = document.getElementById("lastNameInput").value.charAt(0).toUpperCase() + document.getElementById("lastNameInput").value.slice(1);
    dateOfBirthMINInput = document.getElementById("dateOfBirthMINInput").value;
    dateOfBirthMAXInput = document.getElementById("dateOfBirthMAXInput").value;
    functionInput = document.getElementById("functionInput").value.toLowerCase();
    experienceMINInput = document.getElementById("experienceMINInput").value;
    experienceMAXInput = document.getElementById("experienceMAXInput").value;
    filterChain(data);

  }

}


//Filtering chain function that filters data by all provided filtering parameters.
function filterChain(data){
if (idMINInput == "Od" || idMINInput == "" ) idMINfilteredjsonData = data;//Do not filter data if field is empty or contains default value.
else idMINfilteredjsonData = data.filter(filterMinid);

if (idMAXInput == "Do" || idMAXInput == "" ) idMAXfilteredjsonData = idMINfilteredjsonData;
else idMAXfilteredjsonData = idMINfilteredjsonData.filter(filterMaxid);

if (firstNameInput == "Imię" || firstNameInput == "" ) firstNamefilteredjsonData = idMAXfilteredjsonData;
else firstNamefilteredjsonData = idMAXfilteredjsonData.filter(filterFirstName);

if (lastNameInput == "Nazwisko" || lastNameInput == "" ) lastNamefilteredjsonData = firstNamefilteredjsonData;
else lastNamefilteredjsonData = firstNamefilteredjsonData.filter(filterLastName);

if (dateOfBirthMINInput == "Od" || dateOfBirthMINInput == "" ) dateOfBirthMINfilteredjsonData = lastNamefilteredjsonData;
else dateOfBirthMINfilteredjsonData = lastNamefilteredjsonData.filter(filterdateOfBirthMIN);


if (dateOfBirthMAXInput == "Do" || dateOfBirthMAXInput == "" ) dateOfBirthMAXfilteredjsonData = dateOfBirthMINfilteredjsonData;
else dateOfBirthMAXfilteredjsonData = dateOfBirthMINfilteredjsonData.filter(filterdateOfBirthMAX);

if (functionInput == "funkcja" || functionInput == "" ) functionfilteredjsonData = dateOfBirthMAXfilteredjsonData;
else functionfilteredjsonData = dateOfBirthMAXfilteredjsonData.filter(filterFunction);

if (experienceMINInput == "Od" || experienceMINInput == "" ) experienceMINfilteredjsonData = functionfilteredjsonData;
else experienceMINfilteredjsonData = functionfilteredjsonData.filter(filterMINExperience);

if (experienceMAXInput == "Do" || experienceMAXInput == "" ) filteredjsonData = experienceMINfilteredjsonData;
else filteredjsonData = experienceMINfilteredjsonData.filter(filterMAXExperience);

paging(filteredjsonData);//Renew page Table.
refillTable(filteredjsonData,0);//Refresh data table content with filtered Array.

}


//Functions with filtering conditions.

function filterMinid(value) {
  return value.id >= idMINInput;
}

function filterMaxid(value) {
  return value.id <= idMAXInput;
}

function filterFirstName(value) {
  return value.firstName.slice(0,firstNameInput.length) == firstNameInput;
}

function filterLastName(value) {
  return value.lastName.slice(0,lastNameInput.length) == lastNameInput;
}

function filterdateOfBirthMIN(value) {

//Comparing dateOfBirth in yyyymmdd format.
  return (value.dateOfBirth.slice(6,10) + value.dateOfBirth.slice(3,5) + value.dateOfBirth.slice(0,2))  >= (dateOfBirthMINInput.slice(6,10) + dateOfBirthMINInput.slice(3,5) + dateOfBirthMINInput.slice(0,2));
}

function filterdateOfBirthMAX(value) {
  return (value.dateOfBirth.slice(6,10) + value.dateOfBirth.slice(3,5) + value.dateOfBirth.slice(0,2))  <= (dateOfBirthMAXInput.slice(6,10) + dateOfBirthMAXInput.slice(3,5) + dateOfBirthMAXInput.slice(0,2));
}

function filterFunction(value) {
  return value.function.slice(0,functionInput.length) == functionInput;
}


function filterMINExperience(value) {

  return value.experience >= experienceMINInput;
}

function filterMAXExperience(value) {
  return value.experience <= experienceMAXInput;
}


//DATA FILTERING ENDS HERE//
