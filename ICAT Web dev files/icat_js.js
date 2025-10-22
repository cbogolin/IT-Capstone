//Pulls country names from the JSON file and displays them in the dropdown menu on the top left
var select = $('.selectCountryDropdown');
$.each(countries, function(key, value) {
  var opt = `<option>${value["Country Name"]}</option>`;
  select.append(opt);
});

//Once a country is selected, from the dropdown, this triggers
//a modal to pop up and display the country information

function displayCountryInfo(clickedCountry) {
  var opval = clickedCountry;
  // if (clickedCountry) {
  //   opval = clickedCountry;
  // } else {
  //   opval = $(this).val(); //Get value from selected country in the dropdown
  // }
  console.log(opval);
  var countryName = $('.countryName');
  countryName.html(opval);

  //Stores all information about each country into a single object called "CountryObject"
  let countryObject = countries.find(country => country["Country Name"] === opval);

  //These load all the information into the Overview tab
  $('.countryName').html(countryObject["countryName"]);
  $('.regionName').html(countryObject["Region"]);
  $('#FinInc1').html(countryObject["FinInc"]);
  $('#GPI1').html(countryObject["GPI"]);
  $('#FemLit1').html(countryObject["FemLit"]);
  $('#lnChldMort1').html(countryObject["lnChldMort"]);
  $('#Waste1').html(countryObject["Waste"]);
  $('#MSExpShr1').html(countryObject["MSExpShr"]);
  $('#lninflation1').html(countryObject["lninflation"]);
  $('#Polity2_1').html(countryObject["Polity2"]);
  $('#GINI1').html(countryObject["GINI"]);
  $('#MedPov1').html(countryObject["MedPov"]);
  $('#lnNRR1').html(countryObject["lnNRR"]);
  $('#ImpWat1').html(countryObject["ImpWat"]);

  //Loads all the information from the WorldAvg CountryObject
  $('#wFinInc').html(worldAvgObject["FinInc"]);
  $('#wGPI').html(worldAvgObject["GPI"]);
  $('#wFemLit').html(worldAvgObject["FemLit"]);
  $('#wlnChldMort').html(worldAvgObject["lnChldMort"]);
  $('#wWaste').html(worldAvgObject["Waste"]);
  $('#wMSExpShr').html(worldAvgObject["MSExpShr"]);
  $('#wlninflation').html(worldAvgObject["lninflation"]);
  $('#wPolity2').html(worldAvgObject["Polity2"]);
  $('#wGINI').html(worldAvgObject["GINI"]);
  $('#wMedPov').html(worldAvgObject["MedPov"]);
  $('#wlnNRR').html(worldAvgObject["lnNRR"]);
  $('#wImpWat').html(worldAvgObject["ImpWat"]);

  $('#myModal').modal("show"); //Open Modal after values are loaded
}

//Specifies what type(s) of maps you're drawing
google.charts.load('upcoming', {
  'packages': ['geochart', 'corechart']
});
//Defines the "draw" method
google.charts.setOnLoadCallback(drawRegionsMap);

var currentMeasure = function(e) {
  $(".measure").on('click', function() {
    var clickedId = $(this).attr("id");
    var measureLabel = $(this).attr("name");
    drawRegionsMap(clickedId, measureLabel);
  });
};

function drawRegionsMap(measure, label) {
  //The format you'll want your data in - first row is header, the rest is country + value
  var g_table = [
    ['Country', `${label || "Lack of Financial Development"}`]
  ];
  $.each(countries, function(key, value) {
    var opt = [value["Country Name"], value[measure || "FinInc"]];
    g_table.push(opt);
  });

  //FALSE means the first row in the array is to be used for the header
  var data = google.visualization.arrayToDataTable(g_table, false);

  //Couple of options - pre-define the range of values, set the color scale, etc
  var options = {
    colorAxis: { maxValue: 100 },
    colors: ['#A8c664', '#34Fd69', '#B67FcE'],
    defaultColor: '#f5f5f5',
  };

  //Define what div you want to draw the map on
  var chart = new google.visualization.GeoChart(document.getElementById('icatMap'));
  chart.draw(data, options);

  //Code that runs when you click on a country; opens the modal
  google.visualization.events.addListener(chart, 'select', selectHandler);

  function selectHandler(e) {
    var stri = chart.getSelection();
    var output = data.getValue(stri[0].row, 0);
    return displayCountryInfo(output);
  }
}

$(document).on('change', '.selectCountryDropdown', function(el) {
  displayCountryInfo($(el.target).val());
});

$(".measure").on('click', currentMeasure());

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
