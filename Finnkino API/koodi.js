function getMovies() {

  var raaka = document.getElementById("pvm").value;
  var aika = raaka.slice(8, 10) + "." + raaka.slice(5, 7) + "." + raaka.slice(0, 4);
  var teatteri = document.getElementById("teatteri").value;
  var url = "https://www.finnkino.fi/xml/Schedule/?area=" + teatteri + "&dt=" + aika;


  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send()

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xml = xmlhttp.responseXML;
      console.log(xml);
      var nimet = xml.getElementsByTagName("Title");
      var ajat = xml.getElementsByTagName("dttmShowStart");
      var kuvat = xml.getElementsByTagName("EventMediumImagePortrait");
      var esitysLinkit = xml.getElementsByTagName("ShowURL");
      var tietoLinkit = xml.getElementsByTagName("EventURL");
      var teatterit = xml.getElementsByTagName("TheatreAndAuditorium");

      document.getElementById("elokuvat").innerHTML = "";

      if (nimet.length > 0) {
        for (var i = 0; i < nimet.length; i++) {
          var aika = ajat[i].innerHTML.slice(11, 16);
          document.getElementById("elokuvat").innerHTML += `<div class="card">
                                                              <img class="card-img-top" src="` + kuvat[i].innerHTML + `">
                                                              <div class="card-body">
                                                                <h5 class="card-title">` + nimet[i].innerHTML + `</h5>
                                                                <h6 class="card-subtitle mb-2 text-muted"> <img class="icon" src="clock.png">` + aika + `</h6>
                                                                <h6 class="card-subtitle mb-2 text-muted">` + teatterit[i].innerHTML + `</h6>
                                                                <a href="` + esitysLinkit[i].innerHTML + `" class="card-link" target="_blank">Osta liput</a>
                                                                <a href="` + tietoLinkit[i].innerHTML + `" class="card-link" target="_blank">Elokuvan tiedot</a>
                                                              </div>
                                                            </div>`

        }
        document.getElementById("eikuvia").innerHTML = "";
      } else {
        document.getElementById("eikuvia").innerHTML = "<h2>Elokuvia ei löytynyt, kokeile toista päivää tai teatteria</h2>";
      }


    }
  }
}

function test() {
  var pvm = document.getElementById("pvm").value;
  var muotoiltu = pvm.slice(8, 10) + "." + pvm.slice(5, 7) + "." + pvm.slice(0, 4);
  alert(muotoiltu);
}
