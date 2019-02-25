// Copyright Miikka Niemeläinen 2018
// All rights reserved

function footer() {
  var date = new Date();
  document.getElementById('copyrights').innerHTML = '© 2018-' + date.getFullYear()  + ' Miikka Niemeläinen';
}

function getMovies() {

  // Create the query URL by selecting the the date, slicing it to match the
  // format used in the URL, and selecting the theatre ID from the form
  var raaka = document.getElementById("pvm").value;
  var aika = raaka.slice(8, 10) + "." + raaka.slice(5, 7) + "." + raaka.slice(0, 4);
  var teatteri = document.getElementById("teatteri").value;
  var url = "https://www.finnkino.fi/xml/Schedule/?area=" + teatteri + "&dt=" + aika;

  // Create the XML Request
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send()

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xml = xmlhttp.responseXML;

      // Select the wanted information from the XML response
      var nimet = xml.getElementsByTagName("Title");
      var ajat = xml.getElementsByTagName("dttmShowStart");
      var kuvat = xml.getElementsByTagName("EventMediumImagePortrait");
      var esitysLinkit = xml.getElementsByTagName("ShowURL");
      var tietoLinkit = xml.getElementsByTagName("EventURL");
      var teatterit = xml.getElementsByTagName("TheatreAndAuditorium");
      var rajat = xml.getElementsByTagName("RatingImageUrl");

      // Clear the site of previous movies if the user wants to do another
      // search
      document.getElementById("elokuvat").innerHTML = "";

      // If the XML response contains movies, insert the selected information
      // on a Bootstrap Card object, and add it to the site
      if (nimet.length > 0) {
        for (var i = 0; i < nimet.length; i++) {
          var aika = ajat[i].innerHTML.slice(11, 16);
          document.getElementById("elokuvat").innerHTML += `<div class="card">
                                                              <img class="card-img-top" src="` + kuvat[i].innerHTML + `">
                                                              <img id="rating" src="` + rajat[i].innerHTML + `">
                                                              <div class="card-body">
                                                                <h5 class="card-title">` + nimet[i].innerHTML + `</h5>
                                                                <h6 class="card-subtitle mb-2"> <i class="fas fa-clock"></i>` + aika + `</h6>
                                                                <h6 class="card-subtitle mb-2"> <i class="fas fa-film"></i>` + teatterit[i].innerHTML + `</h6>
                                                                <a href="` + esitysLinkit[i].innerHTML + `" class="btn btn-block">Osta liput</a>
                                                                <a href="` + tietoLinkit[i].innerHTML + `" class="btn btn-block">Elokuvan tiedot</a>
                                                              </div>
                                                            </div>`

        }
        // Remove the error message if the new response contains movies
        document.getElementById("eikuvia").innerHTML = "";
      } else {
        // if no movies are found for the specified date or theatre, display
        // an error message
        document.getElementById("eikuvia").innerHTML = `<i class="fas fa-times fa-10x"></i><br><h2>Elokuvia ei löytynyt, kokeile toista päivää tai teatteria</h2>`;
      }


    }
  }
}
